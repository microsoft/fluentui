import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Card, cardClassNames } from './';

expect.extend(toHaveNoViolations);

describe('Card', () => {
  it('has no axe violations', async () => {
    const { baseElement } = render(<Card>Card content</Card>);
    expect(await axe(baseElement, { rules: { region: { enabled: false } } })).toHaveNoViolations();
  });

  it('renders the default visual state', () => {
    render(<Card>Card content</Card>);

    const card = screen.getByText('Card content');
    expect(card).toHaveAttribute('data-appearance', 'filled');
    expect(card).toHaveAttribute('data-orientation', 'vertical');
    expect(card).toHaveAttribute('data-size', 'medium');
    expect(card).toHaveClass(cardClassNames.root);
  });

  it('maps visual props and preserves headless state and consumer classes', () => {
    render(
      <Card appearance="outline" className="custom-card" orientation="horizontal" selected size="large">
        Selected card
      </Card>,
    );

    const card = screen.getByText('Selected card');
    expect(card).toHaveAttribute('data-appearance', 'outline');
    expect(card).toHaveAttribute('data-orientation', 'horizontal');
    expect(card).toHaveAttribute('data-selected');
    expect(card).toHaveAttribute('data-size', 'large');
    expect(card).toHaveClass(cardClassNames.root, 'custom-card');
  });
});
