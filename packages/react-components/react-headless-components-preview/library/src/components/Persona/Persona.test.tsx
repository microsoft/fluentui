import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Persona } from './Persona';

describe('Persona', () => {
  isConformant({
    Component: Persona,
    displayName: 'Persona',
  });

  it('renders a default state', () => {
    const { getByRole, getByText } = render(
      <Persona name="John Doe" primaryText="John Doe" secondaryText="Software Engineer" />,
    );

    expect(getByRole('img', { name: 'John Doe' })).toBeInTheDocument();
    expect(getByText('John Doe')).toBeInTheDocument();
    expect(getByText('Software Engineer')).toBeInTheDocument();
  });

  it('renders the avatar after the text when textPosition is before', () => {
    const { container, getByText, getByRole } = render(
      <Persona name="John Doe" primaryText="John Doe" secondaryText="Software Engineer" textPosition="before" />,
    );

    const root = container.firstElementChild as HTMLElement;
    const primaryText = getByText('John Doe');
    const avatar = getByRole('img', { name: 'John Doe' });

    expect(root.firstElementChild).toBe(primaryText);
    expect(root.lastElementChild).toBe(avatar);
  });
});
