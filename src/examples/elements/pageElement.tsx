import { createElement, createPropsSchema, traits } from '@hmiproject/helio-sdk';
import { namespace } from '../../namespace';

// NOTE: This is example code. To activate, add it to the list of elements in
// the library extension definition in `src/main.tsx`.
export const pageElement = createElement(namespace, {
  // `name` and `description` are used to display this element in the IDE.
  // Choose these so that HELIO users can easily understand what this
  // element does.
  name: 'Page Element',
  description: 'A page element that can be added to the HMI',

  // Tell HELIO that this element can be used as a Page.
  // This will allow the element to be added to HMIs, Page Groups or Tab Groups.
  traits: [traits.Page],

  // The `propsSchema` defines the props on your element that can be edited
  // in the HELIO IDE.
  propsSchema: createPropsSchema().initial({
    // Add your custom props here.
    //
    // Note that the `Page` trait automatically gives this element the
    // standard Page props like title and icon, so you only need to configure
    // props that are specific to _your_ element.
  }),

  Component() {
    // The content returned from this React Component will automatically be
    // wrapped with a page container when displayed.
    return <div>Page Element Content</div>;
  },
});
