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
          <span
            class="fui-BreadcrumbDivider fui-BreadcrumbItem__divider"
          >
            <svg
              aria-hidden="true"
              class=""
              fill="currentColor"
              height="16"
              viewBox="0 0 16 16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.65 3.15a.5.5 0 000 .7L9.79 8l-4.14 4.15a.5.5 0 00.7.7l4.5-4.5a.5.5 0 000-.7l-4.5-4.5a.5.5 0 00-.7 0z"
                fill="currentColor"
              />
            </svg>
          </span>
        </li>
      </div>
    `);
  });
});
