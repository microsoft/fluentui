import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Checkbox } from './Checkbox';
import { checkboxClassNames } from './useCheckboxStyles.styles';

describe('Checkbox', () => {
  isConformant({
    Component: Checkbox,
    displayName: 'Checkbox',
    primarySlot: 'input',
    requiredProps: { 'aria-label': 'Checkbox' },
  });

  it('renders the headless state with modern class names', () => {
    const { getByRole, getByText } = render(<Checkbox defaultChecked label="Checkbox" />);
    const input = getByRole('checkbox');
    const root = input.parentElement;

    expect(root).toHaveAttribute('data-checked', '');
    expect(root).toHaveAttribute('data-label-position', 'after');
    expect(root).toHaveAttribute('data-shape', 'square');
    expect(root).toHaveAttribute('data-size', 'medium');
    expect(root).toHaveClass(checkboxClassNames.root);
    expect(input).toHaveClass(checkboxClassNames.input);
    expect(getByText('Checkbox')).toHaveClass(checkboxClassNames.label);
  });

  it('preserves consumer class names', () => {
    const { getByRole } = render(<Checkbox className="custom-root" input={{ className: 'custom-input' }} />);
    const input = getByRole('checkbox');

    expect(input.parentElement).toHaveClass('custom-root');
    expect(input).toHaveClass('custom-input');
  });
});
