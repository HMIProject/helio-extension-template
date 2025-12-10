import { createLibraryExtension } from '@hmiproject/helio-sdk';

/**
 * First Steps:
 *
 * 1. Set the package's name in `package.json`.
 * 2. Define your namespace in `src/namespace.ts.
 * 3. Change the `name`, `description` and `author` fields of `createLibraryExtension`.
 * 4. Try building with `npm run build`.
 */

export default createLibraryExtension({
  name: 'My HELIO Extension',
  description: 'Controls to extend the HELIO Library',
  version: '1.0.0',
  author: 'ACME Inc.',

  minimumRequiredHelioVersion: '25.4.0',

  actions: [
    // Examples:
    //
    // basicAction,
    // configurableAction,
  ],

  dynamicProperties: [
    // Examples:
    //
    // basicDynamicProperty,
  ],

  elements: [
    // Examples:
    //
    // pageElement,
    // widgetElement,
    // controlElement,
    // elementWithAction,
    // elementWithMigration,
    // elementWithCss,
  ],
});
