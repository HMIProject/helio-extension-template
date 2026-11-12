import {
  createElement,
  createPropsSchema,
  dynamicProperties,
  type InstanceRefListSchema,
  props,
  RenderInstances,
  traits,
  useDataVariable,
  useDynamicProperty,
  values,
} from '@hmiproject/helio-sdk';
import { Fragment } from 'react';
import { namespace } from '../../namespace';

// NOTE: This is example code. To activate, add it to the list of elements in
// the library extension definition in `src/main.tsx`.
//
// This example splits an element into two parts:
//
// 1. The element connects HELIO and React. It reads dynamic properties and
//    data variables, finds out which children are visible and passes plain
//    values on.
// 2. The component below holds the actual logic and rendering. It knows
//    nothing about the props schema or dynamic properties, so it can also be
//    developed and tested on its own, e.g. in Storybook.
export const elementWithComponent = createElement(namespace, {
  name: 'Element with Component',
  description: 'An element that passes its resolved values on to a component',

  traits: [traits.Widget],

  propsSchema: createPropsSchema().initial({
    title: props.DynamicProperty({
      label: 'Title',
      optional: true,
      valueType: 'String',
      defaultValue: dynamicProperties.Translatable('Title'),
    }),

    value: props.DynamicProperty({
      label: 'Value',
      optional: true,
      // Accepts numbers, strings, booleans, dates, times and durations, like
      // HELIO's own Output. See `useDataVariable` below.
      valueType: 'PrimitiveValue',
      defaultValue: dynamicProperties.StaticValue(42),
    }),

    controls: props.Children({
      label: 'Controls',
      allowedTraits: [traits.Control],
    }),
  }),

  Component(props) {
    // `useDynamicProperty` returns the value of any dynamic property.
    const title = useDynamicProperty(props.title, { valueType: values.String() });

    // `useDataVariable` additionally returns what a data variable knows about
    // its value: the formatted value, its unit, its limits and ranges.
    //
    // `values.Unknown()` accepts a value of any type. A narrower type such as
    // `values.Number()` turns every other value into `undefined`. The value is
    // formatted for any type. Values that only exist for numbers, such as
    // `relative` and `status`, are `undefined` for other types.
    const value = useDataVariable(props.value, { valueType: values.Unknown() });

    return (
      <Fragment>
        {/* Both hooks keep their values up to date at runtime through what
            `render()` returns, so it must always be rendered. */}
        {title.render()}
        {value.render()}

        {/* Children can be hidden by a display condition. `RenderInstances`
            finds out which ones are visible, so the component can lay out
            exactly what is shown. */}
        <RenderInstances instances={props.controls}>
          {(options) => (
            <ExampleComponent
              title={title.value}
              // `formatted.display` includes the unit
              value={value.value.formatted.display}
              // Between 0 and 1, if the variable has a minimum and maximum.
              relativeValue={value.value.relative}
              controls={options.visibleInstances.map((instance) => instance.instanceRef)}
            />
          )}
        </RenderInstances>
      </Fragment>
    );
  },
});

type ExampleComponentProps = {
  title: string | undefined;
  value: string | undefined;
  relativeValue: number | undefined;
  // References to the visible children only.
  controls: InstanceRefListSchema;
};

function ExampleComponent(props: ExampleComponentProps) {
  return (
    <div>
      <div>{props.title ?? '<no title>'}</div>
      <div>Value: {props.value ?? '<undefined>'}</div>
      <div>
        Relative value:{' '}
        {props.relativeValue === undefined
          ? '<undefined>'
          : `${Math.round(props.relativeValue * 100)} %`}
      </div>

      {props.controls.length === 0 ? (
        <div>No visible controls</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <RenderInstances
            instances={props.controls}
            // `render` wraps each child, here in a grid cell.
            render={(control) => <div key={control.key}>{control.render()}</div>}
          />
        </div>
      )}
    </div>
  );
}
