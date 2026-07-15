import type { IsConformantOptions, BaseConformanceTest, TestOptions } from '@fluentui/react-conformance';

export const CUSTOM_STYLE_HOOK_CALLED_TEST_NAME = 'component-calls-custom-style-hook';
const CUSTOM_STYLE_HOOK_PROP = 'useCustomStyleHook_unstable' as const;

export type CustomStyleHookCalledTestOptions = {
  /**
   * Hook name to assert. Defaults to `use<displayName>Styles_unstable`.
   */
  hookName?: string;

  /**
   * Defines number of expected custom style hook invocations per component render. Defaults to 1.
   */
  callCount?: number;
};

/**
 * Requires a component from a file path, required for proper mocking.
 */
async function getReactComponent(
  componentPath: string,
  testInfo: IsConformantOptions,
): Promise<IsConformantOptions['Component']> {
  const componentModule = await import(componentPath);

  if (testInfo.useDefaultExport) {
    return componentModule.default;
  }

  return componentModule[testInfo.displayName];
}

/**
 * Ensures that components call useCustomStyleHook_unstable with an expected hook name
 * and then invoke the returned hook with component state.
 */
export const customStyleHookCalled: BaseConformanceTest = testInfo => {
  const testOptions = testInfo.testOptions as
    | (TestOptions & { [CUSTOM_STYLE_HOOK_CALLED_TEST_NAME]?: CustomStyleHookCalledTestOptions })
    | undefined;

  let container: HTMLElement | null = null;
  const customStyleHook = jest.fn();
  const useCustomStyleHook = jest.fn().mockImplementation(() => customStyleHook);

  jest.mock('@fluentui/react-shared-contexts', () => {
    const module = jest.requireActual('@fluentui/react-shared-contexts');

    return { ...module, [CUSTOM_STYLE_HOOK_PROP]: useCustomStyleHook };
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();

    if (testInfo.renderOptions?.container) {
      container = testInfo.renderOptions.container;
    } else {
      container = document.createElement('div');
      document.body.appendChild(container);
    }
  });

  afterEach(async () => {
    if (container) {
      document.body.removeChild(container);
    }

    container = null;
  });

  it('calls custom style hook with state', async () => {
    /* eslint-disable @fluentui/no-global-react */
    const React = await import('react');

    const Component = await getReactComponent(testInfo.componentPath, testInfo);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const element = React.createElement(Component, { ...testInfo.requiredProps } as any);
    const expectedHookName =
      testOptions?.[CUSTOM_STYLE_HOOK_CALLED_TEST_NAME]?.hookName ?? `use${testInfo.displayName}Styles_unstable`;

    const { unmount } = await render(element, container as HTMLElement);

    expect(useCustomStyleHook).toHaveBeenCalledWith(expectedHookName);
    expect(customStyleHook).toHaveBeenCalled();

    const expectedCallCount = testOptions?.[CUSTOM_STYLE_HOOK_CALLED_TEST_NAME]?.callCount;
    if (expectedCallCount !== undefined) {
      expect(customStyleHook).toHaveBeenCalledTimes(expectedCallCount);
    } else {
      expect(customStyleHook.mock.calls.length).toBeGreaterThanOrEqual(1);
    }

    // Verify that the hook receives a state-like object.
    expect(customStyleHook.mock.calls[0][0]).toEqual(expect.objectContaining({ components: expect.any(Object) }));

    unmount();
  });
};

/**
 * Utility to render React elements that works with both React 17 and React 18
 */
async function render(element: React.ReactElement, container: HTMLElement) {
  const React = await import('react');
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - ReactDOMClient is not available in React 17
  const ReactDOMClient = await import('react-dom/client').catch(() => null);

  let unmount: () => void;

  if (ReactDOMClient && 'createRoot' in ReactDOMClient) {
    const root = ReactDOMClient.createRoot(container);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - act doesn't exist on react in React 17
    React.act(() => {
      root.render(element);
    });
    unmount = () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore - act doesn't exist on react in React 17
      React.act(() => {
        root.unmount();
      });
    };
  } else {
    const ReactDOM = (await import('react-dom')) as unknown as ReactDOMLegacy;
    ReactDOM.render(element, container);
    unmount = () => ReactDOM.unmountComponentAtNode(container);
  }

  return { container, unmount };
}

declare interface ReactDOMLegacy {
  render(element: React.ReactElement, container: Element | DocumentFragment | null): void;
  unmountComponentAtNode(container: Element | DocumentFragment | null): void;
}
