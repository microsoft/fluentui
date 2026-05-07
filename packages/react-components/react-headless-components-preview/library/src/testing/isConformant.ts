import { isConformant as baseIsConformant } from '@fluentui/react-conformance';
import type { IsConformantOptions } from '@fluentui/react-conformance';

function kebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

export function isConformant<TProps = {}>(
  testInfo: Omit<IsConformantOptions<TProps>, 'componentPath'> & { componentPath?: string },
): void {
  const name = kebabCase(testInfo.displayName);

  const defaultOptions: Partial<IsConformantOptions<TProps>> = {
    tsConfig: { configName: 'tsconfig.spec.json' },
    componentPath: require.main?.filename.replace('.test', ''),
    disabledTests: [
      // We don't support top-level exports
      'exported-top-level',
      // We use kebab case naming for top-level files
      'has-top-level-file',
      // Headless components don't have static classnames, so we need to disable this test
      'component-has-static-classnames-object',
    ],
    disableTypeTests: true,
    extraTests: {
      'has-top-level-file-extra': ({ displayName, Component }: IsConformantOptions<TProps>) => {
        it(`has corresponding top-level file 'src/${name}.ts' (has-top-level-file)`, () => {
          const topLevelFile = require(`../${name}.ts`);

          expect(topLevelFile[displayName]).toBe(Component);
        });
      },

      // This test ensures that the component has an export map entry in the package.json file,
      // which is required for proper module resolution and type definitions.
      'export-map-entry-exists': () => {
        const packageJSON = require('../../package.json');

        it('component has export map entry in package.json', () => {
          const exportEntry = `./${name}`;

          expect(packageJSON.exports[exportEntry]).toEqual({
            types: `./dist/${name}.d.ts`,
            node: `./lib-commonjs/${name}.js`,
            require: `./lib-commonjs/${name}.js`,
            import: `./lib/${name}.js`,
          });
        });
      },
    },
  };

  baseIsConformant(defaultOptions, testInfo);
}
