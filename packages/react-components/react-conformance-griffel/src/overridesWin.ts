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
      const ReactDOM = await import('react-dom');
      ReactDOM.unmountComponentAtNode(container);
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
    const ReactDOM = await import('react-dom');

    const className = 'make-styles-classname';
    const Component = await getReactComponent(testInfo.componentPath, testInfo);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const element = React.createElement(Component, { ...testInfo.requiredProps, className } as any);

    ReactDOM.render(element, container);

    expect(mergeClasses.mock.calls.length).toBeGreaterThanOrEqual(1);
    expect(mergeClasses.mock.calls).toContainClassNameLastInCalls(className);
    expect(mergeClasses.mock.calls).toHaveMergeClassesCalledTimesWithClassName(
      className,
      testOptions?.[OVERRIDES_WIN_TEST_NAME]?.callCount || 1,
    );
  });
};
