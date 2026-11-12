import { createIcon } from '@hmiproject/helio-sdk';
import { namespace } from '../../namespace';
import PackageIconS from './Package-S.svg';
import PackageIconM from './Package-M.svg';
import PackageIconL from './Package-L.svg';

// NOTE: This is example code. To activate, add it to the list of icons in
// the library extension definition in `src/main.tsx`.
export const sizedIcon = createIcon(namespace, {
  name: 'SDK Package',
  description: 'A package, drawn separately for each icon size',
  category: 'My Extension Icons',

  // The sizes `S`, `M` and `L` are versions of the icon with different levels
  // of detail. The element rendering the icon decides which version is shown
  // and how large it appears.
  //
  // When an icon is used as the icon of an element, action or dynamic
  // property, HELIO checks its SVG and only shows it if it follows these
  // rules, otherwise it logs a warning in the browser console. This is not
  // yet possible with SDK 1.1.0. Icons in the IDE's icon selector are shown
  // without this check.
  //
  // - Only `svg`, `g`, `path`, `circle`, `ellipse`, `rect`, `line`,
  //   `polyline` and `polygon`.
  // - `fill` and `stroke` set to `currentColor` or `none`, so the icon takes
  //   the color of the surrounding text. Every shape except `line` needs a
  //   fill on itself or a parent.
  // - `width="1em"` and `height="1em"` on the `svg`, which the `svgr` plugin
  //   in `rollup.config.mjs` takes care of.
  Icon({ size, ...props }) {
    switch (size) {
      case 'S':
        return <PackageIconS {...props} />;
      case 'M':
        return <PackageIconM {...props} />;
      case 'L':
        return <PackageIconL {...props} />;
    }
  },
});
