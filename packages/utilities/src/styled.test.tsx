/* eslint-disable deprecation/deprecation */
import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import { styled } from './styled';
import * as renderer from 'react-test-renderer';
import { Customizer } from './customizations/Customizer';
import { Stylesheet, InjectionMode, mergeStyles } from '@fluentui/merge-styles';
import { classNamesFunction } from './classNamesFunction';
import { Customizations } from './customizations/Customizations';
import { safeCreate } from '@fluentui/test-utilities';
import { mount } from 'enzyme';
import type { IStyle, IStyleFunction, IStyleFunctionOrObject } from '@fluentui/merge-styles';

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
let component: ReturnType<typeof mount> | undefined;
let lastStylesInBaseComponent: IStyleFunctionOrObject<{}, ITestStyles> | undefined;

const getClassNames = classNamesFunction<{}, ITestStyles>();

class TestBase extends React.Component<ITestProps> {
  public constructor(props: ITestProps) {
    super(props);
  }

  public render(): JSX.Element {
    _renderCount++;

    _lastProps = this.props;

    const classNames = getClassNames(this.props.styles, { cool: this.props.cool });
    lastStylesInBaseComponent = this.props.styles;

    return <div className={classNames.root}>{this.props.children}</div>;
  }
}

class ShortCircuit extends React.PureComponent {
  public render(): JSX.Element {
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
    ReactTestUtils.act(() => {
      component?.unmount();
      component = undefined;
    });

    lastStylesInBaseComponent = undefined;
  });

  it('can create pure components', () => {
    let renderCount = 0;
    const render = () => {
      renderCount++;
      return <div />;
    };
    const styles = () => ({});
    const Comp = styled(render, styles);
    const PureComp = styled(render, styles, undefined, undefined, true);
    const App = () => {
      return (
        <div>
          <Comp />
          <PureComp />
        </div>
      );
    };

    component = mount(<App />);

    expect(renderCount).toEqual(2);
    component.setProps({ 'data-foo': '1' });
    expect(renderCount).toEqual(3);
  });

  it('renders base styles (background red)', () => {
    safeCreate(<Test />, (wrapper: renderer.ReactTestRenderer) => {
      // Test that defaults are the base styles (red).
      expect(wrapper.toJSON()).toMatchSnapshot();
    });
  });

  it('allows user overrides (background green)', () => {
    safeCreate(<Test styles={{ root: { background: 'green' } }} />, (wrapper: renderer.ReactTestRenderer) => {
      expect(wrapper.toJSON()).toMatchSnapshot();
    });
  });

  it('does not create any new closured functions', () => {
    let _firstProps: ITestProps | undefined;

    component = mount(<Test />);

    _firstProps = _lastProps;
    expect(_renderCount).toEqual(1);

    component.setProps({ cool: true });

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
    safeCreate(
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
      (wrapper: renderer.ReactTestRenderer) => {
        expect(wrapper.toJSON()).toMatchSnapshot();
      },
    );
  });

  it('allows for contextual overrides mixed under user overrides (background yellow, color red)', () => {
    safeCreate(
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
      (wrapper: renderer.ReactTestRenderer) => {
        expect(wrapper.toJSON()).toMatchSnapshot();
      },
    );
  });

  it('can process style props (background blue)', () => {
    safeCreate(<Test cool />, (wrapper: renderer.ReactTestRenderer) => {
      expect(wrapper.toJSON()).toMatchSnapshot();
    });
  });

  it('can wrap components and merge styling objects for all', () => {
    const TestInner = styled<ITestProps, {}, ITestStyles>(Test, { root: { color: 'green' } }, undefined);
    const TestOuter = styled<ITestProps, {}, ITestStyles>(TestInner, { root: { lineHeight: '19px' } }, undefined);
    safeCreate(<TestOuter cool />, (wrapper: renderer.ReactTestRenderer) => {
      expect(wrapper.toJSON()).toMatchSnapshot();
    });
  });

  it('can wrap components and merge styling functions for all', () => {
    const TestInner = styled<ITestProps, {}, ITestStyles>(Test, () => ({ root: { color: 'green' } }), undefined);
    const TestOuter = styled<ITestProps, {}, ITestStyles>(
      TestInner,
      () => ({ root: { lineHeight: '29px' } }),
      undefined,
    );
    safeCreate(<TestOuter cool />, (wrapper: renderer.ReactTestRenderer) => {
      expect(wrapper.toJSON()).toMatchSnapshot();
    });
  });

  it('gives wrapped styles object priority', () => {
    const TestWrapped = styled<ITestProps, {}, ITestStyles>(Test, { root: { background: 'grey' } }, undefined);
    safeCreate(<TestWrapped cool />, (wrapper: renderer.ReactTestRenderer) => {
      expect(wrapper.toJSON()).toMatchSnapshot();
    });
  });

  it('gives wrapped styles function priority', () => {
    const TestWrapped = styled<ITestProps, {}, ITestStyles>(Test, () => ({ root: { background: 'grey' } }), undefined);
    safeCreate(<TestWrapped cool />, (wrapper: renderer.ReactTestRenderer) => {
      expect(wrapper.toJSON()).toMatchSnapshot();
    });
  });

  it('gives styles object user prop priority', () => {
    const TestWrapped = styled<ITestProps, {}, ITestStyles>(Test, { root: { background: 'grey' } }, undefined);
    safeCreate(
      <TestWrapped cool styles={{ root: { background: 'purple' } }} />,
      (wrapper: renderer.ReactTestRenderer) => {
        expect(wrapper.toJSON()).toMatchSnapshot();
      },
    );
  });

  it('gives styles function user prop priority', () => {
    const TestWrapped = styled<ITestProps, {}, ITestStyles>(Test, () => ({ root: { background: 'grey' } }), undefined);
    safeCreate(
      <TestWrapped cool styles={{ root: { background: 'purple' } }} />,
      (wrapper: renderer.ReactTestRenderer) => {
        expect(wrapper.toJSON()).toMatchSnapshot();
      },
    );
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

    safeCreate(
      <div>
        <DefaultPanel>Panel1</DefaultPanel>
        <StyledPanel>Panel2</StyledPanel>
      </div>,
      (wrapper: renderer.ReactTestRenderer) => {
        expect(wrapper.toJSON()).toMatchSnapshot();
      },
    );
  });

  it('respects styles type', (done: () => undefined) => {
    const defaultStyles = { root: { backgroundColor: 'red' } };

    const Component = (props: ITestProps) => {
      expect((props.styles as IStyleFunction<{}, {}>)(props)).toEqual(defaultStyles);
      done();
      return null;
    };

    const StyledComponent = styled(Component, defaultStyles);

    safeCreate(<StyledComponent />, (wrapper: renderer.ReactTestRenderer) => {
      expect(wrapper.toJSON()).toMatchSnapshot();
    });
  });

  it('can re-render on customization mutations', () => {
    safeCreate(<Test />, () => {
      expect(_renderCount).toEqual(1);
      renderer.act(() => {
        Customizations.applySettings({ theme: { palette: { themePrimary: 'red' } } });
      });
      expect(_renderCount).toEqual(2);
    });
  });

  it('can re-render the minimal times when nesting', () => {
    safeCreate(
      <Test>
        <Test />
        <Test />
      </Test>,
      () => {
        expect(_renderCount).toEqual(3);
        renderer.act(() => {
          Customizations.applySettings({ theme: { palette: { themePrimary: 'red' } } });
        });
        expect(_renderCount).toEqual(6);
      },
    );
  });

  it('can re-render the minimal times when nesting and in a Customizer', () => {
    safeCreate(
      <Customizer>
        <Test />
      </Customizer>,
      () => {
        expect(_renderCount).toEqual(1);
        renderer.act(() => {
          Customizations.applySettings({ theme: { palette: { themePrimary: 'red' } } });
        });
        expect(_renderCount).toEqual(2);
      },
    );
  });

  it('can re-render when customized styles change', () => {
    component = mount(<Test />);

    expect(_styleEval).toEqual(1);

    component.setProps({ 'data-foo': 1 });

    expect(_styleEval).toEqual(1);
  });

  it('can re-render the minimal times when inside of a pure component', () => {
    safeCreate(
      <Customizer>
        <Test>
          <ShortCircuit>
            <Test />
          </ShortCircuit>
        </Test>
      </Customizer>,
      () => {
        expect(_renderCount).toEqual(2);
        renderer.act(() => {
          Customizations.applySettings({ theme: { palette: { themePrimary: 'red' } } });
        });
        expect(_renderCount).toEqual(4);
      },
    );
  });

  it('will not re-render if styles have not changed', () => {
    component = mount(<Test styles={{ root: { background: 'red' } }} />);
    expect(_renderCount).toEqual(1);
    const stylesProp = lastStylesInBaseComponent;

    component.setProps({ cool: true });

    expect(_renderCount).toEqual(2);
    expect(stylesProp).toBe(lastStylesInBaseComponent);
  });
});
