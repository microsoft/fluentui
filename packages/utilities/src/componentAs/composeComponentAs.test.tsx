import * as React from 'react';
import { render } from '@testing-library/react';
import { composeComponentAs } from './composeComponentAs';
import type { IComponentAsProps } from '../IComponentAs';

import type { JSXElement } from '../jsx';

interface IExampleProps {
  value: string;
}

const Base: React.ComponentType<IExampleProps> = (props: IExampleProps): JSXElement | null => {
  return <div data-value={props.value} />;
};

const DecoratorA: React.ComponentType<IComponentAsProps<IExampleProps>> = (
  props: IComponentAsProps<IExampleProps>,
): JSXElement | null => {
  const { defaultRender: DefaultRender, ...exampleProps } = props;

  return <div data-a="a">{DefaultRender ? <DefaultRender {...exampleProps} /> : null}</div>;
};

const DecoratorB: React.ComponentType<IComponentAsProps<IExampleProps>> = (
  props: IComponentAsProps<IExampleProps>,
): JSXElement | null => {
  const { defaultRender: DefaultRender, ...exampleProps } = props;

  return <div data-b="b">{DefaultRender ? <DefaultRender {...exampleProps} /> : null}</div>;
};

describe('composeComponentAs', () => {
  it('passes Base to DecoratorA', () => {
    const DecoratorAWithBase = composeComponentAs(DecoratorA, Base);
    const component = render(<DecoratorAWithBase value="test" />);

    expect(component.container.firstChild).toMatchSnapshot();
  });

  it('passes Base to DecoratorB through DecoratorA', () => {
    const DecoratorAAndBWithBase = composeComponentAs(DecoratorA, composeComponentAs(DecoratorB, Base));
    const component = render(<DecoratorAAndBWithBase value="test" />);

    expect(component.container.firstChild).toMatchSnapshot();
  });

  it('passes Base as defaultRender to DecoratorB through DecoratorA', () => {
    const DecoratorAAroundB = composeComponentAs(DecoratorA, DecoratorB);

    const component = render(<DecoratorAAroundB value="test" defaultRender={Base} />);

    expect(component.container.firstChild).toMatchSnapshot();
  });

  it('renders without defaultRender', () => {
    const DecoratorAAroundB = composeComponentAs(DecoratorA, DecoratorB);

    const component = render(<DecoratorAAroundB value="test" />);

    expect(component.container.firstChild).toMatchSnapshot();
  });

  it('avoids recomposing already-composed components', () => {
    const DecoratorAAroundB = composeComponentAs(DecoratorA, DecoratorB);

    expect(composeComponentAs(DecoratorA, DecoratorB)).toBe(DecoratorAAroundB);
  });
});
