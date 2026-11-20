import * as React from 'react';
import { render } from '@testing-library/react';
import { Tree } from './Tree';
import { FlatTree } from '../FlatTree/FlatTree';
import { TreeItem } from '../TreeItem/TreeItem';
import { TreeItemLayout } from '../TreeItemLayout/TreeItemLayout';
import { TreeItemPersonaLayout } from '../TreeItemPersonaLayout/TreeItemPersonaLayout';

const attributeNames = (element: Element) => element.getAttributeNames().sort();

describe('Tree DOM attributes', () => {
  it('does not render component props as DOM attributes', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { getByTestId } = render(
      <Tree
        appearance="subtle-alpha"
        aria-label="tree"
        checkedItems={['branch']}
        data-testid="tree"
        defaultOpenItems={['branch']}
        navigationMode="tree"
        onCheckedChange={jest.fn()}
        onNavigation={jest.fn()}
        onOpenChange={jest.fn()}
        selectionMode="multiselect"
        size="small"
      >
        <TreeItem
          data-testid="branch"
          itemType="branch"
          onOpenChange={jest.fn()}
          open
          parentValue={undefined}
          value="branch"
        >
          <TreeItemLayout
            actions={<button>action</button>}
            aside="aside"
            data-testid="layout"
            expandIcon="e"
            iconAfter="a"
            iconBefore="b"
            main="main"
          />
          <Tree collapseMotion={null} data-testid="subtree">
            <TreeItem itemType="leaf" value="leaf">
              <TreeItemPersonaLayout data-testid="persona" description="description" media="m">
                leaf
              </TreeItemPersonaLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
      </Tree>,
    );

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
    expect(attributeNames(getByTestId('tree'))).toEqual([
      'aria-label',
      'aria-multiselectable',
      'class',
      'data-testid',
      'role',
    ]);
    expect(attributeNames(getByTestId('branch'))).toEqual([
      'aria-checked',
      'aria-expanded',
      'aria-level',
      'class',
      'data-fui-tree-item-value',
      'data-testid',
      'role',
      'tabindex',
    ]);
    expect(attributeNames(getByTestId('layout'))).toEqual(['class', 'data-testid']);
    expect(attributeNames(getByTestId('subtree'))).toEqual(['class', 'data-testid', 'role']);
    expect(attributeNames(getByTestId('persona'))).toEqual(['class', 'data-testid']);
  });

  it('does not render FlatTree component props as DOM attributes', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { getByTestId } = render(
      <FlatTree
        appearance="transparent"
        aria-label="flat tree"
        checkedItems={['leaf']}
        data-testid="flat-tree"
        navigationMode="treegrid"
        onCheckedChange={jest.fn()}
        onNavigation={jest.fn()}
        onOpenChange={jest.fn()}
        openItems={[]}
        selectionMode="single"
        size="small"
      >
        <TreeItem aria-level={1} aria-posinset={1} aria-setsize={1} itemType="leaf" value="leaf">
          <TreeItemLayout>leaf</TreeItemLayout>
        </TreeItem>
      </FlatTree>,
    );

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
    expect(attributeNames(getByTestId('flat-tree'))).toEqual(['aria-label', 'class', 'data-testid', 'role']);
  });
});
