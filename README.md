# HELIO Extension Template

![HELIO SDK](https://helio-hmi.com/media-embed/Helio-SDK-Icon.svg)

This is the template repository for building [HELIO](https://helio-hmi.com/)
extensions using the
[HELIO SDK](https://www.npmjs.com/package/@hmiproject/helio-sdk).

A HELIO extension is one repository with one namespace. It can contain any
number of elements, actions, dynamic properties and icons.

## Requirements

This template uses `@hmiproject/helio-sdk` 1.1.0, which requires HELIO 26.2.0
or later.

## First Steps

1. Set the package's name and version in `package.json`. The extension reads
   its version from there.
2. Define your namespace in `src/namespace.ts`.
3. Change the `name`, `description` and `author` fields of
   `createLibraryExtension` in `src/main.tsx`.
4. Try building with `npm run build`.

`src/main.tsx` is the starting point of the extension: it lists everything
the extension contains. Examples for all of these can be found in
`src/examples/`.

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

This repository provides a basic setup with all the tools needed to make
building a HELIO extension as smooth as possible. However, none of them are
_required_. Feel free to replace them with your own preferred options.

We have also pinned a specific version of [Node.js](https://nodejs.org/) in the
`package.json` file. This relies on the JavaScript Tool Manager
[Volta](https://volta.sh/). Using Volta and these versions is optional but can reduce
unexpectedly inconsistent behavior across different machines.
