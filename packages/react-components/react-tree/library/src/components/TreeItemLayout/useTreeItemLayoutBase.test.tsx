import * as React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import type { SelectionMode } from '@fluentui/react-utilities';
import { Tree } from '../Tree/Tree';
import type { TreeProps } from '../Tree/Tree.types';
import { TreeItem } from '../TreeItem/TreeItem';
import { useTreeItemLayoutBase_unstable } from './useTreeItemLayout';
import { renderTreeItemLayout_unstable } from './renderTreeItemLayout';
import type { TreeItemLayoutBaseProps } from './TreeItemLayout.types';

const renderLayoutHook = (
  props: TreeItemLayoutBaseProps = {},
  { selectionMode, itemType = 'leaf' }: { selectionMode?: SelectionMode; itemType?: 'leaf' | 'branch' } = {},
) =>
  renderHook(() => useTreeItemLayoutBase_unstable(props, React.createRef()), {
    wrapper: ({ children }: React.PropsWithChildren) => (
      <Tree aria-label="Tree" selectionMode={selectionMode}>
        <TreeItem itemType={itemType} value="item">
          {children}
        </TreeItem>
      </Tree>
    ),
  });

const BaseTreeItemLayout = React.forwardRef<HTMLElement, TreeItemLayoutBaseProps>((props, ref) =>
  renderTreeItemLayout_unstable(useTreeItemLayoutBase_unstable(props, ref)),
);

describe('useTreeItemLayoutBase_unstable', () => {
  it('renders a native checkbox selector in multiselect mode', () => {
    const { result } = renderLayoutHook({}, { selectionMode: 'multiselect' });

    // eslint-disable-next-line @typescript-eslint/no-deprecated
    expect(result.current.components.selector).toBe('input');
    expect(result.current.selector).toMatchObject({ type: 'checkbox', checked: false, tabIndex: -1 });
    expect(result.current.selector?.['aria-labelledby']).toBe(result.current.main.id);
  });

  it('renders a native radio selector in single selection mode', () => {
    const { result } = renderLayoutHook({}, { selectionMode: 'single' });

    expect(result.current.selector?.type).toBe('radio');
  });

  it('does not render a selector without selection or when disabled by the consumer', () => {
    expect(renderLayoutHook().result.current.selector).toBeUndefined();
    expect(
      renderLayoutHook({ selector: null }, { selectionMode: 'multiselect' }).result.current.selector,
    ).toBeUndefined();
  });

  it('renders the expand icon of a branch without default content', () => {
    const { result } = renderLayoutHook({}, { itemType: 'branch' });

    expect(result.current.expandIcon).toBeDefined();
    expect(result.current.expandIcon?.children).toBeUndefined();
    expect(result.current.expandIcon?.['aria-hidden']).toBe(true);
  });

  it('renders visible actions as a toolbar without Tabster attributes', () => {
    const { result } = renderLayoutHook({ actions: { visible: true, children: 'actions' } });

    expect(result.current.actions?.role).toBe('toolbar');
    expect(result.current.actions).not.toHaveProperty('data-tabster');
    expect(result.current.actions).not.toHaveProperty('visible');
    expect(result.current.actions).not.toHaveProperty('onVisibilityChange');
  });

  it('carries no button context', () => {
    const { result } = renderLayoutHook();

    expect(result.current).not.toHaveProperty('buttonContextValue');
  });

  it.each([
    ['multiselect', 'checkbox'],
    ['single', 'radio'],
  ] as const)('toggles the %s selection through the native %s', (selectionMode, role) => {
    const onCheckedChange = jest.fn();
    const ControlledTree = () => {
      const [checkedItems, setCheckedItems] = React.useState<TreeProps['checkedItems']>([]);
      return (
        <Tree
          aria-label="Tree"
          selectionMode={selectionMode}
          checkedItems={checkedItems}
          onCheckedChange={(event, data) => {
            onCheckedChange(event, data);
            setCheckedItems([[data.value, data.checked]]);
          }}
        >
          <TreeItem itemType="leaf" value="item">
            <BaseTreeItemLayout>Item</BaseTreeItemLayout>
          </TreeItem>
        </Tree>
      );
    };
    render(<ControlledTree />);

    const selector = screen.getByRole(role, { name: 'Item' }) as HTMLInputElement;
    expect(selector.checked).toBe(false);

    fireEvent.click(selector);

    expect(onCheckedChange).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({ value: 'item', checked: true }),
    );
    expect(selector.checked).toBe(true);
  });

  it('reflects a mixed state through the indeterminate property of the native checkbox', () => {
    render(
      <Tree aria-label="Tree" selectionMode="multiselect" checkedItems={[['item', 'mixed']]}>
        <TreeItem itemType="leaf" value="item">
          <BaseTreeItemLayout>Item</BaseTreeItemLayout>
        </TreeItem>
      </Tree>,
    );

    const checkbox = screen.getByRole('checkbox', { name: 'Item' }) as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(true);
    expect(checkbox.hasAttribute('aria-checked')).toBe(false);
  });

  it('restores the indeterminate state when a selection change is rejected', () => {
    const onChange = jest.fn();
    const onCheckedChange = jest.fn();
    render(
      <Tree
        aria-label="Tree"
        selectionMode="multiselect"
        checkedItems={[['item', 'mixed']]}
        onCheckedChange={onCheckedChange}
      >
        <TreeItem itemType="leaf" value="item">
          <BaseTreeItemLayout selector={{ onChange }}>Item</BaseTreeItemLayout>
        </TreeItem>
      </Tree>,
    );
    const checkbox = screen.getByRole('checkbox', { name: 'Item' }) as HTMLInputElement;

    fireEvent.click(checkbox);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onCheckedChange).toHaveBeenCalledTimes(1);
    expect(checkbox.indeterminate).toBe(true);

    fireEvent.keyDown(screen.getByRole('treeitem'), { key: ' ' });

    expect(onCheckedChange).toHaveBeenCalledTimes(2);
    expect(checkbox.indeterminate).toBe(true);
  });

  it('applies the indeterminate state when a selector is mounted after the layout', () => {
    const ControlledTreeItemLayout = ({ showSelector }: { showSelector: boolean }) => (
      <Tree aria-label="Tree" selectionMode="multiselect" checkedItems={[['item', 'mixed']]}>
        <TreeItem itemType="leaf" value="item">
          <BaseTreeItemLayout selector={showSelector ? {} : null}>Item</BaseTreeItemLayout>
        </TreeItem>
      </Tree>
    );
    const { rerender } = render(<ControlledTreeItemLayout showSelector={false} />);

    expect(screen.queryByRole('checkbox')).toBeNull();

    rerender(<ControlledTreeItemLayout showSelector={true} />);

    expect((screen.getByRole('checkbox', { name: 'Item' }) as HTMLInputElement).indeterminate).toBe(true);
  });

  it('merges a consumer selector ref with the internal selection refs', () => {
    const onCheckedChange = jest.fn();
    const selectorRef = jest.fn();
    render(
      <Tree aria-label="Tree" selectionMode="multiselect" onCheckedChange={onCheckedChange}>
        <TreeItem itemType="leaf" value="item">
          <BaseTreeItemLayout selector={{ ref: selectorRef }}>Item</BaseTreeItemLayout>
        </TreeItem>
      </Tree>,
    );

    const selector = screen.getByRole('checkbox', { name: 'Item' });
    expect(selectorRef).toHaveBeenCalledWith(selector);

    fireEvent.keyDown(screen.getByRole('treeitem'), { key: ' ' });

    expect(onCheckedChange).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({ value: 'item', checked: true }),
    );
  });

  it('shares a single set of document modality listeners across layouts with actions', () => {
    const addEventListener = jest.spyOn(document, 'addEventListener');
    const removeEventListener = jest.spyOn(document, 'removeEventListener');
    const countKeyDownListeners = (spy: jest.SpyInstance) =>
      spy.mock.calls.filter(([type, , options]) => type === 'keydown' && options === true).length;

    const { unmount } = render(
      <Tree aria-label="Tree">
        {['1', '2', '3'].map(value => (
          <TreeItem key={value} itemType="leaf" value={value}>
            <BaseTreeItemLayout actions={<button>Edit {value}</button>}>Item {value}</BaseTreeItemLayout>
          </TreeItem>
        ))}
      </Tree>,
    );

    expect(countKeyDownListeners(addEventListener)).toBe(1);

    unmount();

    expect(countKeyDownListeners(removeEventListener)).toBe(1);

    addEventListener.mockRestore();
    removeEventListener.mockRestore();
  });

  it('keeps keyboard focused actions visible when the pointer moves out of the item', () => {
    render(
      <Tree aria-label="Tree">
        <TreeItem itemType="leaf" value="1">
          <BaseTreeItemLayout actions={<button>Edit</button>}>Item 1</BaseTreeItemLayout>
        </TreeItem>
      </Tree>,
    );
    const item = screen.getByRole('treeitem');

    fireEvent.keyDown(document, { key: 'Tab' });
    act(() => item.focus());
    act(() => screen.getByRole('button', { name: 'Edit' }).focus());

    // Pointer movement alone does not switch the modality, only pointer activation does
    fireEvent.mouseMove(document);
    fireEvent.mouseOut(item, { relatedTarget: document.body });

    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Edit' }));

    fireEvent.mouseDown(document);
    fireEvent.mouseOut(item, { relatedTarget: document.body });

    expect(screen.queryByRole('button', { name: 'Edit' })).toBeNull();
  });
});
