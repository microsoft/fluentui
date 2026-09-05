import * as React from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { isConformant as baseIsConformant } from '@fluentui/react-conformance';
import type { IsConformantOptions } from '@fluentui/react-conformance';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

type HeadlessIsConformantOptions<TProps> = Omit<IsConformantOptions<TProps>, 'componentPath'> & {
  /**
   * Path to component file. This is optional because the test file is usually in the same folder as the component file.
   */
  componentPath?: string;
  /**
   * Custom render options applied only to the axe test.
   */
  axeRenderOptions?: RenderOptions;
};

function kebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

export function isConformant<TProps = {}>(testInfo: HeadlessIsConformantOptions<TProps>): void {
  const { axeRenderOptions, ...baseTestInfo } = testInfo;
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
      'component-has-no-axe-violations': ({ Component, requiredProps, renderOptions }: IsConformantOptions<TProps>) => {
        it('has no axe violations (component-has-no-axe-violations)', async () => {
          const { container } = render(
            React.createElement(Component as React.ComponentType<Partial<TProps>>, requiredProps),
            { ...renderOptions, ...axeRenderOptions },
          );

          expect(await axe(container)).toHaveNoViolations();
        });
      },
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

  baseIsConformant(defaultOptions, baseTestInfo);
}
