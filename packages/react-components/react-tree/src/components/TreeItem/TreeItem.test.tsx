import * as React from 'react';
import { render } from '@testing-library/react';
import { TreeItem } from './TreeItem';
import { isConformant } from '../../testing/isConformant';
import { TreeItemProps } from './TreeItem.types';

describe('TreeItem', () => {
  isConformant<TreeItemProps>({
    Component: TreeItem,
    displayName: 'TreeItem',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            expandIcon: 'Test Expand Icon',
            iconBefore: 'Test Icon Before',
            iconAfter: 'Test Icon After',
            actionIcon: 'test Action Icon',
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
