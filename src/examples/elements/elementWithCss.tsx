import {
  className,
  createElement,
  createPropsSchema,
  cx,
  traits,
  useRenderMode,
} from '@hmiproject/helio-sdk';
import { namespace } from '../../namespace';

const classNames = {
  control: className({
    padding: 20,
  }),

  interactive: className({
    background: 'green',

    ':hover': {
      background: 'red',
    },
  }),
};

// NOTE: This is example code. To activate, add it to the list of elements in
// the library extension definition in `src/main.tsx`.
export const elementWithCss = createElement(namespace, {
  name: 'Element with CSS',
  description: 'An element showcasing CSS styling options',

  traits: [traits.Control],

  propsSchema: createPropsSchema().initial({}),

  Component() {
    const renderMode = useRenderMode();
    const isEditing = renderMode === 'PreviewEdit';

    // The content returned from this React Component will automatically be
    // wrapped with a widget container when displayed.
    return (
      <div
        // Elements can use static class names created with `className()`.
        className={classNames.control}
      >
        <div>Control Element Content</div>

        <div
          // Class names can also be based on logical conditions. Here we only
          // apply the interactive styling when the application is either in the
          // `Runtime` or `PreviewTest` states. This prevents hover styles from
          // showing in the IDE's edit mode.
          className={cx({
            [classNames.interactive]: !isEditing,
          })}
        >
          Interactive Content
        </div>
      </div>
    );
  },
});
