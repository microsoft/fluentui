import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Label, labelClassNames } from './';

describe('Label', () => {
  it('renders with default visual state', () => {
    render(<Label>Default label</Label>);

    expect(screen.getByText('Default label')).toHaveAttribute('data-size', 'medium');
    expect(screen.getByText('Default label')).toHaveAttribute('data-weight', 'regular');
    expect(screen.getByText('Default label')).toHaveClass(labelClassNames.root);
  });

  it('maps visual props and preserves the consumer class name', () => {
    render(
      <Label className="custom-label" size="large" weight="semibold">
        Large label
      </Label>,
    );

    expect(screen.getByText('Large label')).toHaveAttribute('data-size', 'large');
    expect(screen.getByText('Large label')).toHaveAttribute('data-weight', 'semibold');
    expect(screen.getByText('Large label')).toHaveClass(labelClassNames.root, 'custom-label');
  });

  it('styles the required slot and preserves headless state attributes', () => {
    render(
      <Label disabled required>
        Required label
      </Label>,
    );

    const label = screen.getByText('Required label');
    const required = screen.getByText('*');

    expect(label).toHaveAttribute('data-disabled');
    expect(label).toHaveAttribute('data-required');
    expect(required).toHaveClass(labelClassNames.required);
    expect(required).toHaveAttribute('aria-hidden', 'true');
  });
});
