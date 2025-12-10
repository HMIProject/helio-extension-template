import { createElement, createPropsSchema, fileUrl, props, traits } from '@hmiproject/helio-sdk';
import { Fragment } from 'react';
import { namespace } from '../../namespace';

// NOTE: This is example code. To activate, add it to the list of elements in
// the library extension definition in `src/main.tsx`.
export const elementPropTypes = createElement(namespace, {
  name: 'Prop Type Example Element',
  description: 'An example that showcases different prop types',

  traits: [traits.Widget],

  propsSchema: createPropsSchema().initial({
    booleanValue: props.Boolean({ label: 'Boolean', optional: true }),

    numberValue: props.Number({ label: 'Number', optional: true }),

    stringValue: props.String({ label: 'String', optional: true }),

    enumValue: props.Enum({ label: 'Enum', optional: true, options: ['one', 'two', 'three'] }),

    file: props.File({ label: 'File', optional: true }),
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
        <div>Number: {props.numberValue ?? '<undefined>'}</div>
        <div>String: {props.stringValue ?? '<undefined>'}</div>
        <div>Enum: {props.enumValue ?? '<undefined>'}</div>
        <div>File Url: {fileUrl(props.file) ?? '<undefined>'}</div>
      </Fragment>
    );
  },
});
