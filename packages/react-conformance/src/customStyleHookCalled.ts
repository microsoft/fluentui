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
  const options = testInfo.testOptions?.[CUSTOM_STYLE_HOOK_CALLED_TEST_NAME];

  describe(CUSTOM_STYLE_HOOK_CALLED_TEST_NAME, () => {
    let container: HTMLElement | null = null;
    let createdContainer = false;

    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetModules();

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

      const expectedHookName = `use${testInfo.displayName}Styles_unstable`;

      const { unmount } = await render(element, container as HTMLElement);

      expect(useCustomStyleHook).toHaveBeenCalledWith(expectedHookName);
      expect(customStyleHook).toHaveBeenCalled();

      const expectedCallCount = options?.callCount;
      if (expectedCallCount !== undefined) {
        expect(customStyleHook).toHaveBeenCalledTimes(expectedCallCount);
      } else {
        expect(customStyleHook.mock.calls.length).toBeGreaterThanOrEqual(1);
      }

      // Verify that the hook receives a state-like object.
      expect(customStyleHook.mock.calls[0][0]).toEqual(expect.objectContaining({ components: expect.any(Object) }));

      unmount();
    });
  });
};

/**
 * Utility to render React elements that works with both React 17 and React 18
 */
async function render(element: React.ReactElement, container: HTMLElement) {
  const React = await import('react');
  type Act = (callback: () => void) => void;
  let act: Act = (React as { act?: Act }).act as Act;

  if (!act) {
    const ReactDOMTestUtils = (await import('react-dom/test-utils')) as unknown as { act: Act };
    act = ReactDOMTestUtils.act;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - ReactDOMClient is not available in React 17
  const ReactDOMClient = await import('react-dom/client').catch(() => null);

  let unmount: () => void;

  if (ReactDOMClient && 'createRoot' in ReactDOMClient) {
    const root = ReactDOMClient.createRoot(container);
    act(() => {
      root.render(element);
    });
    unmount = () => {
      act(() => {
        root.unmount();
      });
    };
  } else {
    const ReactDOM = (await import('react-dom')) as unknown as ReactDOMLegacy;
    act(() => {
      ReactDOM.render(element, container);
    });
    unmount = () => {
      act(() => {
        ReactDOM.unmountComponentAtNode(container);
      });
    };
  }

  return { container, unmount };
}

declare interface ReactDOMLegacy {
  render(element: React.ReactElement, container: Element | DocumentFragment | null): void;
  unmountComponentAtNode(container: Element | DocumentFragment | null): void;
}
