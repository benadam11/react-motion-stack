import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import css from 'rollup-plugin-css-only';
import pkg from './package.json';

const plugins = [
  css({
    output: 'build/motion-stack.css'
  }),
  resolve(),
  commonjs({
    include: /node_modules/
  }),
  babel({
    exclude: 'node_modules/**',
    babelrc: false,
    presets: [
      ['@babel/preset-env', { modules: false }],
      '@babel/preset-react',
      '@babel/preset-stage-1'
    ]
  })
];

export default [
  {
    input: 'src/main.js',
    output: {
      file: pkg.browser,
      format: 'umd',
      name: 'MotionStack',
      globals: {
        react: 'React',
        'react-motion': 'ReactMotion',
        'prop-types': 'PropTypes'
      }
    },
    // All the used libs needs to be here
    external: ['react', 'react-motion', 'prop-types'],
    plugins
  },
  {
    input: 'src/main.js',
    external: ['react', 'react-motion', 'prop-types'],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    // All the used libs needs to be here
    plugins
  }
];
