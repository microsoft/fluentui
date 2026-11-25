import * as React from 'react';
import { render } from '@testing-library/react';
import { NavDrawerBody } from './NavDrawerBody';

describe('NavDrawerBody', () => {
  it('renders with the default role of navigation', () => {
    const { getByRole } = render(<NavDrawerBody />);
    expect(getByRole('navigation')).toBeInTheDocument();
  });

  it('allows changing the role', () => {
    const { getByRole } = render(<NavDrawerBody role="presentation" />);
    expect(getByRole('presentation')).toBeInTheDocument();
  });
});
