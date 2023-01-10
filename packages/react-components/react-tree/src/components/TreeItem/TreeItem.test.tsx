import * as React from 'react';
import { render } from '@testing-library/react';
import { TreeItem } from './TreeItem';
import { isConformant } from '../../testing/isConformant';
import { TreeItemProps } from './TreeItem.types';
import { treeItemClassNames } from './useTreeItemStyles';

describe('TreeItem', () => {
  isConformant<TreeItemProps>({
    Component: TreeItem,
    displayName: 'TreeItem',
    // primarySlot: 'groupper',
    getTargetElement(renderResult, attr) {
      return renderResult.container.querySelector(`.${treeItemClassNames.root}`) ?? renderResult.container;
    },
    disabledTests: ['component-has-static-classnames-object'],
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            expandIcon: 'Test Expand Icon',
            iconBefore: 'Test Icon Before',
            iconAfter: 'Test Icon After',
            actions: 'test Actions',
            badges: 'test Badges',
          },
        },
      ],
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TreeItem>Default TreeItem</TreeItem>);
    expect(result.container).toMatchSnapshot();
  });
});
