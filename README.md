# HELIO Extension Template

![HELIO SDK](https://helio-hmi.com/media-embed/Helio-SDK-Icon.svg)

This is the template repository for building [HELIO](https://helio-hmi.com/)
extensions using the
[HELIO SDK](https://www.npmjs.com/package/@hmiproject/helio-sdk).

## Get Started with the HELIO SDK

- [Extend HELIO Using the SDK](https://docs.helio-hmi.com/docs/guides/sdk/)
- [Create Your First Extension](https://docs.helio-hmi.com/docs/guides/sdk/create-your-first-extension/)
- [Package and Install Your Extension in HELIO](https://docs.helio-hmi.com/docs/guides/sdk/create-your-first-extension/deploy/)

## Scripts

**Building the Extension**
```
npm run build
```

**Run Tests**
```
npm run test
```

**Check for ESLint Issues**
```
npm run lint
```

**Start Storybook**
```
npm run storybook
```

## Note on Tooling

While this repository provides a basic setup and includes all necessary tools
for easy development to make the process of building a HELIO extension as smooth
as possible. However, none of them are _required_. Feel free to replace them
with your own preferred options.

We have also pinned a specific version of [Node.js](https://nodejs.org/) in the
`package.json` file. This relies on the JavaScript Tool Manager
[Volta](https://volta.sh/). Using Volta and these versions is optional but can reduce
unexpectedly inconsistent behavior across different machines.
