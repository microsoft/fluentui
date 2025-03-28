import { modulePathResolverPlugin } from '@wc-toolkit/module-path-resolver';
import { cemValidatorPlugin } from '@wc-toolkit/cem-validator';
import { getTsProgram, typeParserPlugin } from "@wc-toolkit/type-parser";
import { cemInheritancePlugin } from "@wc-toolkit/cem-inheritance";

export default {
  /** Globs to analyze */
  globs: ['src/**/*.ts'],
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
      modulePathTemplate: (modulePath, name, tagName) => `./dist/esm/${getBaseTag(tagName)}/${getBaseTag(tagName)}.js`,
      definitionPathTemplate: (modulePath, name, tagName) => `./dist/esm/${getBaseTag(tagName)}/define.js`,
      typeDefinitionPathTemplate: (modulePath, name, tagName) => `./dist/dts/${getBaseTag(tagName)}/index.d.ts`,
    }),
    typeParserPlugin(),
    cemInheritancePlugin(),
    cemValidatorPlugin({
      rules: {
        packageJson: {
          main: 'off',
          module: 'off',
          types: 'off',
        },
        manifest: {
          schemaVersion: 'off',
        },
      },
    }),
  ],

  /** Overrides default module creation: */
  overrideModuleCreation({ts, globs}) {
    const program = getTsProgram(ts, globs, "tsconfig.json");
    return program
      .getSourceFiles()
      .filter((sf) => globs.find((glob) => sf.fileName.includes(glob)));
  },
};

function getBaseTag(tagName) {
  return tagName?.replace('fluent-', '');
}
