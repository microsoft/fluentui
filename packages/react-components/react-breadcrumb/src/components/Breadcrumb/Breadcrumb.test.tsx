import * as React from 'react';
import { render } from '@testing-library/react';
import { Breadcrumb } from './Breadcrumb';
import { BreadcrumbButton } from '../BreadcrumbButton/BreadcrumbButton';
import { BreadcrumbItem } from '../BreadcrumbItem/BreadcrumbItem';
import { BreadcrumbLink } from '../BreadcrumbLink/BreadcrumbLink';
import { BreadcrumbDivider } from '../BreadcrumbDivider/BreadcrumbDivider';
import { isConformant } from '../../testing/isConformant';

describe('Breadcrumb', () => {
  isConformant({
    Component: Breadcrumb,
    displayName: 'Breadcrumb',
  });

  // create visual regression tests in /apps/vr-tests

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
          data-tabster="{\\"mover\\":{\\"cyclic\\":true,\\"direction\\":2,\\"memorizeCurrent\\":true}}"
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
                type="button"
              >
                Item 1
              </button>
            </li>
          </ol>
        </nav>
      </div>
    `);
  });
  it('renders a small non-interactive Breadcrumb with a slash divider', () => {
    const result = render(
      <Breadcrumb size="small" dividerType="slash">
        <BreadcrumbItem>Item 1</BreadcrumbItem>
        <BreadcrumbDivider />
        <BreadcrumbItem>Item 2</BreadcrumbItem>
      </Breadcrumb>,
    );
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <nav
          aria-label="breadcrumb"
          class="fui-Breadcrumb"
          data-tabster="{\\"mover\\":{\\"cyclic\\":true,\\"direction\\":2,\\"memorizeCurrent\\":true}}"
        >
          <ol
            class="fui-Breadcrumb__list"
            role="list"
          >
            <li
              class="fui-BreadcrumbItem"
            >
              Item 1
            </li>
            <li
              aria-hidden="true"
              class="fui-BreadcrumbDivider"
            >
              /
            </li>
            <li
              class="fui-BreadcrumbItem"
            >
              Item 2
            </li>
          </ol>
        </nav>
      </div>
    `);
  });
  it('renders with a large BreadcrumbLink', () => {
    const result = render(
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink>Link 1</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>,
    );
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <nav
          aria-label="breadcrumb"
          class="fui-Breadcrumb"
          data-tabster="{\\"mover\\":{\\"cyclic\\":true,\\"direction\\":2,\\"memorizeCurrent\\":true}}"
        >
          <ol
            class="fui-Breadcrumb__list"
            role="list"
          >
            <li
              class="fui-BreadcrumbItem"
            >
              <button
                class="fui-Link fui-Link fui-BreadcrumbLink"
                type="button"
              >
                Link 1
              </button>
            </li>
          </ol>
        </nav>
      </div>
    `);
  });
});
