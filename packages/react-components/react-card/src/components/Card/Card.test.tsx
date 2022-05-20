import * as React from 'react';
import { render } from '@testing-library/react';
import { Card } from './Card';
import { isConformant } from '../../common/isConformant';

describe('Card', () => {
  isConformant({
    Component: Card,
    displayName: 'Card',
  });

  it('renders a default state', () => {
    const result = render(<Card>Default Card</Card>);
    expect(result.container).toMatchSnapshot();
  });
});
