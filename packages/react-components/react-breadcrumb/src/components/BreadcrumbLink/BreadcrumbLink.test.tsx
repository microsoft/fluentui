import * as React from 'react';
import { render } from '@testing-library/react';
import { BreadcrumbLink } from './BreadcrumbLink';
import type { BreadcrumbLinkProps } from './BreadcrumbLink.types';
import { isConformant } from '../../testing/isConformant';
import { breadcrumbLinkClassNames } from './useBreadcrumbLinkStyles.styles';

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

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<BreadcrumbLink>Default BreadcrumbLink</BreadcrumbLink>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <button
          class="fui-Link fui-Link fui-BreadcrumbLink"
          type="button"
        >
          Default BreadcrumbLink
        </button>
      </div>
    `);
  });
});
