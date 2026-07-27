import type { ReactElement } from 'react';

import type { BaseConformanceTest, IsConformantOptions } from './types';

export const CUSTOM_STYLE_HOOK_CALLED_TEST_NAME = 'component-calls-custom-style-hook';
const CUSTOM_STYLE_HOOK_PROP = 'useCustomStyleHook_unstable' as const;

/**
 * Requires a component from a file path, required for proper mocking.
 */
async function getReactComponent(
  componentPath: string,
  testInfo: IsConformantOptions,
): Promise<IsConformantOptions['Component']> {
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
export const customStyleHookCalled: BaseConformanceTest = testInfo => {
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

    afterEach(async () => {
      jest.dontMock('@fluentui/react-shared-contexts');

      if (createdContainer && container?.parentNode) {
        container.parentNode.removeChild(container);
      }

      container = null;
      createdContainer = false;
    });

    it('calls custom style hook with state', async () => {
      /* eslint-disable @fluentui/no-global-react */
      const customStyleHook = jest.fn();
      const useCustomStyleHook = jest.fn().mockImplementation(() => customStyleHook);
      let unmount: (() => void) | undefined;

      await jest.isolateModulesAsync(async () => {
        jest.doMock('@fluentui/react-shared-contexts', () => {
          const module = jest.requireActual('@fluentui/react-shared-contexts');

          return { ...module, [CUSTOM_STYLE_HOOK_PROP]: useCustomStyleHook };
        });

        const React = await import('react');

        const Component = await getReactComponent(testInfo.componentPath, testInfo);
        const Wrapper = testInfo.renderOptions?.wrapper;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let element = React.createElement(Component, { ...testInfo.requiredProps } as any);

        if (Wrapper) {
          element = React.createElement(Wrapper, null, element);
        }

        const result = await renderWithReactDOM(element, container as HTMLElement);
        unmount = result.unmount;
      });

      const expectedHookName = `use${testInfo.displayName}Styles_unstable`;

      expect(useCustomStyleHook).toHaveBeenCalledWith(expectedHookName);
      expect(customStyleHook).toHaveBeenCalled();
      expect(customStyleHook.mock.calls.length).toBeGreaterThanOrEqual(1);

      // Verify that the hook receives a state-like object.
      expect(customStyleHook.mock.calls[0][0]).toEqual(expect.objectContaining({ components: expect.any(Object) }));

      unmount?.();
    });
  });
};

async function renderWithReactDOM(element: ReactElement, container: HTMLElement) {
  const ReactModule = await import('react');
  let act = ReactModule.act;

  if (!act) {
    // react-dom/test-utils is required for older React runtimes used in RIT.
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    act = (await import('react-dom/test-utils')).act;
  }

  try {
    const ReactDOMClient = await import('react-dom/client');
    const root = ReactDOMClient.createRoot(container);

    await act(async () => {
      root.render(element);
    });

    return {
      unmount: () =>
        act(() => {
          root.unmount();
        }),
    };
  } catch {
    const ReactDOM = (await import('react-dom')) as unknown as ReactDOMLegacyModule;
    const legacyReactDOM = getLegacyReactDOM(ReactDOM);

    await act(async () => {
      legacyReactDOM.render(element, container);
    });

    return {
      unmount: () =>
        act(() => {
          legacyReactDOM.unmountComponentAtNode(container);
        }),
    };
  }
}

function getLegacyReactDOM(module: ReactDOMLegacyModule): ReactDOMLegacy {
  if ('render' in module) {
    return module as ReactDOMLegacy;
  }

  return module.default;
}

declare type ReactDOMLegacyModule = ReactDOMLegacy | { default: ReactDOMLegacy };

declare interface ReactDOMLegacy {
  render(element: ReactElement, container: Element | DocumentFragment | null): void;
  unmountComponentAtNode(container: Element | DocumentFragment | null): void;
}
