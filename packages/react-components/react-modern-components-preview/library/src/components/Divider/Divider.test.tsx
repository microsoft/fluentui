import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Divider } from './Divider';

describe('Divider', () => {
  isConformant({
    Component: Divider,
    displayName: 'Divider',
  });

  it('renders a default state', () => {
    const { getByRole } = render(<Divider>Default Divider</Divider>);
    const divider = getByRole('separator');

    expect(divider).toHaveTextContent('Default Divider');
    expect(divider).toHaveAttribute('aria-orientation', 'horizontal');
    expect(divider).toHaveAttribute('data-align-content', 'center');
    expect(divider).toHaveAttribute('data-appearance', 'default');
    expect(divider).toHaveAttribute('data-orientation', 'horizontal');
  });
});
