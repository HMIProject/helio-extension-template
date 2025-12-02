import { createAction, createPropsSchema } from '@hmiproject/helio-sdk';
import { namespace } from '../../namespace';

// NOTE: This is example code. To activate, add it to the list of actions in
// the library extension definition in `src/main.tsx`.
export const basicAction = createAction(namespace, {
  name: 'Basic Action',
  description: 'Performs custom logic',
  icon: { name: 'Runner' },

  propsSchema: createPropsSchema().initial({}),

  useAction(_props) {
    return {
      canCall: true,

      call() {
        alert('Action called');
      },
    };
  },
});
