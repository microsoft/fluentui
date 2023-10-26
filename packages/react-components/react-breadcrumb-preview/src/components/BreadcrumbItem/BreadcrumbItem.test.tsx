import * as React from 'react';
import { render } from '@testing-library/react';
import { BreadcrumbItem } from './BreadcrumbItem';
import { BreadcrumbItemProps } from './BreadcrumbItem.types';
import { isConformant } from '../../testing/isConformant';
import { breadcrumbItemClassNames } from './useBreadcrumbItemStyles.styles';

describe('BreadcrumbItem', () => {
  isConformant({
    Component: BreadcrumbItem as React.FunctionComponent<BreadcrumbItemProps>,
    displayName: 'BreadcrumbItem',
    testOptions: {
      'has-static-classnames': [
        {
          props: {},
          expectedClassNames: {
            root: breadcrumbItemClassNames.root,
          },
        },
      ],
    },
  });

  it('renders a default state', () => {
    const result = render(<BreadcrumbItem>Default BreadcrumbItem</BreadcrumbItem>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <li
          class="fui-BreadcrumbItem"
        >
          Default BreadcrumbItem
        </li>
      </div>
    `);
  });
});
