import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { InfoButton, infoButtonClassNames } from './';

expect.extend(toHaveNoViolations);

describe('InfoButton', () => {
  it('has no axe violations', async () => {
    const { baseElement } = render(<InfoButton info="Information" />);
    expect(await axe(baseElement, { rules: { region: { enabled: false } } })).toHaveNoViolations();
  });

  it('renders the default visual state and icon', () => {
    render(<InfoButton info="Information" />);
    const button = screen.getByRole('button', { name: 'information' });

    expect(button).toHaveAttribute('data-size', 'medium');
    expect(button).toHaveClass(infoButtonClassNames.root);
    expect(button.querySelector('svg')).toBeTruthy();
  });

  it('maps size, preserves custom content, and exposes headless open state', () => {
    render(
      <InfoButton className="custom-info-button" info="Information" popover={{ open: true }} size="large">
        Custom icon
      </InfoButton>,
    );
    const button = screen.getByRole('button', { name: 'information' });

    expect(button).toHaveAttribute('data-open');
    expect(button).toHaveAttribute('data-size', 'large');
    expect(button).toHaveClass(infoButtonClassNames.root, 'custom-info-button');
    expect(button).toHaveTextContent('Custom icon');
  });
});
