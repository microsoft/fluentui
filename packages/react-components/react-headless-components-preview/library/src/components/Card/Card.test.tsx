import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Card } from './Card';
import { CardHeader } from './CardHeader';
import { CardFooter } from './CardFooter';
import { CardPreview } from './CardPreview';

describe('Card', () => {
  isConformant({
    Component: Card,
    displayName: 'Card',
  });

  it('renders a default state', () => {
    const { getByRole } = render(<Card>Default Card</Card>);
    expect(getByRole('group')).toHaveTextContent('Default Card');

    // by default the card should not have the `data-selected` attribute
    expect(getByRole('group')).not.toHaveAttribute('data-selected');
  });

  it('renders a card with header, preview, and footer', () => {
    const { getByRole } = render(
      <Card>
        <CardPreview>Card Preview</CardPreview>
        <CardHeader header="Card Header" />
        <CardFooter>Card Footer</CardFooter>
      </Card>,
    );
    expect(getByRole('group')).toHaveTextContent('Card Preview');
    expect(getByRole('group')).toHaveTextContent('Card Header');
    expect(getByRole('group')).toHaveTextContent('Card Footer');
  });

  it('renders a selected card', () => {
    const { getByRole } = render(<Card selected>Selected Card</Card>);
    expect(getByRole('group')).toHaveAttribute('data-selected');
  });
});
