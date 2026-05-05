import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Divider } from './Divider';

describe('Divider', () => {
  isConformant({
    Component: Divider,
    displayName: 'Divider',
  });

  it('renders with horizontal orientation by default', () => {
    const { getByRole } = render(<Divider>Default Divider</Divider>);
    const divider = getByRole('separator');
    expect(divider).toHaveAttribute('data-orientation', 'horizontal');
  });

  it('renders with vertical orientation', () => {
    const { getByRole } = render(<Divider vertical>Vertical Divider</Divider>);
    const divider = getByRole('separator');
    expect(divider).toHaveAttribute('data-orientation', 'vertical');
  });
});
