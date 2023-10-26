import * as React from 'react';
import { render } from '@testing-library/react';
import { BreadcrumbDivider } from './BreadcrumbDivider';
import { isConformant } from '../../testing/isConformant';

describe('BreadcrumbDivider', () => {
  isConformant({
    Component: BreadcrumbDivider,
    displayName: 'BreadcrumbDivider',
  });

  it('renders a default state', () => {
    const result = render(<BreadcrumbDivider />);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <li
          aria-hidden="true"
          class="fui-BreadcrumbDivider"
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
              d="M5.65 3.15a.5.5 0 0 0 0 .7L9.79 8l-4.14 4.15a.5.5 0 0 0 .7.7l4.5-4.5a.5.5 0 0 0 0-.7l-4.5-4.5a.5.5 0 0 0-.7 0Z"
              fill="currentColor"
            />
          </svg>
        </li>
      </div>
    `);
  });
});
