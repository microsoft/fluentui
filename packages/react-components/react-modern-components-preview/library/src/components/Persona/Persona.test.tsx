import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Persona, personaClassNames } from './';

expect.extend(toHaveNoViolations);

describe('Persona', () => {
  it('has no axe violations', async () => {
    const { baseElement } = render(<Persona name="User" />);
    expect(await axe(baseElement, { rules: { region: { enabled: false } } })).toHaveNoViolations();
  });

  it('renders the default visual state and modern Avatar', () => {
    const { container } = render(<Persona name="Ada Lovelace" secondaryText="Mathematician" />);
    const root = container.firstElementChild;

    expect(root).toHaveAttribute('data-size', 'medium');
    expect(root).toHaveAttribute('data-text-alignment', 'start');
    expect(root).toHaveAttribute('data-text-position', 'after');
    expect(root).toHaveClass(personaClassNames.root);
    expect(screen.getByRole('img', { name: 'Ada Lovelace' })).toHaveClass(personaClassNames.avatar);
    expect(screen.getByText('Ada Lovelace')).toHaveClass(personaClassNames.primaryText);
    expect(screen.getByText('Mathematician')).toHaveClass(personaClassNames.secondaryText);
  });

  it('maps visual props and preserves headless render order and consumer classes', () => {
    const { container } = render(
      <Persona
        className="custom-persona"
        name="Ada Lovelace"
        size="huge"
        textAlignment="center"
        textPosition="before"
      />,
    );
    const root = container.firstElementChild;

    expect(root).toHaveAttribute('data-size', 'huge');
    expect(root).toHaveAttribute('data-text-alignment', 'center');
    expect(root).toHaveAttribute('data-text-position', 'before');
    expect(root).toHaveClass(personaClassNames.root, 'custom-persona');
    expect(root?.firstElementChild).toBe(screen.getByText('Ada Lovelace'));
    expect(root?.lastElementChild).toBe(screen.getByRole('img', { name: 'Ada Lovelace' }));
  });
});
