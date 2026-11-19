import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { isConformant } from '../../../testing/isConformant';
import { Tree } from '../Tree';
import { TreeItem } from './TreeItem';
import { TreeItemLayout } from '../TreeItemLayout/TreeItemLayout';

const TreeWrapper = ({ children }: { children?: React.ReactNode }) => <Tree aria-label="Tree">{children}</Tree>;

describe('TreeItem', () => {
  isConformant({
    Component: TreeItem,
    displayName: 'TreeItem',
    requiredProps: { itemType: 'leaf', children: 'Item' },
    renderOptions: { wrapper: TreeWrapper },
    getTargetElement: renderResult => renderResult.getByRole('treeitem'),
    disabledTests: ['has-top-level-file-extra', 'consistent-callback-args'],
  });

  it('forwards ref, className and style to the root element', () => {
    const ref = React.createRef<HTMLDivElement>();

    render(
      <TreeItem ref={ref} itemType="leaf" className="custom" style={{ marginBlockStart: '4px' }}>
        <TreeItemLayout>Item</TreeItemLayout>
      </TreeItem>,
      { wrapper: TreeWrapper },
    );

    const item = screen.getByRole('treeitem');
    expect(ref.current).toBe(item);
    expect(item).toHaveClass('custom');
    expect(item).toHaveStyle({ marginBlockStart: '4px' });
  });

  describe('disabled', () => {
    it('disables the item and descendants without disabling siblings', () => {
      const onOpenChange = jest.fn();
      const onClick = jest.fn();
      render(
        <Tree aria-label="Tree" defaultOpenItems={['branch']} onOpenChange={onOpenChange} selectionMode="multiselect">
          <TreeItem disabled itemType="branch" value="branch" onClick={onClick}>
            <TreeItemLayout>Branch</TreeItemLayout>
            <Tree>
              <TreeItem itemType="leaf" value="child" disabled={false}>
                <TreeItemLayout>Child</TreeItemLayout>
              </TreeItem>
            </Tree>
          </TreeItem>
          <TreeItem itemType="branch" value="sibling">
            <TreeItemLayout>Sibling</TreeItemLayout>
          </TreeItem>
        </Tree>,
      );
      const branch = screen.getByText('Branch').closest('[role="treeitem"]')!;
      fireEvent.click(branch);
      expect(onClick).not.toHaveBeenCalled();
      expect(onOpenChange).not.toHaveBeenCalled();
      expect(branch).toHaveAttribute('aria-disabled', 'true');
      expect(screen.getByText('Child').closest('[role="treeitem"]')).toHaveAttribute('data-disabled', '');
      expect(screen.getByRole('checkbox', { name: 'Child' })).toBeDisabled();
      expect(screen.getByRole('checkbox', { name: 'Sibling' })).not.toBeDisabled();
      fireEvent.click(screen.getByText('Sibling'));
      expect(onOpenChange).toHaveBeenCalledTimes(1);
    });

    it.each([true, 'true'] as const)('supports aria-disabled=%s without the disabled prop', ariaDisabled => {
      const onClick = jest.fn();
      render(
        <TreeItem itemType="leaf" aria-disabled={ariaDisabled} onClick={onClick}>
          <TreeItemLayout>Item</TreeItemLayout>
        </TreeItem>,
        { wrapper: TreeWrapper },
      );
      fireEvent.click(screen.getByRole('treeitem'));
      expect(screen.getByRole('treeitem')).toHaveAttribute('data-disabled', '');
      expect(screen.getByText('Item').parentElement).toHaveAttribute('data-disabled', '');
      expect(onClick).not.toHaveBeenCalled();
    });

    it.each(['ArrowDown', 'Home', 'End', 'i', 'Enter', ' ', 'ArrowLeft', 'ArrowRight'])(
      'calls onKeyDown once for %s and respects defaultPrevented',
      key => {
        const onKeyDown = jest.fn(event => event.preventDefault());
        const onNavigation = jest.fn();
        const onOpenChange = jest.fn();
        render(
          <Tree aria-label="Tree" onNavigation={onNavigation} onOpenChange={onOpenChange}>
            <TreeItem disabled itemType="branch" value="item" onKeyDown={onKeyDown}>
              <TreeItemLayout>Item</TreeItemLayout>
            </TreeItem>
          </Tree>,
        );
        fireEvent.keyDown(screen.getByRole('treeitem'), { key });
        expect(onKeyDown).toHaveBeenCalledTimes(1);
        expect(onNavigation).not.toHaveBeenCalled();
        expect(onOpenChange).not.toHaveBeenCalled();
      },
    );

    it.each(['ArrowLeft', 'ArrowRight'])('leaves Alt+%s to the browser on items and actions', key => {
      const onNavigation = jest.fn();
      const onKeyDown = jest.fn();
      render(
        <Tree aria-label="Tree" navigationMode="treegrid" onNavigation={onNavigation}>
          <TreeItem disabled itemType="branch" value="item" onKeyDown={onKeyDown}>
            <TreeItemLayout actions={{ visible: true, children: <button>Action</button> }}>Item</TreeItemLayout>
          </TreeItem>
        </Tree>,
      );
      for (const target of [screen.getByRole('treeitem'), screen.getByRole('button')]) {
        expect(fireEvent.keyDown(target, { key, altKey: true })).toBe(true);
      }
      expect(onKeyDown).toHaveBeenCalledTimes(2);
      expect(onNavigation).not.toHaveBeenCalled();
    });

    it('leaves custom actions consumer-owned and navigable in treegrid mode', () => {
      const onAction = jest.fn();
      render(
        <Tree aria-label="Tree" navigationMode="treegrid">
          <TreeItem disabled itemType="branch" value="item">
            <TreeItemLayout actions={{ visible: true, children: <button onClick={onAction}>Action</button> }}>
              Item
            </TreeItemLayout>
          </TreeItem>
        </Tree>,
      );
      screen.getByRole('treeitem').focus();
      fireEvent.keyDown(screen.getByRole('treeitem'), { key: 'ArrowRight' });
      expect(screen.getByRole('button')).toHaveFocus();
      fireEvent.click(screen.getByRole('button'));
      expect(onAction).toHaveBeenCalledTimes(1);
      expect(screen.getByRole('treeitem')).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('data-item-type', () => {
    it.each(['leaf', 'branch'] as const)('reflects %s', itemType => {
      render(<TreeItem itemType={itemType}>Item</TreeItem>, { wrapper: TreeWrapper });

      expect(screen.getByRole('treeitem')).toHaveAttribute('data-item-type', itemType);
    });

    it('cannot be misrepresented by the consumer', () => {
      render(<TreeItem itemType="branch" {...{ 'data-item-type': 'leaf' }} />, { wrapper: TreeWrapper });

      expect(screen.getByRole('treeitem')).toHaveAttribute('data-item-type', 'branch');
    });
  });

  describe('data-open', () => {
    it('is absent on a closed branch and set on an open branch', () => {
      render(
        <TreeItem itemType="branch" value="branch">
          <TreeItemLayout>Branch</TreeItemLayout>
          <Tree>
            <TreeItem itemType="leaf" value="leaf">
              <TreeItemLayout>Leaf</TreeItemLayout>
            </TreeItem>
          </Tree>
        </TreeItem>,
        { wrapper: TreeWrapper },
      );

      const branch = screen.getByText('Branch').closest('[role="treeitem"]')!;
      expect(branch).not.toHaveAttribute('data-open');

      fireEvent.click(branch);
      expect(branch).toHaveAttribute('data-open', '');
      expect(screen.getByText('Leaf').closest('[role="treeitem"]')).not.toHaveAttribute('data-open');

      fireEvent.click(branch);
      expect(branch).not.toHaveAttribute('data-open');
    });

    it('is never set on a leaf', () => {
      render(<TreeItem itemType="leaf" open />, { wrapper: TreeWrapper });

      expect(screen.getByRole('treeitem')).not.toHaveAttribute('data-open');
    });

    it('cannot be misrepresented by the consumer', () => {
      render(<TreeItem itemType="branch" {...{ 'data-open': '' }} />, { wrapper: TreeWrapper });

      expect(screen.getByRole('treeitem')).not.toHaveAttribute('data-open');
    });
  });

  describe('data-checked', () => {
    it('is absent when unchecked and set when checked', () => {
      const SelectableTree = () => {
        const [checkedItems, setCheckedItems] = React.useState<Map<string | number, boolean | 'mixed'>>();
        return (
          <Tree
            aria-label="Tree"
            selectionMode="multiselect"
            checkedItems={checkedItems}
            onCheckedChange={(_, data) => setCheckedItems(data.checkedItems)}
          >
            <TreeItem itemType="leaf" value="item">
              <TreeItemLayout>Item</TreeItemLayout>
            </TreeItem>
          </Tree>
        );
      };
      render(<SelectableTree />);

      const item = screen.getByRole('treeitem');
      expect(item).not.toHaveAttribute('data-checked');

      fireEvent.click(screen.getByRole('checkbox'));
      expect(item).toHaveAttribute('data-checked', '');

      fireEvent.click(screen.getByRole('checkbox'));
      expect(item).not.toHaveAttribute('data-checked');
    });

    it('is mixed when partially checked', () => {
      render(
        <Tree aria-label="Tree" selectionMode="multiselect" checkedItems={[['item', 'mixed']]}>
          <TreeItem itemType="branch" value="item">
            <TreeItemLayout>Item</TreeItemLayout>
          </TreeItem>
        </Tree>,
      );

      expect(screen.getByRole('treeitem')).toHaveAttribute('data-checked', 'mixed');
    });

    it('cannot be misrepresented by the consumer', () => {
      render(<TreeItem itemType="leaf" {...{ 'data-checked': '' }} />, { wrapper: TreeWrapper });

      expect(screen.getByRole('treeitem')).not.toHaveAttribute('data-checked');
    });
  });

  it('activates with Enter', () => {
    const onClick = jest.fn();
    render(
      <TreeItem itemType="leaf" onClick={onClick}>
        <TreeItemLayout>Item</TreeItemLayout>
      </TreeItem>,
      { wrapper: TreeWrapper },
    );

    fireEvent.keyDown(screen.getByRole('treeitem'), { key: 'Enter' });

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('fires onOpenChange for a branch', () => {
    const onOpenChange = jest.fn();
    render(
      <TreeItem itemType="branch" value="branch" onOpenChange={onOpenChange}>
        <TreeItemLayout>Branch</TreeItemLayout>
      </TreeItem>,
      { wrapper: TreeWrapper },
    );

    fireEvent.click(screen.getByRole('treeitem'));

    expect(onOpenChange).toHaveBeenCalledWith(expect.any(Object), expect.objectContaining({ open: true }));
  });
});
