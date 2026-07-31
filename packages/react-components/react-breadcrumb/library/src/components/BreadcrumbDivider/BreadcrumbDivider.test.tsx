import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { BreadcrumbDivider } from './BreadcrumbDivider';
import { isConformant } from '../../testing/isConformant';

describe('BreadcrumbDivider', () => {
  isConformant({
    Component: BreadcrumbDivider,
    displayName: 'BreadcrumbDivider',
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts
    // it was called with the consumer className last; this component now composes with
    // clsx and never calls mergeClasses, so the test can no longer observe the contract.
    // The guarantee itself is unchanged — clsx puts `state.root.className` last and the
    // `@layer fui.*` sublayers keep unlayered consumer CSS winning (DECISIONS.md D2/D9).
    // `classname-overrides-win` below is its cascade-native replacement (DECISIONS.md D9).
    //
    // `component-has-static-classnames-object` asserts the exact `fui-<Component>` format,
    // which the D16 statics-removal sweep retired for converted packages:
    // `breadcrumbDividerClassNames.root` is now the group marker (DECISIONS.md D16.5/D16.6).
    // `component-has-group-marker` (now a default test) is the replacement — it asserts the marker is
    // stamped AND never lands at `classList[0]`, the machine-checkable form of the
    // D15.1/D16.2 invariant.
    disabledTests: ['component-has-static-classnames-object'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  it('renders a default state', () => {
    const result = render(<BreadcrumbDivider />);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <li
          aria-hidden="true"
          class="group/fui-breadcrumb-divider"
          data-size="medium"
        >
          <svg
            aria-hidden="true"
            class=""
            fill="currentColor"
            height="1em"
            viewBox="0 0 20 20"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.65 4.15c.2-.2.5-.2.7 0l5.49 5.46c.21.22.21.57 0 .78l-5.49 5.46a.5.5 0 0 1-.7-.7L12.8 10 7.65 4.85a.5.5 0 0 1 0-.7Z"
              fill="currentColor"
            />
          </svg>
        </li>
      </div>
    `);
  });
});
