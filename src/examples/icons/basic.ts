import { createIcon } from '@hmiproject/helio-sdk';
import { namespace } from '../../namespace';
import HelioIcon from './HELIO.svg';

// NOTE: This is example code. To activate, add it to the list of icons in
// the library extension definition in `src/main.tsx`.
export const basicIcon = createIcon(namespace, {
  // `name`, `description` and `category` are used to display this icon in the
  // IDE's icon selector. The name must be unique within the namespace.
  name: 'HELIO',
  description: 'The HELIO logo',
  category: 'My Extension Icons',

  // The SVG is scaled to the size of the place where it is rendered.
  Icon: HelioIcon,
});
