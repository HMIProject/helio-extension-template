# HELIO Extension Template

This is the template repository for building [HELIO](https://helio-hmi.com/)
extensions using the HELIO SDK. It provides a basic setup and includes all
necessary tools for easy development. These include:

- [Rollup](https://rollupjs.org/) for building
the extension,
- [Typescript](https://www.typescriptlang.org/) for static typing,
- [ESLint](https://eslint.org/) for static analysis and issue reporting,
- [Prettier](https://prettier.io/) for automatic code formatting,
- [Vitest](https://vitest.dev/) for automatic testing and
- [Storybook](https://storybook.js.org/) for UI documentation and development.

These tools are informed by our current preference and are included to make the
process of building a HELIO extension as smooth as possible. However, none of
them are _required_. Feel free to replace them with your own preferred options.

We have also pinned specific versions of [Node.js](https://nodejs.org/) and
[Yarn](https://yarnpkg.com/) in the `package.json` file. This relies on the
JavaScript Tool Manager [Volta](https://volta.sh/). Using these versions is also
optional but can reduce unexpectedly inconsistent behavior across different
machines.

## Scripts

### Building an Extension

```
yarn build
```

### Run Tests

```
yarn test
```

### Check for ESLint issues

```
yarn lint
```

### Start Storybook

```
yarn storybook
```
