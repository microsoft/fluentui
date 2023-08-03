import * as React from 'react';
import { render } from '@testing-library/react';
import { BreadcrumbLink } from './BreadcrumbLink';
import type { BreadcrumbLinkProps } from './BreadcrumbLink.types';
import { isConformant } from '../../testing/isConformant';
import { breadcrumbLinkClassNames } from './useBreadcrumbLinkStyles.styles';
import { ArrowRight16Filled } from '@fluentui/react-icons';

describe('BreadcrumbLink', () => {
  isConformant({
    Component: BreadcrumbLink as React.FunctionComponent<BreadcrumbLinkProps>,
    displayName: 'BreadcrumbLink',
    testOptions: {
      'has-static-classnames': [
        {
          props: {},
          expectedClassNames: {
            root: breadcrumbLinkClassNames.root,
          },
        },
      ],
    },
  });

  // TODO create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<BreadcrumbLink href="#">Default BreadcrumbLink</BreadcrumbLink>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <a
          class="fui-Link fui-Link fui-BreadcrumbLink"
          href="#"
          tabindex="0"
        >
          Default BreadcrumbLink
        </a>
      </div>
    `);
  });

  it('renders with an icon in a default position', () => {
    const result = render(
      <BreadcrumbLink href="#" icon={<ArrowRight16Filled />}>
        BreadcrumbLink with icon
      </BreadcrumbLink>,
    );
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <a
          class="fui-Link fui-Link fui-BreadcrumbLink"
          href="#"
          tabindex="0"
        >
          <span
            class=""
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
          BreadcrumbLink with icon
        </a>
      </div>
    `);
  });

  it('renders with an icon in a position `after`', () => {
    const result = render(
      <BreadcrumbLink href="#" icon={<ArrowRight16Filled />} iconPosition="after">
        BreadcrumbLink with icon
      </BreadcrumbLink>,
    );
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <a
          class="fui-Link fui-Link fui-BreadcrumbLink"
          href="#"
          tabindex="0"
        >
          BreadcrumbLink with icon
          <span
            class=""
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
        </a>
      </div>
    `);
  });

  it('renders only icon', () => {
    const result = render(<BreadcrumbLink href="#" icon={<ArrowRight16Filled />} />);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <a
          class="fui-Link fui-Link fui-BreadcrumbLink"
          href="#"
          tabindex="0"
        >
          <span
            class=""
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
        </a>
      </div>
    `);
  });
});
