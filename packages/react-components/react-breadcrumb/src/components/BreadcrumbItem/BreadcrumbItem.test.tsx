import * as React from 'react';
import { render } from '@testing-library/react';
import { BreadcrumbItem } from './BreadcrumbItem';
import { isConformant } from '../../testing/isConformant';

describe('BreadcrumbItem', () => {
  isConformant({
    Component: BreadcrumbItem,
    displayName: 'BreadcrumbItem',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<BreadcrumbItem>Default BreadcrumbItem</BreadcrumbItem>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <li
          class="fui-BreadcrumbItem"
        >
          Default BreadcrumbItem
        </li>
      </div>
    `);
  });
});
