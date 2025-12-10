import { createDynamicProperty, createPropsSchema, values } from '@hmiproject/helio-sdk';
import { namespace } from '../../namespace';

// NOTE: This is example code. To activate, add it to the list of dynamic
// properties in the library extension definition in `src/main.tsx`.
export const basicDynamicProperty = createDynamicProperty(namespace, {
  // `name` and `description` are used to display this dynamic property in
  // the IDE.
  // Choose these so that HELIO users can easily understand what this
  // property does.
  name: 'Basic Property',
  description: 'Read-only dynamic property that displays a single value',

  icon: { name: 'Default' },

  // Dynamic properties often can be configured by the user.
  // Props added here will show in the IDE and allow editing.

  // Dynamic properties can be read-only or writable to allow them to be bound
  // to input elements. This property is read-only so the `writable` flag is
  // set to `false`.
  propsSchema: createPropsSchema().initial({}),

  // Each dynamic property can declare what types of data it can produce.
  // This impacts where the property can be used. For example, a dynamic
  // property that produces numeric values will be accepted as the value of
  // an Output.
  writable: false,

  valueTypes: ['NumericValue'],

  useDynamicProperty(_props) {
    return {
      // The property is
      valueType: values.Number(),

      // The dynamic property's raw value.
      value: 123,

      // The dynamic property's display value in human-readable format including
      // all potential formatting has been applied. This must always be a string
      // and is only used for display, not data entry.
      displayValue: '123',

      // Properties can individually enable/disable read permissions based on
      // custom logic.
      canRead: true,

      // Properties can individually enable/disable write permissions based on
      // custom logic.
      canWrite: false,
    };
  },
});
