import * as React from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { isConformant as baseIsConformant } from '@fluentui/react-conformance';
import type { IsConformantOptions } from '@fluentui/react-conformance';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

type ModernIsConformantOptions<TProps> = Omit<IsConformantOptions<TProps>, 'componentPath'> & {
  /**
   * Path to component file. This is optional because the test file is usually in the same folder as the component file.
   */
  componentPath?: string;
  /**
   * Custom render options applied only to the axe test.
   */
  axeRenderOptions?: RenderOptions;
};

export function isConformant<TProps = {}>(testInfo: ModernIsConformantOptions<TProps>): void {
  const { axeRenderOptions, ...baseTestInfo } = testInfo;
  const defaultOptions: Partial<IsConformantOptions<TProps>> = {
    tsConfig: { configName: 'tsconfig.spec.json' },
    componentPath: require.main?.filename.replace('.test', ''),
    disabledTests: ['component-has-static-classnames-object'],
    extraTests: {
      'component-has-no-axe-violations': ({ Component, requiredProps, renderOptions }: IsConformantOptions<TProps>) => {
        it('has no axe violations (component-has-no-axe-violations)', async () => {
          const { baseElement } = render(
            React.createElement(Component as React.ComponentType<Partial<TProps>>, requiredProps),
            { ...renderOptions, ...axeRenderOptions },
          );

          expect(await axe(baseElement, { rules: { region: { enabled: false } } })).toHaveNoViolations();
        });
      },
    },
  };

  baseIsConformant(defaultOptions, baseTestInfo);
}
