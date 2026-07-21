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

    it.each([
      {
        case: 'TreeItemLayout',
        layout: <TreeItemLayout main={{ id: 'custom-main' }}>Item 1</TreeItemLayout>,
        mainId: 'custom-main',
        accessibleName: 'Item 1',
      },
      {
        case: 'TreeItemPersonaLayout',
        layout: <TreeItemPersonaLayout main={{ id: 'custom-persona-main' }}>Jane Doe</TreeItemPersonaLayout>,
        mainId: 'custom-persona-main',
        accessibleName: 'Jane Doe',
      },
    ] as const)('preserves a consumer-provided main ID ($case)', ({ layout, mainId, accessibleName }) => {
      render(
        <Tree aria-label="Tree" selectionMode="multiselect">
          <TreeItem itemType="leaf" value="item1">
            {layout}
          </TreeItem>
        </Tree>,
      );

      expect(screen.getByRole('checkbox', { name: accessibleName }).getAttribute('aria-labelledby')).toBe(mainId);
      expect(document.getElementById(mainId)?.textContent).toBe(accessibleName);
    });

    it('preserves a consumer-provided layout ID', () => {
      render(
        <Tree aria-label="Tree" selectionMode="multiselect">
          <TreeItem itemType="leaf" value="item1">
            <TreeItemLayout id="custom-layout">Item 1</TreeItemLayout>
          </TreeItem>
        </Tree>,
      );

      const layout = document.getElementById('custom-layout');
      const selector = screen.getByRole('checkbox', { name: 'Item 1' });
      const mainId = selector.getAttribute('aria-labelledby');

      expect(layout?.classList.contains('fui-TreeItemLayout')).toBe(true);
      expect(mainId).not.toBe('custom-layout');
      expect(document.getElementById(mainId ?? '')?.textContent).toBe('Item 1');
    });

    it('preserves a consumer-provided selector aria-label', () => {
      render(
        <Tree aria-label="Tree" selectionMode="multiselect">
          <TreeItem itemType="leaf" value="item1">
            <TreeItemLayout selector={{ 'aria-label': 'Custom selector label' }}>Item 1</TreeItemLayout>
          </TreeItem>
        </Tree>,
      );

      const selector = screen.getByRole('checkbox', { name: 'Custom selector label' });
      expect(selector.getAttribute('aria-label')).toBe('Custom selector label');
      expect(selector.hasAttribute('aria-labelledby')).toBe(false);
    });

    it('preserves a consumer-provided selector aria-labelledby', () => {
      render(
        <>
          <span id="external-selector-label">External selector label</span>
          <Tree aria-label="Tree" selectionMode="multiselect">
            <TreeItem itemType="leaf" value="item1">
              <TreeItemLayout selector={{ 'aria-labelledby': 'external-selector-label' }}>Item 1</TreeItemLayout>
            </TreeItem>
          </Tree>
        </>,
      );

      expect(screen.getByRole('checkbox', { name: 'External selector label' }).getAttribute('aria-labelledby')).toBe(
        'external-selector-label',
      );
    });
  });
});
