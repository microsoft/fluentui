import * as React from 'react';
import { render } from '@testing-library/react';
import { Breadcrumb } from './Breadcrumb';
import { BreadcrumbButton } from '../BreadcrumbButton/BreadcrumbButton';
import { BreadcrumbItem } from '../BreadcrumbItem/BreadcrumbItem';
import { isConformant } from '../../testing/isConformant';

describe('Breadcrumb', () => {
  isConformant({
    Component: Breadcrumb,
    displayName: 'Breadcrumb',
  });

  it('renders a default state with BreadcrumbButton', () => {
    const result = render(
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbButton>Item 1</BreadcrumbButton>
        </BreadcrumbItem>
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
              class="fui-BreadcrumbItem"
            >
              <button
                class="fui-Button fui-BreadcrumbButton"
              >
                Item 1
              </button>
            </li>
          </ol>
        </nav>
      </div>
    `);
  });

  it('renders with `a` tag', () => {
    const result = render(
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbButton as="a">Link 1</BreadcrumbButton>
        </BreadcrumbItem>
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
              class="fui-BreadcrumbItem"
            >
              <a
                class="fui-Button fui-BreadcrumbButton"
                tabindex="0"
              >
                Link 1
              </a>
            </li>
          </ol>
        </nav>
      </div>
    `);
  });
});
