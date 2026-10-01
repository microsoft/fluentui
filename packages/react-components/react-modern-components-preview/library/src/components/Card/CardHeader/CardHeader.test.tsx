import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { CardHeader, cardHeaderClassNames } from './';

expect.extend(toHaveNoViolations);

describe('CardHeader', () => {
  it('has no axe violations', async () => {
    const { baseElement } = render(<CardHeader header={{ children: 'Heading' }} />);
    expect(await axe(baseElement, { rules: { region: { enabled: false } } })).toHaveNoViolations();
  });

  it('styles all rendered slots and preserves consumer classes', () => {
    render(
      <CardHeader
        action={{ children: 'Action' }}
        className="custom-header"
        description={{ children: 'Description' }}
        header={{ children: 'Heading' }}
        image={{ children: 'Image' }}
      />,
    );

    expect(screen.getByText('Heading').parentElement).toHaveClass(cardHeaderClassNames.root, 'custom-header');
    expect(screen.getByText('Heading')).toHaveClass(cardHeaderClassNames.header);
    expect(screen.getByText('Description')).toHaveClass(cardHeaderClassNames.description);
    expect(screen.getByText('Image')).toHaveClass(cardHeaderClassNames.image);
    expect(screen.getByText('Action')).toHaveClass(cardHeaderClassNames.action);
  });
});
