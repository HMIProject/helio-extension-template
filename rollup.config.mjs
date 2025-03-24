import typescript from 'rollup-plugin-typescript2';
import externalGlobals from 'rollup-plugin-external-globals';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/main.tsx',
  output: { file: 'lib/my-extension.js' },

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
      zod: 'zod',
    }),
  ],
};
