import * as fs from 'node:fs';
import * as path from 'node:path';

import { isConformant as baseIsConformant } from '@fluentui/react-conformance';
import type { IsConformantOptions } from '@fluentui/react-conformance';

/**
 * Builds component directory -> family barrel from the barrels' own re-export specifiers.
 *
 * Exported for its own tests; `familyByComponentDir` is the filesystem-backed instance.
 *
 * A component reachable from **two** barrels throws rather than resolving to whichever barrel the
 * directory listing happened to yield last — that ambiguity is exactly the "silently checking the
 * wrong subpath" failure this derivation exists to prevent, and it is the rule the merge script
 * enforces on the same data.
 *
 * @param barrels - `[family, source text]` for each `src/<family>.ts`
 */
export function buildFamilyMap(barrels: Iterable<readonly [string, string]>): ReadonlyMap<string, string> {
  const map = new Map<string, string>();

  for (const [family, source] of barrels) {
    for (const match of source.matchAll(/from '\.\/components\/([A-Za-z0-9]+)'/g)) {
      const componentDir = match[1];
      const existing = map.get(componentDir);

      if (existing !== undefined && existing !== family) {
        throw new Error(
          `isConformant: './components/${componentDir}' is re-exported by two family barrels, ` +
            `src/${existing}.ts and src/${family}.ts. A component belongs to exactly one family — ` +
            `remove the duplicate re-export.`,
        );
      }

      map.set(componentDir, family);
    }
  }

  return map;
}

/**
 * Component directory -> the family barrel that re-exports it, read off `src/*.ts` itself.
 *
 * The package ships FAMILY barrels aligned to the headless package's subpaths, so a component's
 * public subpath is its family's, not its own name (MenuItem lives at `./menu`, CardHeader at
 * `./card`). Deriving the map from the barrels rather than hand-maintaining one means a component
 * moved between families needs no test edit, and a component in no barrel — or in two — fails
 * loudly instead of silently checking the wrong subpath.
 */
const familyByComponentDir: ReadonlyMap<string, string> = (() => {
  const srcDir = path.resolve(__dirname, '..');

  return buildFamilyMap(
    fs
      .readdirSync(srcDir)
      .filter(file => file.endsWith('.ts') && file !== 'index.ts')
      .map(file => [file.replace(/\.ts$/, ''), fs.readFileSync(path.join(srcDir, file), 'utf8')] as const),
  );
})();

export function isConformant<TProps = {}>(
  testInfo: Omit<IsConformantOptions<TProps>, 'componentPath'> & { componentPath?: string },
): void {
  const options = testInfo;
  // `require.main.filename` is the running test file, eg. `src/components/MenuItem/MenuItem.test.tsx`.
  const componentDir = path.basename(path.dirname(require.main?.filename ?? ''));
  const name = familyByComponentDir.get(componentDir);

  if (!name) {
    throw new Error(
      `isConformant: no family barrel in src/*.ts re-exports './components/${componentDir}'. ` +
        `Add the component to its family barrel before adding conformance tests.`,
    );
  }

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
