import { isConformant as baseIsConformant } from '@fluentui/react-conformance';
import type { IsConformantOptions } from '@fluentui/react-conformance';
import { kebabCase } from 'lodash';

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
      // Windmod components have no BEM static classnames — the public identity class is
      // the group marker alone (xClassNames = { root: 'group/fui-<name>' }).
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

      // The component must have an export map entry in package.json for proper module
      // resolution and type definitions (this package's dual ESM/CJS shape).
      'export-map-entry-exists': () => {
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
