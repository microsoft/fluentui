import * as React from 'react';
import { render } from '@testing-library/react';
import { Breadcrumb } from '../Breadcrumb';
import { BreadcrumbDivider } from './BreadcrumbDivider';
import { breadcrumbDividerClassNames } from './useBreadcrumbDividerStyles.styles';

describe('BreadcrumbDivider', () => {
  it('renders the inherited size and default divider icon', () => {
    const { container } = render(
      <Breadcrumb size="large">
        <BreadcrumbDivider className="custom-root" />
      </Breadcrumb>,
    );
    const divider = container.querySelector(`.${breadcrumbDividerClassNames.root}`);

    expect(divider).toHaveAttribute('aria-hidden', 'true');
    expect(divider).toHaveAttribute('data-size', 'large');
    expect(divider).toHaveClass('custom-root');
    expect(divider?.querySelector('[data-default-icon]')).toBeInTheDocument();
  });

  it('preserves custom children', () => {
    const { getByText, container } = render(<BreadcrumbDivider>Custom</BreadcrumbDivider>);

    expect(getByText('Custom')).toBeInTheDocument();
    expect(container.querySelector('[data-default-icon]')).not.toBeInTheDocument();
  });
});
