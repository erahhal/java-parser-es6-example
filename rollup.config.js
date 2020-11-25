import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'node_modules/java-parser/src/index.js',
  output: {
    file: 'src/vendor/java-parser/java-parser.js',
    format: 'es'
  },
  plugins: [resolve(), commonjs()]
};
