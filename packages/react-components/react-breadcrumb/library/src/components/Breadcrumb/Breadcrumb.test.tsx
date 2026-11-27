import * as React from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { Breadcrumb } from './Breadcrumb';
import { BreadcrumbButton } from '../BreadcrumbButton/BreadcrumbButton';
import { BreadcrumbItem } from '../BreadcrumbItem/BreadcrumbItem';
import { isConformant } from '../../testing/isConformant';
import { useBreadcrumbBase_unstable } from './useBreadcrumb';

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

describe('Breadcrumb DOM attributes', () => {
  it('does not render component props as DOM attributes', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { container } = render(<Breadcrumb focusMode="arrow" size="large" />);

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
    expect((container.firstElementChild as HTMLElement).getAttributeNames().sort()).toEqual([
      'aria-label',
      'class',
      'data-tabster',
    ]);
  });
});

describe('useBreadcrumbBase_unstable base hook', () => {
  it('does not forward component props to the root slot', () => {
    const { result } = renderHook(() =>
      useBreadcrumbBase_unstable({ focusMode: 'arrow', list: { children: 'Items' } }, React.createRef()),
    );

    expect(result.current.root).not.toHaveProperty('focusMode');
    expect(result.current.root).not.toHaveProperty('list');
  });
});
