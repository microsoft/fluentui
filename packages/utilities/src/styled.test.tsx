import * as React from 'react';
import { styled } from './styled';
import * as renderer from 'react-test-renderer';
import { Customizer } from './Customizer';
import { IStyle, Stylesheet, InjectionMode, IStyleFunctionOrObject } from '@uifabric/merge-styles';
import { classNamesFunction } from './classNamesFunction';

interface ITestStyles {
  root: IStyle;
}
interface ITestProps {
  cool?: boolean;
  styles?: IStyleFunctionOrObject<{}, ITestStyles>;
}

let _lastProps: ITestProps | undefined;

const getClassNames = classNamesFunction<{}, ITestStyles>();

class TestBase extends React.Component<ITestProps> {
  public constructor(props: ITestProps) {
    super(props);
    _lastProps = props;
  }
  public render(): JSX.Element {
    const classNames = getClassNames(this.props.styles, this.props);

    return <div className={classNames.root} />;
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
    Stylesheet.getInstance().setConfig({
      injectionMode: InjectionMode.none
    });
    Stylesheet.getInstance().reset();
  });

  it('renders base styles (background red)', () => {
    const component = renderer.create(<Test />);

    // Test that defaults are the base styles (red).
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('allows user overrides (background green)', () => {
    const component = renderer.create(<Test styles={{ root: { background: 'green' } }} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('allows for contextual overrides (background yellow)', () => {
    const component = renderer.create(
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
      </Customizer>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('allows for contextual overrides mixed under user overrides (background yellow, color red)', () => {
    const component = renderer.create(
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
      </Customizer>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('can process style props (background blue)', () => {
    const component = renderer.create(<Test cool />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
