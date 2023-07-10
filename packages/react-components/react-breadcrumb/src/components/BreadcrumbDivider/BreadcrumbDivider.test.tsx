import * as React from 'react';
import { render } from '@testing-library/react';
import { Breadcrumb } from '../Breadcrumb/Breadcrumb';
import { BreadcrumbDivider } from './BreadcrumbDivider';
import { isConformant } from '../../testing/isConformant';
import { ArrowRight16Filled } from '@fluentui/react-icons';

describe('BreadcrumbDivider', () => {
  isConformant({
    Component: BreadcrumbDivider,
    displayName: 'BreadcrumbDivider',
  });

  // TODO create visual regression tests in /apps/vr-tests

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

  it('renders divider with slash', () => {
    const result = render(
      <Breadcrumb size="small" dividerType="slash">
        <BreadcrumbDivider />
      </Breadcrumb>,
    );
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <nav
          aria-label="breadcrumb"
          class="fui-Breadcrumb"
        >
          <ol
            class="fui-Breadcrumb__list"
            role="list"
          >
            <li
              aria-hidden="true"
              class="fui-BreadcrumbDivider"
            >
              /
            </li>
          </ol>
        </nav>
      </div>
    `);
  });

  it('renders custom divider', () => {
    const result = render(
      <Breadcrumb>
        <BreadcrumbDivider>
          <ArrowRight16Filled />
        </BreadcrumbDivider>
      </Breadcrumb>,
    );
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <nav
          aria-label="breadcrumb"
          class="fui-Breadcrumb"
        >
          <ol
            class="fui-Breadcrumb__list"
            role="list"
          >
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
                  d="M2 8c0-.41.34-.75.75-.75h8.79L8.25 4.31a.75.75 0 0 1 1-1.12L14 7.44a.75.75 0 0 1 0 1.12L9.25 12.8a.75.75 0 1 1-1-1.12l3.29-2.94H2.75A.75.75 0 0 1 2 8Z"
                  fill="currentColor"
                />
              </svg>
            </li>
          </ol>
        </nav>
      </div>
    `);
  });
});
