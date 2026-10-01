import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { SpinButton } from './SpinButton';
import { spinButtonClassNames } from './useSpinButtonStyles.styles';

expect.extend(toHaveNoViolations);

describe('SpinButton', () => {
  it('has no axe violations', async () => {
    const { baseElement } = render(<SpinButton aria-label="Spin button" />);

    expect(await axe(baseElement, { rules: { region: { enabled: false } } })).toHaveNoViolations();
  });

  it('renders the default visual state with modern class names', () => {
    const { getByRole, getAllByRole } = render(<SpinButton aria-label="Spin button" defaultValue={1} />);
    const input = getByRole('spinbutton');
    const root = input.parentElement;
    const [incrementButton, decrementButton] = getAllByRole('button');

    expect(root).toHaveAttribute('data-appearance', 'outline');
    expect(root).toHaveAttribute('data-size', 'medium');
    expect(root).toHaveClass(spinButtonClassNames.root);
    expect(input).toHaveClass(spinButtonClassNames.input);
    expect(incrementButton).toHaveClass(spinButtonClassNames.incrementButton);
    expect(decrementButton).toHaveClass(spinButtonClassNames.decrementButton);
  });

  it('maps visual props to data attributes', () => {
    const { getByRole } = render(<SpinButton aria-label="Spin button" appearance="filled-darker" size="small" />);
    const root = getByRole('spinbutton').parentElement;

    expect(root).toHaveAttribute('data-appearance', 'filled-darker');
    expect(root).toHaveAttribute('data-size', 'small');
  });

  it('composes headless increment behavior', () => {
    const onChange = jest.fn();
    const { getByRole, getByLabelText } = render(
      <SpinButton aria-label="Spin button" defaultValue={1} onChange={onChange} />,
    );

    userEvent.click(getByLabelText('Increment value'));

    expect(getByRole('spinbutton')).toHaveValue('2');
    expect(onChange).toHaveBeenCalledWith(expect.anything(), { value: 2, displayValue: undefined });
  });

  it('preserves consumer class names', () => {
    const { getByRole } = render(
      <SpinButton aria-label="Spin button" className="custom-root" input={{ className: 'custom-input' }} />,
    );
    const input = getByRole('spinbutton');

    expect(input.parentElement).toHaveClass('custom-root');
    expect(input).toHaveClass('custom-input');
  });
});
