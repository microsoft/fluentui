import * as React from 'react';
import { render } from '@testing-library/react';
import { BreadcrumbDivider } from './BreadcrumbDivider';
import { isConformant } from '../../testing/isConformant';

describe('BreadcrumbDivider', () => {
  isConformant({
    Component: BreadcrumbDivider,
    displayName: 'BreadcrumbDivider',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<BreadcrumbDivider>Default BreadcrumbDivider</BreadcrumbDivider>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <li
          aria-hidden="true"
          class="fui-BreadcrumbDivider"
        >
          Default BreadcrumbDivider
        </li>
      </div>
    `);
  });
});
