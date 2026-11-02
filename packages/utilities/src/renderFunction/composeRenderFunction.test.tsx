import * as React from 'react';
import { render } from '@testing-library/react';
import { composeRenderFunction } from './composeRenderFunction';
import type { IRenderFunction } from '../IRenderFunction';

import type { JSXElement } from '../jsx';

interface IExampleProps {
  value: string;
}

const renderBase = (props: IExampleProps): JSXElement | null => {
  return <div data-value={props.value} />;
};

const renderDecoratorA = (props?: IExampleProps, defaultRender?: IRenderFunction<IExampleProps>): JSXElement | null => {
  if (!props) {
    return null;
  }

  return <div data-a="a">{defaultRender ? defaultRender(props) : null}</div>;
};

const renderDecoratorB = (props?: IExampleProps, defaultRender?: IRenderFunction<IExampleProps>): JSXElement | null => {
  if (!props) {
    return null;
  }

  return <div data-b="b">{defaultRender ? defaultRender(props) : null}</div>;
};

describe('composeComponentAs', () => {
  it('passes Base to DecoratorA', () => {
    const renderDecoratorAWithBase = composeRenderFunction(renderDecoratorA, renderBase);

    const { container } = render(<>{renderDecoratorAWithBase({ value: 'test' })}</>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('passes Base to DecoratorB through DecoratorA', () => {
    const renderDecoratorAAndBWithBase = composeRenderFunction(
      renderDecoratorA,
      composeRenderFunction(renderDecoratorB, renderBase),
    );

    const { container } = render(<>{renderDecoratorAAndBWithBase({ value: 'test' })}</>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('passes Base as defaultRender to DecoratorB through DecoratorA', () => {
    const renderDecoratorAAroundB = composeRenderFunction(renderDecoratorA, renderDecoratorB);

    const { container } = render(<>{renderDecoratorAAroundB({ value: 'test' }, renderBase)}</>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders without defaultRender', () => {
    const renderDecoratorAAroundB = composeRenderFunction(renderDecoratorA, renderDecoratorB);

    const { container } = render(<>{renderDecoratorAAroundB({ value: 'test' })}</>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('avoids recomposing already-composed components', () => {
    const renderDecoratorAAroundB = composeRenderFunction(renderDecoratorA, renderDecoratorB);

    expect(composeRenderFunction(renderDecoratorA, renderDecoratorB)).toBe(renderDecoratorAAroundB);
  });
});
