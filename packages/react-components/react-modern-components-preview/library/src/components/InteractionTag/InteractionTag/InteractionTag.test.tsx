import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { InteractionTag } from './InteractionTag';
import { interactionTagClassNames } from './useInteractionTagStyles.styles';
import { InteractionTagPrimary } from '../InteractionTagPrimary';
import { InteractionTagSecondary } from '../InteractionTagSecondary';

describe('InteractionTag', () => {
  it('renders defaults, stable classes, and forwards its ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { getByTestId } = render(<InteractionTag data-testid="root" ref={ref} />);
    const root = getByTestId('root');

    expect(ref.current).toBe(root);
    expect(root).toHaveClass(interactionTagClassNames.root);
    expect(root).toHaveAttribute('data-appearance', 'filled');
    expect(root).toHaveAttribute('data-shape', 'rounded');
    expect(root).toHaveAttribute('data-size', 'medium');
  });

  it('provides visual and behavioral state to its actions', () => {
    const onClick = jest.fn();
    const { getAllByRole } = render(
      <InteractionTag appearance="brand" shape="circular" size="small">
        <InteractionTagPrimary>Primary</InteractionTagPrimary>
        <InteractionTagSecondary aria-label="Dismiss" onClick={onClick} />
      </InteractionTag>,
    );
    const [primary, secondary] = getAllByRole('button');

    expect(primary).toHaveAttribute('data-appearance', 'brand');
    expect(primary).toHaveAttribute('data-shape', 'circular');
    expect(primary).toHaveAttribute('data-size', 'small');
    expect(secondary).toHaveAttribute('data-appearance', 'brand');
    fireEvent.click(secondary);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
