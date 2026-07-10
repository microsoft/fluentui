import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Tree } from './Tree';
import { TreeItem } from '../TreeItem/TreeItem';
import { TreeItemLayout } from '../TreeItemLayout/TreeItemLayout';
import { TreeItemPersonaLayout } from '../TreeItemPersonaLayout/TreeItemPersonaLayout';

describe('Tree', () => {
  isConformant({
    Component: Tree,
    displayName: 'Tree',
    disabledTests: ['consistent-callback-args'],
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<Tree>Default Tree</Tree>);
    expect(result.container).toMatchSnapshot();
  });
  it('should sync open state between Tree and TreeItem onOpenChange callback', () => {
    const handleOpenChange = jest.fn();

    const result = render(
      <Tree aria-label="Default" onOpenChange={handleOpenChange}>
        <TreeItem data-testid="tree-item" itemType="branch" open={true} onOpenChange={handleOpenChange}>
          parent
          <Tree>
            <TreeItem itemType="leaf">leaf</TreeItem>
          </Tree>
        </TreeItem>
      </Tree>,
    );

    result.getByTestId('tree-item').click();

    expect(handleOpenChange).toHaveBeenNthCalledWith(1, expect.any(Object), expect.objectContaining({ open: false }));

    expect(handleOpenChange).toHaveBeenNthCalledWith(2, expect.any(Object), expect.objectContaining({ open: false }));
  });

  describe('selection control accessibility', () => {
    it.each([
      {
        case: 'multiselect',
        selectionMode: 'multiselect',
        role: 'checkbox',
        layout: <TreeItemLayout>Item 1</TreeItemLayout>,
        accessibleName: 'Item 1',
      },
      {
        case: 'single',
        selectionMode: 'single',
        role: 'radio',
        layout: <TreeItemLayout>Item 1</TreeItemLayout>,
        accessibleName: 'Item 1',
      },
      {
        case: 'TreeItemPersonaLayout',
        selectionMode: 'multiselect',
        role: 'checkbox',
        layout: <TreeItemPersonaLayout>Jane Doe</TreeItemPersonaLayout>,
        accessibleName: 'Jane Doe',
      },
    ] as const)('exposes a named $role selector ($case)', ({ selectionMode, role, layout, accessibleName }) => {
      render(
        <Tree aria-label="Tree" selectionMode={selectionMode}>
          <TreeItem itemType="leaf" value="item1">
            {layout}
          </TreeItem>
        </Tree>,
      );

      expect(screen.getByRole(role, { name: accessibleName })).toBeTruthy();
    });
  });
});
