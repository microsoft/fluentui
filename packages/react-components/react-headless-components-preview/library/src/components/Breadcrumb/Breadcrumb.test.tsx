import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Breadcrumb } from './Breadcrumb';
import { BreadcrumbButton } from './BreadcrumbButton';
import { BreadcrumbDivider } from './BreadcrumbDivider';

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

  it.each([{ disabled: true }, { disabledFocusable: true }])('exposes disabled button state for %p', props => {
    const { getByRole } = render(<BreadcrumbButton {...props}>Page</BreadcrumbButton>);
    expect(getByRole('button', { name: 'Page' })).toHaveAttribute('data-disabled');
  });

  it('keeps divider content in an aria-hidden list item', () => {
    const { getByTestId } = render(<BreadcrumbDivider data-testid="divider">/</BreadcrumbDivider>);
    expect(getByTestId('divider').tagName).toBe('LI');
    expect(getByTestId('divider')).toHaveAttribute('aria-hidden', 'true');
    expect(getByTestId('divider')).toHaveTextContent('/');
  });
});
