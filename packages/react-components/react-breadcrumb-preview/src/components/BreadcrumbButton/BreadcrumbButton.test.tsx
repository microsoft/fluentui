import * as React from 'react';
import { render } from '@testing-library/react';
import { BreadcrumbButton } from './BreadcrumbButton';
import { BreadcrumbButtonProps } from './BreadcrumbButton.types';
import { isConformant } from '../../testing/isConformant';
import { breadcrumbButtonClassNames } from './useBreadcrumbButtonStyles.styles';
import { ArrowRight16Filled } from '@fluentui/react-icons';

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
    const result = render(
      <BreadcrumbButton icon={<ArrowRight16Filled />}>BreadcrumbButton with icon</BreadcrumbButton>,
    );
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
          </span>
          BreadcrumbButton with icon
        </button>
      </div>
    `);
  });
});
