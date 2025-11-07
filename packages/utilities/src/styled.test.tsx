import * as React from 'react';
import { act, render } from '@testing-library/react';
import { styled } from './styled';
import { Customizer } from './customizations/Customizer';
import { Stylesheet, InjectionMode, mergeStyles } from '@fluentui/merge-styles';
import { classNamesFunction } from './classNamesFunction';
import { Customizations } from './customizations/Customizations';
import type { IStyle, IStyleFunction, IStyleFunctionOrObject } from '@fluentui/merge-styles';

import type { JSXElement } from './jsx';

interface ITestStyles {
  root: IStyle;
}
interface ITestProps {
  cool?: boolean;
  styles?: IStyleFunctionOrObject<{}, ITestStyles>;
  children?: React.ReactNode;
}

let _lastProps: ITestProps | undefined;
let _renderCount: number;
let _styleEval: number;
let component: ReturnType<typeof render> | undefined;
let lastStylesInBaseComponent: IStyleFunctionOrObject<{}, ITestStyles> | undefined;

const getClassNames = classNamesFunction<{}, ITestStyles>();

class TestBase extends React.Component<ITestProps> {
  public constructor(props: ITestProps) {
    super(props);
  }

  public render(): JSXElement {
    _renderCount++;

    _lastProps = this.props;

    const classNames = getClassNames(this.props.styles, { cool: this.props.cool });
    lastStylesInBaseComponent = this.props.styles;

    return <div className={classNames.root}>{this.props.children}</div>;
  }
}

class ShortCircuit extends React.PureComponent<{ children?: React.ReactNode }> {
  public render(): JSXElement {
    return <div>{this.props.children}</div>;
  }
}

const TestStyles = (props: ITestProps): ITestStyles => {
  _styleEval++;
  return {
    root: {
      background: props.cool ? 'blue' : 'red',
    },
  };
};

const Test = styled<ITestProps, {}, ITestStyles>(TestBase, TestStyles, undefined, { scope: 'Test' });

describe('styled', () => {
  beforeEach(() => {
    _lastProps = undefined;
    _renderCount = 0;
    _styleEval = 0;

    Stylesheet.getInstance().setConfig({
      injectionMode: InjectionMode.none,
    });
    Stylesheet.getInstance().reset();
  });

  afterEach(() => {
    act(() => {
      component?.unmount();
      component = undefined;
    });

    lastStylesInBaseComponent = undefined;
  });

  it('can create pure components', () => {
    let renderCount = 0;
    const Component = () => {
      renderCount++;
      return <div />;
    };
    const styles = () => ({});
    const Comp = styled(Component, styles);
    const PureComp = styled(Component, styles, undefined, undefined, true);
    const App = () => {
      return (
        <div>
          <Comp />
          <PureComp />
        </div>
      );
    };

    act(() => {
      component = render(<App />);
    });

    expect(renderCount).toEqual(2);

    act(() => {
      component!.rerender(<App data-foo="1" />);
    });

    expect(renderCount).toEqual(3);
  });

  it('renders base styles (background red)', () => {
    const wrapper = render(<Test />);
    // Test that defaults are the base styles (red)
    expect(wrapper.container.firstChild).toMatchSnapshot();
  });

  it('allows user overrides (background green)', () => {
    const wrapper = render(<Test styles={{ root: { background: 'green' } }} />);
    expect(wrapper.container.firstChild).toMatchSnapshot();
    wrapper.unmount();
  });

  it('does not create any new closured functions', () => {
    let _firstProps: ITestProps | undefined;

    act(() => {
      component = render(<Test />);
    });

    _firstProps = _lastProps;
    expect(_renderCount).toEqual(1);

    act(() => {
      component!.rerender(<Test cool={true} />);
    });

    expect(_renderCount).toEqual(2);
    expect(_firstProps).not.toBe(_lastProps);

    if (_firstProps) {
      // Validate that all functions and objects are the same instances as before.
      for (let propName in _firstProps) {
        if (_firstProps.hasOwnProperty(propName)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const propValue = (_firstProps as any)[propName];

          if (typeof propValue === 'function' || typeof propValue === 'object') {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            expect(propValue).toBe((_lastProps as any)[propName]);
          }
        }
      }
    }
  });

  it('allows for contextual overrides (background yellow)', () => {
    const wrapper = render(
      <Customizer
        scopedSettings={{
          Test: {
            styles: {
              root: {
                background: 'yellow',
              },
            },
          },
        }}
      >
        <Test />
      </Customizer>,
    );
    expect(wrapper.container.firstChild).toMatchSnapshot();
    wrapper.unmount();
  });

  it('allows for contextual overrides mixed under user overrides (background yellow, color red)', () => {
    const wrapper = render(
      <Customizer
        scopedSettings={{
          Test: {
            styles: {
              root: {
                background: 'yellow',
              },
            },
          },
        }}
      >
        <Test styles={{ root: { color: 'red' } }} />
      </Customizer>,
    );
    expect(wrapper.container.firstChild).toMatchSnapshot();
    wrapper.unmount();
  });

  it('can process style props (background blue)', () => {
    const wrapper = render(<Test cool />);
    expect(wrapper.container.firstChild).toMatchSnapshot();
    wrapper.unmount();
  });

  it('can wrap components and merge styling objects for all', () => {
    const TestInner = styled<ITestProps, {}, ITestStyles>(Test, { root: { color: 'green' } }, undefined);
    const TestOuter = styled<ITestProps, {}, ITestStyles>(TestInner, { root: { lineHeight: '19px' } }, undefined);
    const wrapper = render(<TestOuter cool />);
    expect(wrapper.container.firstChild).toMatchSnapshot();
    wrapper.unmount();
  });

  it('can wrap components and merge styling functions for all', () => {
    const TestInner = styled<ITestProps, {}, ITestStyles>(Test, () => ({ root: { color: 'green' } }), undefined);
    const TestOuter = styled<ITestProps, {}, ITestStyles>(
      TestInner,
      () => ({ root: { lineHeight: '29px' } }),
      undefined,
    );
    const wrapper = render(<TestOuter cool />);
    expect(wrapper.container.firstChild).toMatchSnapshot();
    wrapper.unmount();
  });

  it('gives wrapped styles object priority', () => {
    const TestWrapped = styled<ITestProps, {}, ITestStyles>(Test, { root: { background: 'grey' } }, undefined);
    const wrapper = render(<TestWrapped cool />);
    expect(wrapper.container.firstChild).toMatchSnapshot();
    wrapper.unmount();
  });

  it('gives wrapped styles function priority', () => {
    const TestWrapped = styled<ITestProps, {}, ITestStyles>(Test, () => ({ root: { background: 'grey' } }), undefined);
    const wrapper = render(<TestWrapped cool />);
    expect(wrapper.container.firstChild).toMatchSnapshot();
    wrapper.unmount();
  });

  it('gives styles object user prop priority', () => {
    const TestWrapped = styled<ITestProps, {}, ITestStyles>(Test, { root: { background: 'grey' } }, undefined);
    const wrapper = render(<TestWrapped cool styles={{ root: { background: 'purple' } }} />);
    expect(wrapper.container.firstChild).toMatchSnapshot();
    wrapper.unmount();
  });

  it('gives styles function user prop priority', () => {
    const TestWrapped = styled<ITestProps, {}, ITestStyles>(Test, () => ({ root: { background: 'grey' } }), undefined);
    const wrapper = render(<TestWrapped cool styles={{ root: { background: 'purple' } }} />);
    expect(wrapper.container.firstChild).toMatchSnapshot();
    wrapper.unmount();
  });

  it('respects styles arg', () => {
    const defaultStyles = () =>
      mergeStyles({
        backgroundColor: 'red',
      });

    const greenStyles = () =>
      mergeStyles({
        backgroundColor: 'green',
      });

    const DefaultPanel = (props: ITestProps) => {
      const { styles = defaultStyles } = props;
      const className = (styles as IStyleFunction<{}, {}>)(props) as string;
      return <div className={className}>{props.children}</div>;
    };

    const StyledPanel = styled<{}, {}, {}>(DefaultPanel, greenStyles);

    const wrapper = render(
      <div>
        <DefaultPanel>Panel1</DefaultPanel>
        <StyledPanel>Panel2</StyledPanel>
      </div>,
    );
    expect(wrapper.container.firstChild).toMatchSnapshot();
    wrapper.unmount();
  });

  it('respects styles type', (done: () => undefined) => {
    const defaultStyles = { root: { backgroundColor: 'red' } };

    const Component = (props: ITestProps) => {
      expect((props.styles as IStyleFunction<{}, {}>)(props)).toEqual(defaultStyles);
      done();
      return null;
    };

    const StyledComponent = styled(Component, defaultStyles);

    const wrapper = render(<StyledComponent />);
    expect(wrapper.container.firstChild).toMatchSnapshot();
    wrapper.unmount();
  });

  it('can re-render on customization mutations', () => {
    const wrapper = render(<Test />);
    expect(_renderCount).toEqual(1);
    act(() => {
      Customizations.applySettings({ theme: { palette: { themePrimary: 'red' } } });
    });
    expect(_renderCount).toEqual(2);
    wrapper.unmount();
  });

  it('can re-render the minimal times when nesting', () => {
    const wrapper = render(
      <Test>
        <Test />
        <Test />
      </Test>,
    );
    expect(_renderCount).toEqual(3);
    act(() => {
      Customizations.applySettings({ theme: { palette: { themePrimary: 'red' } } });
    });
    expect(_renderCount).toEqual(6);
    wrapper.unmount();
  });

  it('can re-render the minimal times when nesting and in a Customizer', () => {
    const wrapper = render(
      <Customizer>
        <Test />
      </Customizer>,
    );
    expect(_renderCount).toEqual(1);
    act(() => {
      Customizations.applySettings({ theme: { palette: { themePrimary: 'red' } } });
    });
    expect(_renderCount).toEqual(2);
    wrapper.unmount();
  });

  it('can re-render when customized styles change', () => {
    act(() => {
      component = render(<Test />);
    });

    expect(_styleEval).toEqual(1);

    act(() => {
      component!.rerender(<Test data-foo={1} />);
    });

    expect(_styleEval).toEqual(1);
    component!.unmount();
  });

  it('can re-render the minimal times when inside of a pure component', () => {
    const wrapper = render(
      <Customizer>
        <Test>
          <ShortCircuit>
            <Test />
          </ShortCircuit>
        </Test>
      </Customizer>,
    );
    expect(_renderCount).toEqual(2);
    act(() => {
      Customizations.applySettings({ theme: { palette: { themePrimary: 'red' } } });
    });
    expect(_renderCount).toEqual(4);
    wrapper.unmount();
  });

  it('will not re-render if styles have not changed', () => {
    let firstStylesProp;

    act(() => {
      component = render(<Test styles={{ root: { background: 'red' } }} />);
      firstStylesProp = lastStylesInBaseComponent;
    });

    expect(_renderCount).toEqual(1);

    act(() => {
      component!.rerender(<Test cool={true} styles={{ root: { background: 'red' } }} />);
    });

    expect(_renderCount).toEqual(2);
    // With react-test-renderer, object identity may change but the content is equivalent
    expect(JSON.stringify(firstStylesProp)).toBe(JSON.stringify(lastStylesInBaseComponent));
  });
});
