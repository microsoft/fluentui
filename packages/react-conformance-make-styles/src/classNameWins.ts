import { IsConformantOptions, ConformanceTest } from '@fluentui/react-conformance';
import './matchers';

const mergeClasses = jest.fn();

jest.mock('@fluentui/react-make-styles', () => {
  const module = jest.requireActual('@fluentui/react-make-styles');

  return { ...module, mergeClasses };
});

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
 * A conformance test for mergeClasses() that ensures that a classname from props is passed as a last param.
 */
export const classNameWins: ConformanceTest = (componentInfo, testInfo) => {
  let container: HTMLDivElement | null = null;

  beforeEach(() => {
    jest.resetAllMocks();
    jest.resetModules();

    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
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
    const React = await import('react');
    const ReactDOM = await import('react-dom');

    const className = 'make-styles-classname';
    const Component = await getReactComponent(testInfo.componentPath, testInfo);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const element = React.createElement(Component, { ...testInfo.requiredProps, className } as any);

    ReactDOM.render(element, container);

    expect(mergeClasses.mock.calls.length).toBeGreaterThanOrEqual(1);
    expect(mergeClasses.mock.calls).toContainClassNameLastInCalls(className);
  });
};
