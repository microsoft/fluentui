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
  // React.act is available in React 18.3+. For earlier React 18 versions we fall
  // back to react-dom/test-utils.act. For React 17 we intentionally skip act
  // entirely: renders are synchronous so hook assertions work without it, and
  // react-dom/test-utils in the integration-test workspace may resolve to a
  // React 18 build that internally calls React.act (which is absent in React 17).
  let act: Act | undefined = (React as { act?: Act }).act ?? undefined;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - ReactDOMClient is not available in React 17
  const ReactDOMClient = await import('react-dom/client').catch(() => null);
  const isReact18 = ReactDOMClient != null && 'createRoot' in ReactDOMClient;

  if (!act && isReact18) {
    // React 18.0-18.2: act was not yet on the React namespace; use the one from
    // react-dom/test-utils, which is safe here because react-dom matches React 18.
    const ReactDOMTestUtils = (await import('react-dom/test-utils')) as unknown as { act: Act };
    act = ReactDOMTestUtils.act;
  }

  let unmount: () => void;

  if (isReact18) {
    const root = ReactDOMClient.createRoot(container);
    if (act) {
      act(() => {
        root.render(element);
      });
    } else {
      root.render(element);
    }
    unmount = () => {
      if (act) {
        act(() => {
          root.unmount();
        });
      } else {
        root.unmount();
      }
    };
  } else {
    // React 17 legacy path: render synchronously without act to avoid
    // react-dom/test-utils version mismatch in integration-test environments.
    const ReactDOM = (await import('react-dom')) as unknown as ReactDOMLegacy;
    ReactDOM.render(element, container);
    unmount = () => {
      ReactDOM.unmountComponentAtNode(container);
    };
  }

  return { container, unmount };
}

declare interface ReactDOMLegacy {
  render(element: React.ReactElement, container: Element | DocumentFragment | null): void;
  unmountComponentAtNode(container: Element | DocumentFragment | null): void;
}
