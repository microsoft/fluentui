import { isConformant as baseIsConformant } from '@fluentui/react-conformance';
import type { IsConformantOptions } from '@fluentui/react-conformance';
import { kebabCase } from 'lodash';

export function isConformant<TProps = {}>(
  testInfo: Omit<IsConformantOptions<TProps>, 'componentPath'> & { componentPath?: string; subpath?: string },
): void {
  // A family whose members share one subpath names it here; otherwise a component's subpath is its
  // own kebab-cased name — which is what every family shipped so far does, Accordion, Card and
  // Popover included, each giving its members their own subpath even though headless groups them.
  // Dialog is the first to share one, so this parameter defaults to the existing behaviour and
  // changes nothing for those families; whether the seven-member shape should become the house
  // default is a separate call this does not pre-empt.
  const { subpath, ...options } = testInfo;
  const name = subpath ?? kebabCase(testInfo.displayName);

  const defaultOptions: Partial<IsConformantOptions<TProps>> = {
    tsConfig: { configName: 'tsconfig.spec.json' },
    componentPath: require.main?.filename.replace('.test', ''),
    disabledTests: [
      // We don't support top-level exports
      'exported-top-level',
      // We use kebab case naming for top-level files
      'has-top-level-file',
      // Windmod components have no BEM static classnames — the public identity is the
      // marker pair (xClassNames = { root: 'fui-<name> group/fui-<name>' }; see componentMarkers).
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
      // The unused parameter is load-bearing: react-conformance schedules an extra test only
      // when its callback has arity 1.
      'export-map-entry-exists': (_testInfo: unknown) => {
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

  baseIsConformant(defaultOptions, options as IsConformantOptions<TProps>);
}
