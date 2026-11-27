import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Breadcrumb } from './Breadcrumb';

describe('Breadcrumb', () => {
  isConformant({
    Component: Breadcrumb,
    displayName: 'Breadcrumb',
  });

  it('renders a default state', () => {
    const { getByRole, getByText } = render(<Breadcrumb>Default Breadcrumb</Breadcrumb>);
    const nav = getByRole('navigation');

    expect(nav).toBeInTheDocument();
    expect(nav).toHaveAttribute('aria-label', 'breadcrumb');
    expect(nav.querySelector('ol')).toBeInTheDocument();
    expect(getByText('Default Breadcrumb')).toBeInTheDocument();
  });

  it('sets focusgroup on the list when focusMode is arrow', () => {
    const { getByRole } = render(<Breadcrumb focusMode="arrow">Item</Breadcrumb>);

    expect(getByRole('list')).toHaveAttribute('focusgroup', 'toolbar inline wrap');
  });

  it('does not set focusgroup by default', () => {
    const { getByRole } = render(<Breadcrumb>Item</Breadcrumb>);

    expect(getByRole('list')).not.toHaveAttribute('focusgroup');
  });
});
