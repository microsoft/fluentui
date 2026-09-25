import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { InfoLabel, infoLabelClassNames } from './';

expect.extend(toHaveNoViolations);

describe('InfoLabel', () => {
  it('has no axe violations', async () => {
    const { baseElement } = render(<InfoLabel info="Information">Account</InfoLabel>);
    expect(await axe(baseElement, { rules: { region: { enabled: false } } })).toHaveNoViolations();
  });

  it('renders modern compound slots with default visual state', () => {
    const { container } = render(<InfoLabel info="Information">Account</InfoLabel>);
    const root = container.firstElementChild;

    expect(root).toHaveAttribute('data-size', 'medium');
    expect(root).toHaveClass(infoLabelClassNames.root);
    expect(screen.getByText('Account')).toHaveClass(infoLabelClassNames.label);
    expect(screen.getByRole('button')).toHaveClass(infoLabelClassNames.infoButton);
  });

  it('preserves aria ownership behavior and maps size', () => {
    const { container } = render(
      <InfoLabel
        className="custom-info-label"
        info="Information"
        infoButton={{ popover: { id: 'details' } }}
        size="large"
      >
        Account
      </InfoLabel>,
    );
    const root = container.firstElementChild;

    expect(root).toHaveAttribute('data-size', 'large');
    expect(root).toHaveClass(infoLabelClassNames.root, 'custom-info-label');

    fireEvent.click(screen.getByRole('button'));
    expect(root).toHaveAttribute('aria-owns', 'details');
  });
});
