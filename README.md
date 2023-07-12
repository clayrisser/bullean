# bullean

[![GitHub stars](https://img.shields.io/github/stars/codejamninja/bullean.svg?style=social&label=Stars)](https://github.com/codejamninja/bullean)

> boolean expression interpreter

![](assets/bullean.png)

Please ★ this repo if you found it useful ★ ★ ★

This is based on the rancher catalog app show_if question variable.
You can read more about it at the link below.

https://rancher.com/docs/rancher/v2.x/en/helm-charts/legacy-catalogs/creating-apps/#question-variable-reference

## Features

- parentheses support
- support for order of operations

## Installation

```sh
npm install --save bullean
```

## Dependencies

- [NodeJS](https://nodejs.org)

## Usage

```ts
import Bullean from 'bullean';

const bullean = new Bullean({
  hello: 'world',
  howdy: 'texas'
});
console.log(bullean.eval('hello=world||howdy=world')); // true
console.log(bullean.eval('hello=world&&howdy=world')); // false
```

```ts
import Bullean from 'bullean';

const bullean = new Bullean();
const ast = bullean.parse('hello=world&&howdy=texas');
console.log(JSON.stringify(ast, null, 2));
```

This will output the following AST.

```json
{
  "operator": "and",
  "predicates": [
    {
      "operator": "=",
      "left": {
        "name": "hello",
        "type": "identifier"
      },
      "value": "world"
    },
    {
      "operator": "=",
      "left": {
        "name": "howdy",
        "type": "identifier"
      },
      "value": "texas"
    }
  ]
}
```

You can find more examples in the tests at the link below.

[src/bullean.spec.ts](src/bullean.spec.ts)

## Support

Submit an [issue](https://github.com/codejamninja/bullean/issues/new)

## Screenshots

[Contribute](https://github.com/codejamninja/bullean/blob/master/CONTRIBUTING.md) a screenshot

## Contributing

Review the [guidelines for contributing](https://github.com/codejamninja/bullean/blob/master/CONTRIBUTING.md)

## License

[MIT License](https://github.com/codejamninja/bullean/blob/master/LICENSE)

[Jam Risser](https://codejam.ninja) © 2020

## Changelog

Review the [changelog](https://github.com/codejamninja/bullean/blob/master/CHANGELOG.md)

## Credits

- [Jam Risser](https://codejam.ninja) - Author

## Support on Liberapay

A ridiculous amount of coffee ☕ ☕ ☕ was consumed in the process of building this project.

[Add some fuel](https://liberapay.com/codejamninja/donate) if you'd like to keep me going!

[![Liberapay receiving](https://img.shields.io/liberapay/receives/codejamninja.svg?style=flat-square)](https://liberapay.com/codejamninja/donate)
[![Liberapay patrons](https://img.shields.io/liberapay/patrons/codejamninja.svg?style=flat-square)](https://liberapay.com/codejamninja/donate)
