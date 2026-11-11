// SVG files are imported as React components, see the `svgr` plugin in
// `rollup.config.mjs`.
declare module '*.svg' {
  import type { FC, SVGProps } from 'react';

  const ReactComponent: FC<SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
