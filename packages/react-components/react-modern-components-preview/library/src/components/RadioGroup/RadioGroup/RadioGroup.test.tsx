import * as React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Radio } from '../Radio';
import { RadioGroup } from './RadioGroup';
import { radioGroupClassNames } from './useRadioGroupStyles.styles';

expect.extend(toHaveNoViolations);

describe('RadioGroup', () => {
  it('has no axe violations', async () => {
    const { baseElement } = render(<RadioGroup aria-label="Radio group" />);

    expect(await axe(baseElement, { rules: { region: { enabled: false } } })).toHaveNoViolations();
  });

  it('renders the default visual state with modern class names', () => {
    const { getByRole } = render(<RadioGroup aria-label="Radio group" />);
    const group = getByRole('radiogroup');

    expect(group).toHaveAttribute('data-layout', 'vertical');
    expect(group).toHaveClass(radioGroupClassNames.root);
  });

  it('passes horizontal-stacked layout to child radios', () => {
    const { getByRole } = render(
      <RadioGroup aria-label="Radio group" layout="horizontal-stacked">
        <Radio aria-label="Radio" />
      </RadioGroup>,
    );

    expect(getByRole('radiogroup')).toHaveAttribute('data-layout', 'horizontal-stacked');
    expect(getByRole('radio').parentElement).toHaveAttribute('data-label-position', 'below');
  });

  it('preserves consumer class names', () => {
    const { getByRole } = render(<RadioGroup aria-label="Radio group" className="custom-root" />);

    expect(getByRole('radiogroup')).toHaveClass('custom-root');
  });
});
