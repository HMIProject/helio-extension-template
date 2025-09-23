import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        // Sort folders and story titles in ascending order. This does not
        // affect the order of stories within a folder. They are sorted by
        // the order they are defined in the story file.
        method: 'alphabetical',
      },
    },
  },
};

export default preview;
