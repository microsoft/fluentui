import * as React from 'react';
import { render } from '@testing-library/react';
import { Breadcrumb } from '../Breadcrumb';
import { BreadcrumbItem } from './BreadcrumbItem';
import { breadcrumbItemClassNames } from './useBreadcrumbItemStyles.styles';

describe('BreadcrumbItem', () => {
  it('inherits size and preserves the consumer class', () => {
    const { getByRole } = render(
      <Breadcrumb size="large">
        <BreadcrumbItem className="custom-root">Item</BreadcrumbItem>
      </Breadcrumb>,
    );
    const item = getByRole('listitem');

    expect(item).toHaveAttribute('data-size', 'large');
    expect(item).toHaveClass(breadcrumbItemClassNames.root, 'custom-root');
  });
});
