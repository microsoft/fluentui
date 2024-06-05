import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { TreeItem } from './TreeItem';
import { isConformant } from '../../testing/isConformant';
import { TreeItemProps } from './TreeItem.types';
import { treeItemClassNames } from './useTreeItemStyles.styles';
import { Tree } from '../../Tree';

describe('TreeItem', () => {
  isConformant<TreeItemProps>({
    Component: TreeItem,
    displayName: 'TreeItem',
    getTargetElement(renderResult, attr) {
      return renderResult.container.querySelector(`.${treeItemClassNames.root}`) ?? renderResult.container;
    },
    disabledTests: ['component-has-static-classnames-object', 'consistent-callback-args'],
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            expandIcon: 'Test Expand Icon',
            aside: 'test Aside',
          },
        },
      ],
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TreeItem itemType="leaf">Default TreeItem</TreeItem>);
    expect(result.container).toMatchSnapshot();
  });
  it('should not update open state when the TreeItem is a leaf', () => {
    const handleOpenChange = jest.fn();
    const result = render(
      <Tree onOpenChange={handleOpenChange}>
        <TreeItem onOpenChange={handleOpenChange} itemType="leaf">
          Default TreeItem
        </TreeItem>
      </Tree>,
    );
    fireEvent.click(result.getByText('Default TreeItem'));
    expect(handleOpenChange).toHaveBeenNthCalledWith(1, expect.anything(), expect.objectContaining({ open: false }));
    expect(handleOpenChange).toHaveBeenNthCalledWith(2, expect.anything(), expect.objectContaining({ open: false }));
  });
});
