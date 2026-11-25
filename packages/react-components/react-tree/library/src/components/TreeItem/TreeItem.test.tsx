import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { TreeItem } from './TreeItem';
import { isConformant } from '../../testing/isConformant';
import type { TreeItemProps } from './TreeItem.types';
import { treeItemClassNames } from './useTreeItemStyles.styles';
import { Tree } from '../../Tree';
import { treeItemLevelToken } from '../../utils/tokens';

describe('TreeItem', () => {
  isConformant<TreeItemProps>({
    Component: TreeItem,
    displayName: 'TreeItem',
    renderOptions: { wrapper: ({ children }) => <Tree>{children}</Tree> },
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
    const result = render(
      <Tree>
        <TreeItem value="1" itemType="leaf">
          Default TreeItem
        </TreeItem>
      </Tree>,
    );
    expect(result.container.firstChild).toMatchSnapshot();
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
    expect(handleOpenChange).not.toHaveBeenCalled();
  });

  it('should set the level CSS variable via inline style for levels greater than 10', () => {
    const depth = 12;
    const openItems: string[] = [];
    const renderNestedTree = (current: number): React.ReactElement => {
      if (current > 1) {
        openItems.push(`item-${current}`);
      }
      return (
        <TreeItem value={`item-${current}`} itemType={current === 1 ? 'leaf' : 'branch'}>
          <span>{`level ${current}`}</span>
          {current > 1 ? <Tree>{renderNestedTree(current - 1)}</Tree> : null}
        </TreeItem>
      );
    };
    const treeContent = renderNestedTree(depth);

    const result = render(<Tree defaultOpenItems={openItems}>{treeContent}</Tree>);

    const treeItems = result.container.querySelectorAll<HTMLElement>(`.${treeItemClassNames.root}`);
    expect(treeItems).toHaveLength(depth);

    // Levels 1..10 are handled by static classes and should not set the inline CSS variable
    // Levels > 10 fall back to an inline CSS variable for the indentation
    treeItems.forEach(item => {
      const ariaLevel = Number(item.getAttribute('aria-level'));
      const inlineLevel = item.style.getPropertyValue(treeItemLevelToken);
      if (ariaLevel > 10) {
        expect(inlineLevel).toBe(String(ariaLevel));
      } else {
        expect(inlineLevel).toBe('');
      }
    });
  });
});
