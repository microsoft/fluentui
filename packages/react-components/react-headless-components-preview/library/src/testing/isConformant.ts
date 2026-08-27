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

  // Subcomponents have no top-level entry file and therefore no export map entry of their own.
  const isSubcomponent = Boolean(testInfo.disabledTests?.includes('has-top-level-file-extra'));

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
      ...(isSubcomponent ? ['export-map-entry-exists'] : []),
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
      // Note: the single parameter is required - react-conformance only runs extra tests with arity 1
      // when `disableTypeTests` is enabled.
      'export-map-entry-exists': (_options: IsConformantOptions<TProps>) => {
        const packageJSON = require('../../package.json');

        it('component has export map entry in package.json', () => {
          const exportEntry = `./${name}`;

          expect(packageJSON.exports[exportEntry]).toEqual({
            import: {
              types: `./dist/${name}.d.ts`,
              default: `./lib/${name}.js`,
            },
            require: {
              types: `./dist/${name}.d.cts`,
              default: `./lib-commonjs/${name}.cjs`,
            },
          });
        });
      },
    },
  };

  baseIsConformant(defaultOptions, testInfo);
}
