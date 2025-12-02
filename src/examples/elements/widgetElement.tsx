import { createElement, createPropsSchema, traits } from '@hmiproject/helio-sdk';
import { namespace } from '../../namespace';

// NOTE: This is example code. To activate, add it to the list of elements in
// the library extension definition in `src/main.tsx`.
export const widgetElement = createElement(namespace, {
  // `name` and `description` are used to display this element in the IDE.
  // Choose these so that HELIO users can easily understand what this
  // element does.
  name: 'Widget Element',
  description: 'An element that can be added to the Dashboard Page',

  // Tell HELIO that this element can be used as a Widget.
  // This will allow the element to be added to Dashboard pages.
  traits: [traits.Widget],

  // The `propsSchema` defines the props on your element that can be edited
  // in the HELIO IDE.
  propsSchema: createPropsSchema().initial({
    // Add your custom props here.
    //
    // Note that the `Widget` trait automatically gives this element the
    // standard Widget props like title and icon, so you only need to configure
    // props that are specific to _your_ element.
  }),

  Component() {
    // The content returned from this React Component will automatically be
    // wrapped with a widget container when displayed.
    return <div>Widget Element Content</div>;
  },
});
