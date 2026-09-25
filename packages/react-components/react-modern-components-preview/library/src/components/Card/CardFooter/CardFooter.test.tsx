import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { CardFooter, cardFooterClassNames } from './';

expect.extend(toHaveNoViolations);

describe('CardFooter', () => {
  it('has no axe violations', async () => {
    const { baseElement } = render(<CardFooter>Footer</CardFooter>);
    expect(await axe(baseElement, { rules: { region: { enabled: false } } })).toHaveNoViolations();
  });

  it('styles all rendered slots and preserves consumer classes', () => {
    render(
      <CardFooter action={{ children: 'Action' }} className="custom-footer">
        Footer
      </CardFooter>,
    );

    expect(screen.getByText('Footer')).toHaveClass(cardFooterClassNames.root, 'custom-footer');
    expect(screen.getByText('Action')).toHaveClass(cardFooterClassNames.action);
  });
});
