import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { Breadcrumb } from './Breadcrumb';
import { BreadcrumbButton } from '../BreadcrumbButton/BreadcrumbButton';
import { BreadcrumbItem } from '../BreadcrumbItem/BreadcrumbItem';
import { isConformant } from '../../testing/isConformant';

describe('Breadcrumb', () => {
  isConformant({
    Component: Breadcrumb,
    displayName: 'Breadcrumb',
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts
    // it was called with the consumer className last; this component now composes with
    // clsx and never calls mergeClasses, so the test can no longer observe the contract.
    // The guarantee itself is unchanged — clsx puts `state.root.className` last and the
    // `@layer fui.*` sublayers keep unlayered consumer CSS winning (DECISIONS.md D2/D9).
    // `classname-overrides-win` below is its cascade-native replacement (DECISIONS.md D9).
    disabledTests: ['make-styles-overrides-win'],
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
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
          class="group/fui-breadcrumb fui-Breadcrumb"
        >
          <ol
            class="fui-Breadcrumb__list"
            role="list"
          >
            <li
              class="group/fui-breadcrumb-item fui-BreadcrumbItem"
            >
              <button
                class="group/fui-button fui-Button group/fui-breadcrumb-button fui-BreadcrumbButton"
                data-size="medium"
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
          class="group/fui-breadcrumb fui-Breadcrumb"
        >
          <ol
            class="fui-Breadcrumb__list"
            role="list"
          >
            <li
              class="group/fui-breadcrumb-item fui-BreadcrumbItem"
            >
              <a
                class="group/fui-button fui-Button group/fui-breadcrumb-button fui-BreadcrumbButton"
                data-size="medium"
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
