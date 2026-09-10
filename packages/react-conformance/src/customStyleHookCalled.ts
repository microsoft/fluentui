import type { IsConformantOptions } from './types';

export const CUSTOM_STYLE_HOOK_CALLED_TEST_NAME = 'component-calls-custom-style-hook';
const CUSTOM_STYLE_HOOK_PROP = 'useCustomStyleHook_unstable' as const;
const PLAIN_OBJECT_MATCHER = {
  asymmetricMatch: (value: unknown) =>
    typeof value === 'object' && value !== null && Object.getPrototypeOf(value) === Object.prototype,
  toString: () => 'PlainObject',
};

/**
 * Requires a component from a file path, required for proper mocking.
 */
async function getReactComponent<TProps extends {}>(
  componentPath: string,
  testInfo: IsConformantOptions<TProps>,
): Promise<IsConformantOptions<TProps>['Component']> {
  const componentModule = await import(componentPath);
  const component = testInfo.useDefaultExport ? componentModule.default : componentModule[testInfo.displayName];

  if (!component) {
    const expectedExport = testInfo.useDefaultExport ? 'default' : testInfo.displayName;
    const availableExports = Object.keys(componentModule).join(', ');

    throw new Error(
      `Unable to resolve component export "${expectedExport}" from "${componentPath}". ` +
        `Available exports: ${availableExports || '(none)'}. Check componentPath, displayName, and useDefaultExport.`,
    );
  }

  return component;
}

/**
 * Ensures that components call useCustomStyleHook_unstable with an expected hook name
 * and then invoke the returned hook with component state.
 */
export function customStyleHookCalled<TProps extends {}>(testInfo: IsConformantOptions<TProps>): void {
  describe(CUSTOM_STYLE_HOOK_CALLED_TEST_NAME, () => {
    let container: HTMLElement | null = null;
    let createdContainer = false;

    beforeEach(() => {
      jest.clearAllMocks();

      if (testInfo.renderOptions?.container) {
        container = testInfo.renderOptions.container;
        createdContainer = false;
      } else {
        container = document.createElement('div');
        document.body.appendChild(container);
        createdContainer = true;
      }
    });

    afterEach(() => {
      if (createdContainer && container?.parentNode) {
        container.parentNode.removeChild(container);
      }

      container = null;
      createdContainer = false;
    });

    it('calls custom style hook with state', async () => {
      /* eslint-disable @fluentui/no-global-react */
      const hooks: Record<string, jest.Mock> = {};
      const useCustomStyleHook = jest.fn((hookName: string) => (hooks[hookName] ??= jest.fn()));
      let unmount: (() => void) | undefined;
      const expectedHookName =
        testInfo.testOptions?.[CUSTOM_STYLE_HOOK_CALLED_TEST_NAME]?.hookName ??
        `use${testInfo.displayName}Styles_unstable`;

      await jest.isolateModulesAsync(async () => {
        jest.doMock('@fluentui/react-shared-contexts', () => {
          const module = jest.requireActual('@fluentui/react-shared-contexts');

          return { ...module, [CUSTOM_STYLE_HOOK_PROP]: useCustomStyleHook };
        });

        const React = await import('react');
        const { render } = await import('@testing-library/react/pure');

        const Component = await getReactComponent(testInfo.componentPath, testInfo);
        const Wrapper = testInfo.renderOptions?.wrapper;
        let element: React.ReactElement = React.createElement(Component, { ...testInfo.requiredProps } as TProps);

        if (Wrapper) {
          element = React.createElement(Wrapper, null, element);
        }

        const result = render(element, { container: container as HTMLElement });
        unmount = result.unmount;
      });

      expect(useCustomStyleHook).toHaveBeenCalledWith(expectedHookName);
      expect(hooks[expectedHookName]).toHaveBeenCalledWith(
        expect.objectContaining({ components: PLAIN_OBJECT_MATCHER }),
      );

      unmount?.();
    });
  });
}
