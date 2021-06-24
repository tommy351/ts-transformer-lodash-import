import ts from "typescript";
import lodash from "lodash";

const lodashMethods = Object.keys(lodash);

export interface PluginOptions {
  appendExtension?: boolean;
}

export default function (
  program: ts.Program,
  pluginOptions: PluginOptions
): ts.TransformerFactory<ts.SourceFile> {
  return (ctx: ts.TransformationContext) => {
    const visitor: ts.Visitor = (node) => {
      if (ts.isImportDeclaration(node)) {
        const { moduleSpecifier, importClause } = node;

        if (
          importClause &&
          ts.isStringLiteral(moduleSpecifier) &&
          moduleSpecifier.text === "lodash"
        ) {
          const { namedBindings, isTypeOnly } = importClause;

          if (
            !isTypeOnly &&
            namedBindings &&
            ts.isNamedImports(namedBindings)
          ) {
            return namedBindings.elements.map((element) => {
              const { name, propertyName } = element;
              const nameText = propertyName?.getText() ?? name.getText();

              if (!lodashMethods.includes(nameText)) {
                return ts.factory.createEmptyStatement();
              }

              const importClause = (() => {
                // Handle import alias. For example:
                //   Source: import { x as y } from 'lodash';
                //   Compiled: import { default as y } from 'lodash/x';
                if (propertyName) {
                  return ts.factory.createImportClause(
                    false,
                    undefined,
                    ts.factory.createNamedImports([
                      ts.factory.createImportSpecifier(
                        ts.factory.createIdentifier("default"),
                        name
                      ),
                    ])
                  );
                }

                return ts.factory.createImportClause(false, name, undefined);
              })();

              let moduleSpecifier = `lodash/${nameText}`;

              if (pluginOptions.appendExtension) {
                moduleSpecifier += ".js";
              }

              return ts.factory.createImportDeclaration(
                node.decorators,
                node.modifiers,
                importClause,
                ts.factory.createStringLiteral(moduleSpecifier)
              );
            });
          }
        }
      }

      return ts.visitEachChild(node, visitor, ctx);
    };

    return (sourceFile) => {
      // Only ES modules are supported currently.
      // Because identifiers are renamed in CommonJS modules.
      if (ctx.getCompilerOptions().module !== ts.ModuleKind.ESNext) {
        return sourceFile;
      }

      return ts.visitNode(sourceFile, visitor);
    };
  };
}
