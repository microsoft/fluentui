import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { composeOnRender } from './composeOnRender';
import type { IOnRender } from '../IOnRender';

interface IExampleProps {
  value: string;
}

const renderBase = (props: IExampleProps): JSX.Element | null => {
  return <div data-value={props.value} />;
};

const renderDecoratorA = (props: IExampleProps, defaultRender?: IOnRender<IExampleProps>): JSX.Element | null => {
  return <div data-a="a">{defaultRender ? defaultRender(props) : null}</div>;
};

const renderDecoratorB = (props: IExampleProps, defaultRender?: IOnRender<IExampleProps>): JSX.Element | null => {
  return <div data-b="b">{defaultRender ? defaultRender(props) : null}</div>;
};

describe('composeComponentAs', () => {
  it('passes Base to DecoratorA', () => {
    const renderDecoratorAWithBase = composeOnRender(renderDecoratorA, renderBase);

    const component = renderer.create(<>{renderDecoratorAWithBase({ value: 'test' })}</>);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('passes Base to DecoratorB through DecoratorA', () => {
    const renderDecoratorAAndBWithBase = composeOnRender(
      renderDecoratorA,
      composeOnRender(renderDecoratorB, renderBase),
    );

    const component = renderer.create(<>{renderDecoratorAAndBWithBase({ value: 'test' })}</>);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('passes Base as defaultRender to DecoratorB through DecoratorA', () => {
    const renderDecoratorAAroundB = composeOnRender(renderDecoratorA, renderDecoratorB);

    const component = renderer.create(<>{renderDecoratorAAroundB({ value: 'test' }, renderBase)}</>);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders without defaultRender', () => {
    const renderDecoratorAAroundB = composeOnRender(renderDecoratorA, renderDecoratorB);

    const component = renderer.create(<>{renderDecoratorAAroundB({ value: 'test' })}</>);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('avoids recomposing already-composed components', () => {
    const renderDecoratorAAroundB = composeOnRender(renderDecoratorA, renderDecoratorB);

    expect(composeOnRender(renderDecoratorA, renderDecoratorB)).toBe(renderDecoratorAAroundB);
  });
});
