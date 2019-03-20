import * as React from 'react';
import { styled } from './styled';
import * as renderer from 'react-test-renderer';
import { Customizer } from './customizations/Customizer';
import { IStyle, Stylesheet, InjectionMode, IStyleFunctionOrObject } from '@uifabric/merge-styles';
import { classNamesFunction } from './classNamesFunction';
import { Customizations } from './customizations/Customizations';
import { safeCreate } from '@uifabric/test-utilities';

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

const getClassNames = classNamesFunction<{}, ITestStyles>();

class TestBase extends React.Component<ITestProps> {
  public constructor(props: ITestProps) {
    super(props);
    _lastProps = props;
  }

  public render(): JSX.Element {
    _renderCount++;

    const classNames = getClassNames(this.props.styles, this.props);

    return <div className={classNames.root}>{this.props.children}</div>;
  }
}

class ShortCircuit extends React.PureComponent {
  public render(): JSX.Element {
    return <div>{this.props.children}</div>;
  }
}

const TestStyles = (props: ITestProps): ITestStyles => ({
  root: {
    background: props.cool ? 'blue' : 'red'
  }
});

const Test = styled<ITestProps, {}, ITestStyles>(TestBase, TestStyles, undefined, { scope: 'Test' });

describe('styled', () => {
  beforeEach(() => {
    _lastProps = undefined;
    _renderCount = 0;

    Stylesheet.getInstance().setConfig({
      injectionMode: InjectionMode.none
    });
    Stylesheet.getInstance().reset();
  });

  it('renders base styles (background red)', () => {
    safeCreate(<Test />, (component: renderer.ReactTestRenderer) => {
      // Test that defaults are the base styles (red).
      expect(component.toJSON()).toMatchSnapshot();
    });
  });

  it('allows user overrides (background green)', () => {
    safeCreate(<Test styles={{ root: { background: 'green' } }} />, (component: renderer.ReactTestRenderer) => {
      expect(component.toJSON()).toMatchSnapshot();
    });
  });

  it('allows for contextual overrides (background yellow)', () => {
    safeCreate(
      <Customizer
        scopedSettings={{
          Test: {
            styles: {
              root: {
                background: 'yellow'
              }
            }
          }
        }}
      >
        <Test />
      </Customizer>,
      (component: renderer.ReactTestRenderer) => {
        expect(component.toJSON()).toMatchSnapshot();
      }
    );
  });

  it('allows for contextual overrides mixed under user overrides (background yellow, color red)', () => {
    safeCreate(
      <Customizer
        scopedSettings={{
          Test: {
            styles: {
              root: {
                background: 'yellow'
              }
            }
          }
        }}
      >
        <Test styles={{ root: { color: 'red' } }} />
      </Customizer>,
      (component: renderer.ReactTestRenderer) => {
        expect(component.toJSON()).toMatchSnapshot();
      }
    );
  });

  it('can process style props (background blue)', () => {
    safeCreate(<Test cool />, (component: renderer.ReactTestRenderer) => {
      expect(component.toJSON()).toMatchSnapshot();
    });
  });

  it('can re-render on customization mutations', () => {
    safeCreate(<Test />, () => {
      expect(_renderCount).toEqual(1);
      Customizations.applySettings({ theme: { palette: { themePrimary: 'red' } } });
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
        Customizations.applySettings({ theme: { palette: { themePrimary: 'red' } } });
        expect(_renderCount).toEqual(6);
      }
    );
  });

  it('can re-render the minimal times when nesting and in a Customizer', () => {
    safeCreate(
      <Customizer>
        <Test />
      </Customizer>,
      () => {
        expect(_renderCount).toEqual(1);
        Customizations.applySettings({ theme: { palette: { themePrimary: 'red' } } });
        expect(_renderCount).toEqual(2);
      }
    );
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
        Customizations.applySettings({ theme: { palette: { themePrimary: 'red' } } });
        expect(_renderCount).toEqual(4);
      }
    );
  });
});
