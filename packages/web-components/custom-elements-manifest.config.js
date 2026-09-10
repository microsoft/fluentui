import { modulePathResolverPlugin } from '@wc-toolkit/module-path-resolver';
import { cemValidatorPlugin } from '@wc-toolkit/cem-validator';
import { getTsProgram, typeParserPlugin } from '@wc-toolkit/type-parser';
import { cemInheritancePlugin } from '@wc-toolkit/cem-inheritance';
import { sourcePathToDistPlugin } from './scripts/source-path-to-dist-plugin.js';

export default {
  /** Globs to analyze */
  globs: ['src/**/*.ts'],
  /** Directory to output the manifest to */
  outdir: './',
  /** Disable package.json updates */
  packagejson: false,
  /** Globs to exclude */
  exclude: [
    '_docs/**/*',
    'src/**/*.bench.ts',
    'src/**/*.definition.ts',
    'src/**/*.options.ts',
    'src/**/*.spec.ts',
    'src/**/*.stories.ts',
    'src/**/*.styles.ts',
    'src/**/*.template.ts',
    'src/**/define.ts',
    'src/**/index.ts',
  ],
  /** Enable special handling for fast */
  fast: true,
  /** Provide custom plugins */
  plugins: [
    modulePathResolverPlugin({
      modulePathTemplate: (modulePath, name, tagName) =>
        modulePath.replace(/^(\.\/)?src\//, './dist/esm/').replace(/\.ts$/, '.js'),
      definitionPathTemplate: (modulePath, name, tagName) => {
        const folder = modulePath.replace(/^(\.\/)?src\//, './dist/esm/').replace(/\/[^/]+$/, '');
        return `${folder}/define.js`;
      },
    }),
    typeParserPlugin(),
    cemInheritancePlugin(),
    sourcePathToDistPlugin(),
    cemValidatorPlugin({
      rules: {
        packageJson: {
          main: 'off',
          module: 'off',
          types: 'off',
          customElements: 'off',
        },
        manifest: {
          schemaVersion: 'off',
        },
      },
    }),
  ],

  /** Overrides default module creation: */
  overrideModuleCreation({ ts, globs }) {
    const program = getTsProgram(ts, globs, 'tsconfig.json');
    return program.getSourceFiles().filter(sf => globs.find(glob => sf.fileName.includes(glob)));
  },
};
