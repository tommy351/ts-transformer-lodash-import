# ts-transformer-lodash-import

[![](https://img.shields.io/npm/v/ts-transformer-lodash-import.svg)](https://www.npmjs.com/package/ts-transformer-lodash-import) [![Test](https://github.com/tommy351/ts-transformer-lodash-import/actions/workflows/test.yml/badge.svg)](https://github.com/tommy351/ts-transformer-lodash-import/actions/workflows/test.yml)

Rewrite lodash imports in TypeScript files, just like [babel-plugin-lodash](https://github.com/lodash/babel-plugin-lodash). Only ES module imports are supported.

## Install

```sh
npm install ts-transformer-lodash-import --save-dev
```

## Usage

Use with [ttypescript](https://github.com/cevek/ttypescript).

```json
{
  "compilerOptions": {
    "plugins": [{ "transform": "ts-transformer-lodash-import" }]
  }
}
```

Available options:

| Name              | Description                              | Type      | Default |
| ----------------- | ---------------------------------------- | --------- | ------- |
| `appendExtension` | Append `.js` extension to lodash import. | `boolean` | `false` |

## License

MIT
