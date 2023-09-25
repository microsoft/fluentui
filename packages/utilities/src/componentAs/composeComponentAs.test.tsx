import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { composeComponentAs } from './composeComponentAs';
import type { IComponentAsProps } from '../IComponentAs';

interface IExampleProps {
  value: string;
}

const Base: React.ComponentType<IExampleProps> = (props: IExampleProps): JSX.Element | null => {
  return <div data-value={props.value} />;
};

const DecoratorA: React.ComponentType<IComponentAsProps<IExampleProps>> = (
  props: IComponentAsProps<IExampleProps>,
): JSX.Element | null => {
  const { defaultRender: DefaultRender, ...exampleProps } = props;

  return <div data-a="a">{DefaultRender ? <DefaultRender {...exampleProps} /> : null}</div>;
};

const DecoratorB: React.ComponentType<IComponentAsProps<IExampleProps>> = (
  props: IComponentAsProps<IExampleProps>,
): JSX.Element | null => {
  const { defaultRender: DefaultRender, ...exampleProps } = props;

  return <div data-b="b">{DefaultRender ? <DefaultRender {...exampleProps} /> : null}</div>;
};

describe('composeComponentAs', () => {
  it('passes Base to DecoratorA', () => {
    const DecoratorAWithBase = composeComponentAs(DecoratorA, Base);

    const component = renderer.create(<DecoratorAWithBase value="test" />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('passes Base to DecoratorB through DecoratorA', () => {
    const DecoratorAAndBWithBase = composeComponentAs(DecoratorA, composeComponentAs(DecoratorB, Base));

    const component = renderer.create(<DecoratorAAndBWithBase value="test" />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('passes Base as defaultRender to DecoratorB through DecoratorA', () => {
    const DecoratorAAroundB = composeComponentAs(DecoratorA, DecoratorB);

    const component = renderer.create(<DecoratorAAroundB value="test" defaultRender={Base} />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders without defaultRender', () => {
    const DecoratorAAroundB = composeComponentAs(DecoratorA, DecoratorB);

    const component = renderer.create(<DecoratorAAroundB value="test" />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('avoids recomposing already-composed components', () => {
    const DecoratorAAroundB = composeComponentAs(DecoratorA, DecoratorB);

    expect(composeComponentAs(DecoratorA, DecoratorB)).toBe(DecoratorAAroundB);
  });
});
