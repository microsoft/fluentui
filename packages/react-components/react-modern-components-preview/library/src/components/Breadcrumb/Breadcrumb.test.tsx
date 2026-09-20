import * as React from 'react';
import { render } from '@testing-library/react';
import { Breadcrumb } from './Breadcrumb';
import { BreadcrumbButton } from '../BreadcrumbButton';
import { BreadcrumbItem } from '../BreadcrumbItem';
import { breadcrumbClassNames } from './useBreadcrumbStyles.styles';

describe('Breadcrumb', () => {
  it('renders stable defaults and provides size to descendants', () => {
    const { getByRole } = render(
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbButton>Home</BreadcrumbButton>
        </BreadcrumbItem>
      </Breadcrumb>,
    );
    const navigation = getByRole('navigation');
    const button = getByRole('button');

    expect(navigation).toHaveClass(breadcrumbClassNames.root);
    expect(navigation).toHaveAttribute('aria-label', 'breadcrumb');
    expect(navigation).toHaveAttribute('data-size', 'medium');
    expect(button).toHaveAttribute('data-size', 'medium');
  });
});
