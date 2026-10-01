import * as React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Select } from './Select';
import { selectClassNames } from './useSelectStyles.styles';

expect.extend(toHaveNoViolations);

describe('Select', () => {
  it('has no axe violations', async () => {
    const { baseElement } = render(
      <Select aria-label="Select">
        <option>Option</option>
      </Select>,
    );

    expect(await axe(baseElement, { rules: { region: { enabled: false } } })).toHaveNoViolations();
  });

  it('renders default visual state and modern class names', () => {
    const { getByRole } = render(
      <Select aria-label="Select">
        <option>Option</option>
      </Select>,
    );
    const select = getByRole('combobox');
    const root = select.parentElement;

    expect(root).toHaveAttribute('data-appearance', 'outline');
    expect(root).toHaveAttribute('data-size', 'medium');
    expect(root).toHaveClass(selectClassNames.root);
    expect(select).toHaveClass(selectClassNames.select);
    expect(root?.lastElementChild).toHaveClass(selectClassNames.icon);
    expect(root?.lastElementChild?.querySelector('svg')).toBeInTheDocument();
  });

  it('maps visual props to data attributes', () => {
    const { getByRole } = render(
      <Select aria-label="Select" appearance="filled-darker" size="large">
        <option>Option</option>
      </Select>,
    );
    const root = getByRole('combobox').parentElement;

    expect(root).toHaveAttribute('data-appearance', 'filled-darker');
    expect(root).toHaveAttribute('data-size', 'large');
  });

  it('preserves consumer class names', () => {
    const { getByRole } = render(
      <Select aria-label="Select" className="custom-root" select={{ className: 'custom-select' }}>
        <option>Option</option>
      </Select>,
    );
    const select = getByRole('combobox');

    expect(select.parentElement).toHaveClass('custom-root');
    expect(select).toHaveClass('custom-select');
  });

  it('preserves a custom icon', () => {
    const { getByTestId } = render(
      <Select aria-label="Select" icon={<span data-testid="custom-icon">Custom</span>}>
        <option>Option</option>
      </Select>,
    );

    expect(getByTestId('custom-icon')).toHaveTextContent('Custom');
    expect(getByTestId('custom-icon').querySelector('svg')).not.toBeInTheDocument();
  });
});
