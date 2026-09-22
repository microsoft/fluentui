import * as React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Radio } from './Radio';
import { radioClassNames } from './useRadioStyles.styles';

expect.extend(toHaveNoViolations);

describe('Radio', () => {
  it('has no axe violations', async () => {
    const { baseElement } = render(<Radio aria-label="Radio" />);

    expect(await axe(baseElement, { rules: { region: { enabled: false } } })).toHaveNoViolations();
  });

  it('renders the headless state with modern class names', () => {
    const { getByRole, getByText } = render(<Radio defaultChecked label="Radio" />);
    const input = getByRole('radio');
    const root = input.parentElement;

    expect(root).toHaveAttribute('data-label-position', 'after');
    expect(root).toHaveClass(radioClassNames.root);
    expect(input).toHaveClass(radioClassNames.input);
    expect(getByText('Radio')).toHaveClass(radioClassNames.label);
  });

  it('preserves consumer class names', () => {
    const { getByRole } = render(<Radio className="custom-root" input={{ className: 'custom-input' }} />);
    const input = getByRole('radio');

    expect(input.parentElement).toHaveClass('custom-root');
    expect(input).toHaveClass('custom-input');
  });
});
