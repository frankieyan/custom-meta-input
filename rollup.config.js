import packageJson from './package.json'
import babel from 'rollup-plugin-babel'

export default {
  input: 'src/index.js',
  output: [
    { file: packageJson.main, format: 'cjs', sourcemap: true },
    { file: packageJson.module, format: 'esm', sourcemap: true },
  ],
  plugins: [
    babel({
      exclude: ['node_modules/**'],
    })
  ],
}
