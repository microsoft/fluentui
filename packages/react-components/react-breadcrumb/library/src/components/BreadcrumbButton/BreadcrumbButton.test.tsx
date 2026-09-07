import * as React from 'react';
import { render, renderHook } from '@testing-library/react';
import { BreadcrumbButton } from './BreadcrumbButton';
import { useBreadcrumbButtonBase_unstable } from './useBreadcrumbButton';
import type { BreadcrumbButtonProps } from './BreadcrumbButton.types';
import { isConformant } from '../../testing/isConformant';
import { breadcrumbButtonClassNames } from './useBreadcrumbButtonStyles.styles';
import { ArrowRightFilled } from '@fluentui/react-icons';

describe('BreadcrumbButton', () => {
  isConformant({
    Component: BreadcrumbButton as React.FunctionComponent<BreadcrumbButtonProps>,
    displayName: 'BreadcrumbButton',
    testOptions: {
      'has-static-classnames': [
        {
          props: {},
          expectedClassNames: {
            root: breadcrumbButtonClassNames.root,
          },
        },
      ],
    },
  });

  it('renders a default state', () => {
    const result = render(<BreadcrumbButton>Default BreadcrumbButton</BreadcrumbButton>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <button
          class="fui-Button fui-BreadcrumbButton"
        >
          Default BreadcrumbButton
        </button>
      </div>
    `);
  });

  it('renders with an icon', () => {
    const result = render(<BreadcrumbButton icon={<ArrowRightFilled />}>BreadcrumbButton with icon</BreadcrumbButton>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <button
          class="fui-Button fui-BreadcrumbButton"
        >
          <span
            class="fui-Button__icon"
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
                d="M11.27 3.2a.75.75 0 0 0-1.04 1.1l5.24 4.95H2.75a.75.75 0 0 0 0 1.5h12.73l-5.25 4.96a.75.75 0 1 0 1.04 1.09l6.41-6.07a1 1 0 0 0 0-1.46l-6.41-6.06Z"
                fill="currentColor"
              />
            </svg>
          </span>
          BreadcrumbButton with icon
        </button>
      </div>
    `);
  });

  it('accepts the anchor arm of the ARIA button union in the base hook', () => {
    const { result } = renderHook(() =>
      useBreadcrumbButtonBase_unstable({ as: 'a', href: '/somewhere' }, React.createRef<HTMLAnchorElement>()),
    );

    expect(result.current).toMatchObject({
      root: { as: 'a', href: '/somewhere' },
    });
  });

  it('keeps an explicit as="button" on the button arm of the base hook', () => {
    const { result } = renderHook(() =>
      useBreadcrumbButtonBase_unstable({ as: 'button' }, React.createRef<HTMLButtonElement>()),
    );

    expect(result.current.root.as).toBe('button');
    expect(result.current.root.role).toBeUndefined();
  });
});
