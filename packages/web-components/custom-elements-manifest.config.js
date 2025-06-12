import { modulePathResolverPlugin } from '@wc-toolkit/module-path-resolver';
import { cemValidatorPlugin } from '@wc-toolkit/cem-validator';
import { getTsProgram, typeParserPlugin } from '@wc-toolkit/type-parser';
import { cemInheritancePlugin } from '@wc-toolkit/cem-inheritance';

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
      modulePathTemplate: (modulePath, name, tagName) => `./dist/esm/${getFolderName(name)}/${getFileName(name)}`,
      definitionPathTemplate: (modulePath, name, tagName) => `./dist/esm/${getFolderName(name)}/define.js`,
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
  overrideModuleCreation({ ts, globs }) {
    const program = getTsProgram(ts, globs, 'tsconfig.json');
    return program.getSourceFiles().filter(sf => globs.find(glob => sf.fileName.includes(glob)));
  },
};

function getFolderName(baseName) {
  // Convert "BaseAccordionItem" to "accordion-item"
  return baseName
    .replace(/^Base/, '') // Remove the "Base" prefix
    .replace(/([a-z])([A-Z])/g, '$1-$2') // Convert camelCase to kebab-case
    .toLowerCase();
}

function getFileName(baseName) {
  // Convert "BaseAccordionItem" to "accordion-item"
  const kebabCaseName = baseName
    .replace(/^Base/, '') // Remove the "Base" prefix
    .replace(/([a-z])([A-Z])/g, '$1-$2') // Convert camelCase to kebab-case
    .toLowerCase();

  // Construct the file path
  return `${kebabCaseName}${baseName.includes('Base') ? '.base' : ''}.js`;
}
