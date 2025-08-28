import type { IsConformantOptions, BaseConformanceTest, TestOptions } from '@fluentui/react-conformance';
import './matchers/index';

export const OVERRIDES_WIN_TEST_NAME = 'make-styles-overrides-win';

export type OverridesWinTestOptions = {
  /** Defines number of allowed mergeClasses() calls per a component render. Defaults to 1. */
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
 * A conformance test for mergeClasses() that ensures that a classname from props is passed as a last param,
 * i.e. ensures that user's overrides have higher priority.
 */
export const overridesWin: BaseConformanceTest = testInfo => {
  const testOptions = testInfo.testOptions as
    | (TestOptions & { [OVERRIDES_WIN_TEST_NAME]?: OverridesWinTestOptions })
    | undefined;

  let container: HTMLElement | null = null;
  const mergeClasses = jest.fn().mockImplementation(() => '');

  jest.mock('@griffel/react', () => {
    const module = jest.requireActual('@griffel/react');

    return { ...module, mergeClasses };
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

  it('"className" passed last wins', async () => {
    // To mock mergeClasses() we need require a component again, this could be done via "jest.isolateModules()"
    // but a bug that prevents it was fixed only in Jest 27.
    // https://github.com/facebook/jest/pull/10963
    //
    // React should be imported after "jest.resetModules()" as otherwise we will will get two copies: one from this
    // test, a second from a component itself.
    // https://github.com/facebook/jest/issues/8987#issuecomment-584898030
    /* eslint-disable @fluentui/no-global-react */
    const React = await import('react');

    const className = 'make-styles-classname';
    const Component = await getReactComponent(testInfo.componentPath, testInfo);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const element = React.createElement(Component, { ...testInfo.requiredProps, className } as any);

    const { unmount } = await render(element, container as HTMLElement);

    expect(mergeClasses.mock.calls.length).toBeGreaterThanOrEqual(1);
    expect(mergeClasses.mock.calls).toContainClassNameLastInCalls(className);
    expect(mergeClasses.mock.calls).toHaveMergeClassesCalledTimesWithClassName(
      className,
      testOptions?.[OVERRIDES_WIN_TEST_NAME]?.callCount || 1,
    );

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
  // Check if we have React 18's createRoot (react-dom/client)
  if (ReactDOMClient && 'createRoot' in ReactDOMClient) {
    // React 18 approach

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
    // React 17 approach
    const ReactDOM = await import('react-dom');
    /* eslint-disable @typescript-eslint/no-deprecated -- This is expect to support React 17 */
    ReactDOM.render(element, container);
    unmount = () => ReactDOM.unmountComponentAtNode(container);
    /* eslint-enable @typescript-eslint/no-deprecated */
  }

  return { container, unmount };
}
