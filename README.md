# ts-transformer-lodash-import

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
    "plugins": [
      { "transform": "ts-transformer-lodash-import" }
    ]
  }
}
```

## License

MIT
