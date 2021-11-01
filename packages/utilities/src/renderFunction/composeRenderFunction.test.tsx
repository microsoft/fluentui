import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { composeRenderFunction } from './composeRenderFunction';
import type { IRenderFunction } from '../IRenderFunction';

interface IExampleProps {
  value: string;
}

const renderBase = (props: IExampleProps): JSX.Element | null => {
  return <div data-value={props.value} />;
};

const renderDecoratorA = (
  props?: IExampleProps,
  defaultRender?: IRenderFunction<IExampleProps>,
): JSX.Element | null => {
  if (!props) {
    return null;
  }

  return <div data-a="a">{defaultRender ? defaultRender(props) : null}</div>;
};

const renderDecoratorB = (
  props?: IExampleProps,
  defaultRender?: IRenderFunction<IExampleProps>,
): JSX.Element | null => {
  if (!props) {
    return null;
  }

  return <div data-b="b">{defaultRender ? defaultRender(props) : null}</div>;
};

describe('composeComponentAs', () => {
  it('passes Base to DecoratorA', () => {
    const renderDecoratorAWithBase = composeRenderFunction(renderDecoratorA, renderBase);

    const component = renderer.create(<>{renderDecoratorAWithBase({ value: 'test' })}</>);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('passes Base to DecoratorB through DecoratorA', () => {
    const renderDecoratorAAndBWithBase = composeRenderFunction(
      renderDecoratorA,
      composeRenderFunction(renderDecoratorB, renderBase),
    );

    const component = renderer.create(<>{renderDecoratorAAndBWithBase({ value: 'test' })}</>);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('passes Base as defaultRender to DecoratorB through DecoratorA', () => {
    const renderDecoratorAAroundB = composeRenderFunction(renderDecoratorA, renderDecoratorB);

    const component = renderer.create(<>{renderDecoratorAAroundB({ value: 'test' }, renderBase)}</>);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders without defaultRender', () => {
    const renderDecoratorAAroundB = composeRenderFunction(renderDecoratorA, renderDecoratorB);

    const component = renderer.create(<>{renderDecoratorAAroundB({ value: 'test' })}</>);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('avoids recomposing already-composed components', () => {
    const renderDecoratorAAroundB = composeRenderFunction(renderDecoratorA, renderDecoratorB);

    expect(composeRenderFunction(renderDecoratorA, renderDecoratorB)).toBe(renderDecoratorAAroundB);
  });
});
