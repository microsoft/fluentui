import { createContext, useContextSelector } from '@fluentui/react-context-selector';
import { mount } from 'enzyme';
import * as React from 'react';
import * as ReactIs from 'react-is';

class TestBoundary extends React.Component<{ onError: (e: Error) => void }, { hasError: boolean }> {
  state = { hasError: false };

  componentDidCatch(error: Error) {
    this.props.onError(error);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}

describe('createContext', () => {
  it('creates a Provider component', () => {
    const Context = createContext(null);
    expect(ReactIs.isValidElementType(Context.Provider)).toBeTruthy();
  });

  describe('options', () => {
    it('throws on usage outside Provider by default', () => {
      jest.spyOn(console, 'error').mockImplementation(() => {});

      const TestContext = createContext<string>('');
      const TestComponent: React.FC = () => {
        const value = useContextSelector(TestContext, v => v);
        return <div data-value={value} />;
      };

      const onError = jest.fn();
      mount(
        <TestBoundary onError={onError}>
          <TestComponent />
        </TestBoundary>,
      );

      expect(onError).toBeCalledWith(
        expect.objectContaining({
          message: 'Please use <Provider /> component from "@fluentui/react-context-selector"',
        }),
      );

      // We need to clean up mocks to avoid errors reported by React
      // eslint-disable-next-line no-console
      (console.error as any).mockClear();
    });

    it('do not throw usage outside Provider when `strict` is `false`', () => {
      const TestContext = createContext<string>('', { strict: false });
      const TestComponent: React.FC = () => {
        const value = useContextSelector(TestContext, v => v);
        return <div data-value={value} />;
      };

      const onError = jest.fn();
      mount(
        <TestBoundary onError={onError}>
          <TestComponent />
        </TestBoundary>,
      );

      expect(onError).not.toBeCalled();
    });
  });
});
