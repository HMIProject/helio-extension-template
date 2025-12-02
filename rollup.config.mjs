import typescript from 'rollup-plugin-typescript2';
import externalGlobals from 'rollup-plugin-external-globals';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';

// eslint-disable-next-line no-undef
const { npm_package_name: name, npm_package_version: version } = process.env;

if (name === 'helio-extension-template') {
  console.log(`\x1b[43mDon't forget to define your package name in 'package.json'.
Still using the default: '${name}'.\x1b[0m`);
}

export default {
  input: 'src/main.tsx',
  output: {
    file: `lib/${name}-${version}.js`,
  },

  external: ['react', 'react/jsx-runtime', '@hmiproject/helio-sdk'],

  plugins: [
    replace({
      preventAssignment: true,

      'process.env.NODE_ENV': JSON.stringify('production'),
    }),

    nodeResolve({}),
    commonjs({}),
    typescript({}),
    externalGlobals({
      'react/jsx-runtime': '$',
      '@hmiproject/helio-sdk': 'HELIO.v1',
      react: 'React',
    }),
  ],
};
