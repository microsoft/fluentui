import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { CardPreview, cardPreviewClassNames } from './';

expect.extend(toHaveNoViolations);

describe('CardPreview', () => {
  it('has no axe violations', async () => {
    const { baseElement } = render(<CardPreview>Preview</CardPreview>);
    expect(await axe(baseElement, { rules: { region: { enabled: false } } })).toHaveNoViolations();
  });

  it('styles all rendered slots and preserves consumer classes', () => {
    render(
      <CardPreview className="custom-preview" logo={{ children: 'Logo' }}>
        Preview
      </CardPreview>,
    );

    expect(screen.getByText('Preview')).toHaveClass(cardPreviewClassNames.root, 'custom-preview');
    expect(screen.getByText('Logo')).toHaveClass(cardPreviewClassNames.logo);
  });
});
