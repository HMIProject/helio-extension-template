import {
  createElement,
  createPropsSchema,
  dynamicProperties,
  props,
  RenderDynamicProperty,
  traits,
} from '@hmiproject/helio-sdk';
import { Fragment } from 'react';
import { namespace } from '../../namespace';

// NOTE: This is example code. To activate, add it to the list of elements in
// the library extension definition in `src/main.tsx`.
export const elementWithMigration = createElement(namespace, {
  name: 'Element with Migration',
  description: 'An element that showcases built-in migration support',

  traits: [traits.Control],

  // The `propsSchema` defines the props on your element that can be edited
  // in the HELIO IDE. Using migrations, we can ensure that old projects stay
  // compatible with new versions of our extensions.
  propsSchema: createPropsSchema()
    // V1
    //
    // Defines the initial version of the schema.
    .initial({
      // Initially, this element had a prop called `status`,
      status: props.String({
        label: 'Status',
        optional: false,
        defaultValue: 'Default Value',
      }),

      // …and a `count` prop that was a simple number.
      count: props.Number({ label: 'Count', optional: false, defaultValue: 0 }),
    })

    // V2
    //
    // New prop versions can be introduced by calling `.migrate()` on the latest schema.
    .migrate(
      {
        // The new version renames the `status` prop to `statusMessage`
        statusMessage: props.String({
          label: 'Status message',
          optional: false,
          defaultValue: 'Default Value',
        }),

        // The `count` prop remains unchanged in this version.
        count: props.Number({ label: 'Count', optional: false, defaultValue: 0 }),
      },

      // Whenever a project includes this element in the initial V1
      // configuration, its props will be passed to this migration function.
      // The function can perform transformations, copy data or calculate new
      // values and has to return an object that matches the V2 props schema.
      (prevProps) => {
        return {
          // Copy the old `value` prop to the new `itemValue` prop.
          statusMessage: prevProps.status,

          // Pass the `count` prop along unchanged.
          count: prevProps.count,
        };
      },
    )

    // V3
    //
    // Migrations can be chained indefinitely as new requirements are added.
    .migrate(
      {
        // The `statusMessage` prop remains unchanged in this version.
        statusMessage: props.String({
          label: 'Status message',
          optional: false,
          defaultValue: 'Default Value',
        }),

        // The `count` prop is changed to be a dynamic property instead of a
        // simple number.
        count: props.DynamicProperty({
          label: 'Count',
          optional: false,
          defaultValue: dynamicProperties.StaticValue(0),
          valueType: 'Integer',
        }),

        // We also introduce a new prop that was not part of any
        // previous schema.
        isActive: props.Boolean({ label: 'Is active', defaultValue: true, optional: false }),
      },

      // We keep running all migration functions for any element that is still
      // using an older configuration. When we encounter elements of V2, only
      // this function will run. For elements of V1, both V2's and V3's
      // migration functions will run, one after another.
      (prevProps) => {
        return {
          // Pass the `statusMessage` prop along unchanged.
          statusMessage: prevProps.statusMessage,

          // Use the previous `count` number value to instantiate a
          // `Static Value` dynamic property with its value set to `count`.
          count: dynamicProperties.StaticValue(prevProps.count),

          // Include a default value for the new prop.
          isActive: true,
        };
      },
    ),

  // Components are guaranteed to always receive props that match the most
  // recent schema after all migrations have been applied.
  Component(props) {
    return (
      <Fragment>
        <div>Status message: {props.statusMessage}</div>
        <div>
          Count: <RenderDynamicProperty value={props.count} />
        </div>
        <div>Is active: {props.isActive.toString()}</div>
      </Fragment>
    );
  },
});
