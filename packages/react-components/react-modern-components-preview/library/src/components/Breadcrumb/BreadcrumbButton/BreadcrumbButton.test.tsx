import * as React from 'react';
import { render } from '@testing-library/react';
import { Breadcrumb } from '../Breadcrumb';
import { BreadcrumbButton } from './BreadcrumbButton';
import { breadcrumbButtonClassNames } from './useBreadcrumbButtonStyles.styles';

describe('BreadcrumbButton', () => {
  it('inherits visual defaults and marks the current page', () => {
    const { getByRole } = render(
      <Breadcrumb size="small">
        <BreadcrumbButton current>Current page</BreadcrumbButton>
      </Breadcrumb>,
    );
    const button = getByRole('button');

    expect(button).toHaveAttribute('aria-current', 'page');
    expect(button).toHaveAttribute('data-current');
    expect(button).toHaveAttribute('data-appearance', 'subtle');
    expect(button).toHaveAttribute('data-size', 'small');
    expect(button).toHaveClass(breadcrumbButtonClassNames.root);
  });

  it('preserves root and icon consumer classes', () => {
    const { getByRole, getByText } = render(
      <BreadcrumbButton className="custom-root" icon={{ children: 'Icon', className: 'custom-icon' }}>
        Page
      </BreadcrumbButton>,
    );

    expect(getByRole('button')).toHaveClass('custom-root');
    expect(getByText('Icon')).toHaveClass(breadcrumbButtonClassNames.icon, 'custom-icon');
  });
});
