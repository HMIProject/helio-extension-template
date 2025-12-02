import { createElement, createPropsSchema, props, traits, useAction } from '@hmiproject/helio-sdk';
import { Fragment } from 'react';
import { namespace } from '../../namespace';

// NOTE: This is example code. To activate, add it to the list of elements in
// the library extension definition in `src/main.tsx`.
export const elementWithAction = createElement(namespace, {
  name: 'Element With Action',
  description: '',

  traits: [traits.Control],

  propsSchema: createPropsSchema().initial({
    onClick: props.Action({ label: 'On Click', optional: true }),
  }),

  Component(props) {
    const onClick = useAction(props.onClick);

    return (
      <Fragment>
        {onClick.render()}

        <button disabled={onClick.canCall !== true} onClick={onClick.call}>
          Clickable Button
        </button>
      </Fragment>
    );
  },
});
