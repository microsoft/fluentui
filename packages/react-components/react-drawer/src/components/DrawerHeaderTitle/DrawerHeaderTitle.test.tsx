import * as React from 'react';
import { render } from '@testing-library/react';
import { DrawerHeaderTitle } from './DrawerHeaderTitle';
import { isConformant } from '../../testing/isConformant';
import { DrawerHeaderTitleProps } from './DrawerHeaderTitle.types';
import { drawerHeaderTitleClassNames } from './useDrawerHeaderTitleStyles.styles';

describe('DrawerHeaderTitle', () => {
  isConformant<DrawerHeaderTitleProps>({
    Component: DrawerHeaderTitle,
    displayName: 'DrawerHeaderTitle',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            action: 'Action',
          },
          expectedClassNames: {
            root: drawerHeaderTitleClassNames.root,
            heading: drawerHeaderTitleClassNames.heading,
            action: drawerHeaderTitleClassNames.action,
          },
        },
      ],
    },
    disabledTests: ['component-has-static-classnames-object'],
  });

  it('renders a default state', () => {
    const result = render(<DrawerHeaderTitle>Default DrawerHeaderTitle</DrawerHeaderTitle>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="fui-DrawerHeaderTitle"
        >
          <h2
            class="fui-DrawerHeaderTitle__heading fui-DialogTitle"
          >
            Default DrawerHeaderTitle
          </h2>
        </div>
      </div>
    `);
  });

  it('renders action', () => {
    const result = render(<DrawerHeaderTitle action={'Test'}>Default DrawerHeaderTitle</DrawerHeaderTitle>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="fui-DrawerHeaderTitle"
        >
          <h2
            class="fui-DrawerHeaderTitle__heading fui-DialogTitle"
          >
            Default DrawerHeaderTitle
          </h2>
          <div
            class="fui-DrawerHeaderTitle__action fui-DialogTitle__action"
          >
            Test
          </div>
        </div>
      </div>
    `);
  });
});
