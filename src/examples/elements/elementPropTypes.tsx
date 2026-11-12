import {
  condition,
  createElement,
  createPropsSchema,
  fileUrl,
  props,
  RenderDynamicProperty,
  traits,
} from '@hmiproject/helio-sdk';
import { Fragment } from 'react';
import { namespace } from '../../namespace';

// NOTE: This is example code. To activate, add it to the list of elements in
// the library extension definition in `src/main.tsx`.
export const elementPropTypes = createElement(namespace, {
  name: 'Prop Type Example Element',
  description: 'An example that showcases different prop types',

  traits: [traits.Widget],

  propsSchema: createPropsSchema().initial({
    // Basic types
    //
    // `propGroup` groups props under a common heading in the editor.

    booleanValue: props.Boolean({
      label: 'Boolean',
      optional: true,
      propGroup: 'Basic types',
      // Most props accept a description that is displayed below them in the
      // editor.
      description: 'A description explains the purpose of a prop.',
    }),

    numberValue: props.Number({
      label: 'Number',
      optional: true,
      propGroup: 'Basic types',
      // The editor only accepts values within this range. Either bound can
      // also be set on its own.
      minValue: 0,
      maxValue: 100,
      // The unit is displayed next to the input in the editor. It does not change the
      // stored value.
      unit: 'mm',
    }),

    stringValue: props.String({
      label: 'String',
      optional: true,
      propGroup: 'Basic types',
      // Shows a text area in the editor, so the string can contain line breaks.
      multiline: true,
    }),

    file: props.File({ label: 'File', optional: true, propGroup: 'Basic types' }),

    dynamicPropertyValue: props.DynamicProperty({
      label: 'Dynamic property',
      optional: true,
      propGroup: 'Basic types',
      // A dynamic property can accept several value types.
      valueType: ['NumericValue', 'String'],
    }),

    // Enums

    enumValue: props.Enum({
      label: 'Enum',
      optional: true,
      propGroup: 'Enums',
      options: ['one', 'two', 'three'],
    }),

    // Options can also be objects with a label, an icon and a tooltip.
    // Tooltips are only shown when the editor is `button-group`, which is the
    // default for up to three options.
    enumWithLabels: props.Enum({
      label: 'Enum with labels, icons and tooltips',
      optional: true,
      propGroup: 'Enums',
      editor: 'button-group',
      options: [
        { value: 'one', label: 'One', icon: { name: 'Circle' }, tooltip: 'The first option' },
        { value: 'two', label: 'Two', icon: { name: 'Square' }, tooltip: 'The second option' },
        { value: 'three', label: 'Three', icon: { name: 'Triangle' }, tooltip: 'The third option' },
      ],
    }),

    enumAsDropdown: props.Enum({
      label: 'Enum as dropdown',
      optional: true,
      propGroup: 'Enums',
      editor: 'dropdown',
      options: [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
        { value: 'three', label: 'Three' },
      ],
    }),

    // Conditions
    //
    // `visibleIf` hides a prop and `enabledIf` grays it out while a sibling
    // prop does not match the condition. Hidden props keep their value.
    //
    // The sibling prop is referenced by its name as a string, which is not
    // type checked. If no prop with that name exists, the condition never
    // matches.

    controllingEnum: props.Enum({
      label: 'Controlling enum',
      optional: false,
      defaultValue: 'a',
      propGroup: 'Conditions',
      options: ['a', 'b', 'c'],
    }),

    visibleIfA: props.String({
      label: 'Visible if a',
      optional: true,
      propGroup: 'Conditions',
      visibleIf: condition.propEquals('controllingEnum', 'a'),
    }),

    visibleIfNotA: props.String({
      label: 'Visible if not a',
      optional: true,
      propGroup: 'Conditions',
      visibleIf: condition.propNotEquals('controllingEnum', 'a'),
    }),

    // `propOneOf` and `propNotOneOf` only compare strings and numbers.
    visibleIfAOrB: props.String({
      label: 'Visible if a or b',
      optional: true,
      propGroup: 'Conditions',
      visibleIf: condition.propOneOf('controllingEnum', ['a', 'b']),
    }),

    visibleIfNeitherAOrB: props.String({
      label: 'Visible if neither a nor b',
      optional: true,
      propGroup: 'Conditions',
      visibleIf: condition.propNotOneOf('controllingEnum', ['a', 'b']),
    }),

    controllingBoolean: props.Boolean({
      label: 'Controlling boolean',
      optional: false,
      defaultValue: false,
      propGroup: 'Conditions',
    }),

    enabledIfTrue: props.String({
      label: 'Enabled if true',
      optional: true,
      propGroup: 'Conditions',
      enabledIf: condition.propEquals('controllingBoolean', true),
    }),

    // Objects and lists

    // An object groups nested props. Its default value is composed from the
    // defaults of the nested props.
    objectValue: props.Object({
      label: 'Object',
      optional: false,
      shape: {
        x: props.Number({ label: 'X', optional: false, defaultValue: 0 }),
        y: props.Number({ label: 'Y', optional: false, defaultValue: 0 }),
      },
    }),

    // A list holds any number of items of one prop type. Items must not be
    // optional, so a new item always has a value.
    listValue: props.List({
      label: 'List',
      optional: false,
      item: props.Object({
        label: 'Item',
        optional: false,
        shape: {
          label: props.String({ label: 'Label', optional: false, defaultValue: 'Item' }),
          value: props.Number({ label: 'Value', optional: false, defaultValue: 0 }),
        },
      }),
      defaultValue: [
        { label: 'A', value: 1 },
        { label: 'B', value: 2 },
      ],
    }),
  }),

  Component(props) {
    // The content returned from this React Component will automatically be
    // wrapped with a widget container when displayed.
    return (
      <Fragment>
        <div>
          Boolean:{' '}
          {props.booleanValue === undefined ? '<undefined>' : props.booleanValue.toString()}
        </div>
        <div>
          Number: {props.numberValue === undefined ? '<undefined>' : `${props.numberValue} mm`}
        </div>
        {/* HTML ignores line breaks in text by default. `pre-wrap` keeps them. */}
        <div style={{ whiteSpace: 'pre-wrap' }}>String: {props.stringValue ?? '<undefined>'}</div>
        <div>File Url: {fileUrl(props.file) ?? '<undefined>'}</div>
        <div>
          Dynamic property:{' '}
          {props.dynamicPropertyValue ? (
            <RenderDynamicProperty value={props.dynamicPropertyValue} />
          ) : (
            '<undefined>'
          )}
        </div>
        <div>Enum: {props.enumValue ?? '<undefined>'}</div>
        <div>Enum with labels: {props.enumWithLabels ?? '<undefined>'}</div>
        <div>Enum as dropdown: {props.enumAsDropdown ?? '<undefined>'}</div>
        <div>Controlling enum: {props.controllingEnum}</div>
        <div>Visible if a: {props.visibleIfA ?? '<undefined>'}</div>
        <div>Visible if not a: {props.visibleIfNotA ?? '<undefined>'}</div>
        <div>Visible if a or b: {props.visibleIfAOrB ?? '<undefined>'}</div>
        <div>Visible if neither a nor b: {props.visibleIfNeitherAOrB ?? '<undefined>'}</div>
        <div>Controlling boolean: {props.controllingBoolean.toString()}</div>
        <div>Enabled if true: {props.enabledIfTrue ?? '<undefined>'}</div>
        <div>
          Object: ({props.objectValue.x}, {props.objectValue.y})
        </div>
        <div>
          List:{' '}
          {props.listValue.map((item) => `${item.label} = ${item.value}`).join(', ') || '<empty>'}
        </div>
      </Fragment>
    );
  },
});
