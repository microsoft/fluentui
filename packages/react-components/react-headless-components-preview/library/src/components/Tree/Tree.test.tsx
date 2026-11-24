import * as React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { isConformant } from '../../testing/isConformant';
import { Tree } from './Tree';
import { TreeItem } from './TreeItem/TreeItem';
import { TreeItemLayout } from './TreeItemLayout/TreeItemLayout';
import type { TreeProps } from './Tree.types';
import { useTreeItemContext } from './TreeItem/useTreeItem';
import type { TreeItemContextValues } from './TreeItem/TreeItem.types';

const getItem = (text: string) => screen.getByText(text).closest<HTMLElement>('[role="treeitem"]')!;

const NestedTree = React.forwardRef<HTMLDivElement, Partial<TreeProps> & { disabled?: boolean }>(
  ({ disabled, ...props }, ref) => (
    <Tree ref={ref} aria-label="Files" {...props}>
      <TreeItem disabled={disabled} itemType="branch" value="docs">
        <TreeItemLayout>Docs</TreeItemLayout>
        <Tree>
          <TreeItem itemType="leaf" value="readme">
            <TreeItemLayout>README</TreeItemLayout>
          </TreeItem>
        </Tree>
      </TreeItem>
      <TreeItem disabled={disabled} itemType="leaf" value="license">
        <TreeItemLayout>LICENSE</TreeItemLayout>
      </TreeItem>
      <TreeItem disabled={disabled} itemType="leaf" value="package">
        <TreeItemLayout>package.json</TreeItemLayout>
      </TreeItem>
    </Tree>
  ),
);

/**
 * Checked items are controlled only, this harness keeps them in sync with `onCheckedChange`.
 */
const SelectableTree = ({ onCheckedChange, ...props }: Partial<TreeProps>) => {
  const [checkedItems, setCheckedItems] = React.useState<TreeProps['checkedItems']>([]);

  return (
    <NestedTree
      {...props}
      checkedItems={checkedItems}
      onCheckedChange={(event, data) => {
        onCheckedChange?.(event, data);
        setCheckedItems(data.checkedItems);
      }}
    />
  );
};

describe('Tree', () => {
  isConformant({
    Component: Tree,
    displayName: 'Tree',
    requiredProps: { 'aria-label': 'Tree' },
    disabledTests: ['consistent-callback-args'],
  });

  describe('disabled', () => {
    it.each(['single', 'multiselect'] as const)(
      'has no accessibility violations in disabled %s mode',
      async selectionMode => {
        const { container } = render(
          <main>
            <NestedTree disabled defaultOpenItems={['docs']} selectionMode={selectionMode} />
          </main>,
        );

        expect(await axe(container)).toHaveNoViolations();
      },
    );

    it('inherits through items and layouts across subtrees and updates when re-enabled', () => {
      const { rerender } = render(<NestedTree disabled defaultOpenItems={['docs']} selectionMode="multiselect" />);
      const expectDisabled = (disabled: boolean) => {
        for (const element of [
          ...screen.getAllByRole('treeitem'),
          screen.getByText('Docs').parentElement!,
          screen.getByText('README').parentElement!,
        ]) {
          expect(element.hasAttribute('data-disabled')).toBe(disabled);
        }
        for (const item of screen.getAllByRole('treeitem')) {
          expect(item.getAttribute('aria-disabled') === 'true').toBe(disabled);
        }
        for (const selector of screen.getAllByRole('checkbox')) {
          expect((selector as HTMLInputElement).disabled).toBe(disabled);
        }
        expect(screen.getByRole('tree')).not.toHaveAttribute('data-disabled');
        expect(screen.getByRole('group')).not.toHaveAttribute('data-disabled');
      };

      expectDisabled(true);
      rerender(<NestedTree disabled={false} defaultOpenItems={['docs']} selectionMode="multiselect" />);
      expectDisabled(false);
    });

    it.each(['single', 'multiselect'] as const)('blocks disclosure and %s selection', selectionMode => {
      const onOpenChange = jest.fn();
      const onCheckedChange = jest.fn();
      render(
        <NestedTree
          disabled
          selectionMode={selectionMode}
          onOpenChange={onOpenChange}
          onCheckedChange={onCheckedChange}
        />,
      );

      fireEvent.click(getItem('Docs'));
      fireEvent.click(getItem('Docs').querySelector('[aria-hidden="true"]')!);
      for (const key of ['Enter', ' ', 'ArrowRight', 'ArrowLeft']) {
        fireEvent.keyDown(getItem('Docs'), { key });
      }
      userEvent.click(screen.getAllByRole(selectionMode === 'single' ? 'radio' : 'checkbox')[0]);
      fireEvent.change(getItem('Docs'));

      expect(onOpenChange).not.toHaveBeenCalled();
      expect(onCheckedChange).not.toHaveBeenCalled();
      expect(getItem('Docs')).toHaveAttribute('aria-expanded', 'false');
    });

    it('keeps disabled items in roving navigation and explores open branches without closing them', () => {
      render(<NestedTree disabled defaultOpenItems={['docs']} />);

      getItem('Docs').focus();
      expect(getItem('Docs')).toHaveAttribute('tabindex', '0');
      fireEvent.keyDown(getItem('Docs'), { key: 'ArrowRight' });
      expect(getItem('README')).toHaveFocus();
      fireEvent.keyDown(getItem('README'), { key: 'ArrowLeft' });
      expect(getItem('Docs')).toHaveFocus();
      fireEvent.keyDown(getItem('Docs'), { key: 'ArrowLeft' });
      expect(getItem('Docs')).toHaveAttribute('aria-expanded', 'true');
      fireEvent.keyDown(getItem('Docs'), { key: 'ArrowDown' });
      expect(getItem('README')).toHaveFocus();
      fireEvent.keyDown(getItem('README'), { key: 'End' });
      expect(getItem('package.json')).toHaveFocus();
      fireEvent.keyDown(getItem('package.json'), { key: 'ArrowUp' });
      expect(getItem('LICENSE')).toHaveFocus();
      fireEvent.keyDown(getItem('LICENSE'), { key: 'Home' });
      expect(getItem('Docs')).toHaveFocus();
      fireEvent.keyDown(getItem('Docs'), { key: 'p' });
      expect(getItem('package.json')).toHaveFocus();
    });

    it('does not allow descendants or state attributes to override inherited disabled state', () => {
      render(
        <Tree
          aria-label="Files"
          selectionMode="multiselect"
          defaultOpenItems={['branch']}
          {...{ 'data-disabled': undefined }}
        >
          <TreeItem itemType="branch" value="branch" disabled aria-disabled={false} {...{ 'data-disabled': undefined }}>
            <TreeItemLayout selector={{ disabled: false }} {...{ 'data-disabled': undefined }}>
              Branch
            </TreeItemLayout>
            <Tree aria-disabled={false}>
              <TreeItem itemType="leaf" disabled={false} aria-disabled={false} {...{ 'data-disabled': undefined }}>
                <TreeItemLayout>Leaf</TreeItemLayout>
              </TreeItem>
            </Tree>
          </TreeItem>
        </Tree>,
      );

      for (const element of [
        ...screen.getAllByRole('treeitem'),
        screen.getByText('Branch').parentElement!,
        screen.getByText('Leaf').parentElement!,
      ]) {
        expect(element).toHaveAttribute('data-disabled', '');
      }
      expect(screen.getByRole('checkbox', { name: 'Branch' })).toBeDisabled();
    });

    it.each([false, true])(
      'keeps item context scoped to the same parent before and inside a child (parent disabled=%s)',
      parentDisabled => {
        const observed: Record<string, TreeItemContextValues['treeItem']> = {};
        const ReadState = ({ id }: { id: string }) => {
          observed[id] = useTreeItemContext(context => context);
          return null;
        };
        render(
          <Tree aria-label="Files" defaultOpenItems={['branch']}>
            <TreeItem itemType="branch" value="branch" disabled={parentDisabled}>
              <TreeItemLayout>
                Branch
                <ReadState id="parent" />
              </TreeItemLayout>
              <Tree aria-disabled>
                <ReadState id="before-child" />
                <TreeItem itemType="leaf" value="child" disabled={!parentDisabled}>
                  <TreeItemLayout>
                    Child
                    <ReadState id="child" />
                  </TreeItemLayout>
                </TreeItem>
              </Tree>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemLayout>Enabled</TreeItemLayout>
            </TreeItem>
          </Tree>,
        );

        expect(screen.getByRole('tree')).not.toHaveAttribute('data-disabled');
        expect(getItem('Branch').hasAttribute('data-disabled')).toBe(parentDisabled);
        expect(getItem('Enabled')).not.toHaveAttribute('data-disabled');
        expect(observed['before-child']).toBe(observed.parent);
        expect(observed['before-child']).toMatchObject({ value: 'branch', open: true, disabled: parentDisabled });
        expect(observed['before-child'].treeItemRef?.current).toBe(getItem('Branch'));
        expect(observed.child).toMatchObject({ value: 'child', open: false, disabled: true });
        expect(observed.child.treeItemRef?.current).toBe(getItem('Child'));
        expect(getItem('Child')).toHaveAttribute('data-disabled', '');
      },
    );

    it('continues to accept consumer-controlled open and checked state', () => {
      const { rerender } = render(<NestedTree disabled openItems={[]} selectionMode="multiselect" checkedItems={[]} />);
      rerender(<NestedTree disabled openItems={['docs']} selectionMode="multiselect" checkedItems={['readme']} />);

      expect(getItem('Docs')).toHaveAttribute('aria-expanded', 'true');
      expect(getItem('README')).toHaveAttribute('aria-checked', 'true');
      expect(screen.getByRole('checkbox', { name: 'README' })).toBeChecked();
      expect(screen.getByRole('checkbox', { name: 'README' })).toBeDisabled();
    });
  });

  it('renders the tree semantics without Fluent class names', () => {
    render(<NestedTree />);

    const tree = screen.getByRole('tree', { name: 'Files' });

    expect(tree.tagName).toBe('DIV');
    expect(tree.className).toBe('');
    expect(screen.getAllByRole('treeitem')).toHaveLength(3);
    expect(getItem('Docs')).toHaveAttribute('aria-level', '1');
    expect(getItem('Docs')).toHaveAttribute('aria-expanded', 'false');
  });

  it('forwards ref, className and style to the root element', () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<NestedTree ref={ref} className="custom" style={{ marginBlockStart: '4px' }} />);

    const tree = screen.getByRole('tree');
    expect(ref.current).toBe(tree);
    expect(tree).toHaveClass('custom');
    expect(tree).toHaveStyle({ marginBlockStart: '4px' });
  });

  describe('data-navigation-mode', () => {
    it('defaults to tree', () => {
      render(<NestedTree />);

      expect(screen.getByRole('tree')).toHaveAttribute('data-navigation-mode', 'tree');
    });

    it('reflects treegrid', () => {
      render(<NestedTree navigationMode="treegrid" />);

      expect(screen.getByRole('tree')).toHaveAttribute('data-navigation-mode', 'treegrid');
    });

    it('is absent on subtrees', () => {
      render(<NestedTree defaultOpenItems={['docs']} />);

      expect(screen.getByRole('group')).not.toHaveAttribute('data-navigation-mode');
    });

    it('cannot be misrepresented by the consumer', () => {
      render(<NestedTree navigationMode="treegrid" {...{ 'data-navigation-mode': 'tree' }} />);

      expect(screen.getByRole('tree')).toHaveAttribute('data-navigation-mode', 'treegrid');
    });
  });

  describe('data-selection-mode', () => {
    it('is absent without selection', () => {
      render(<NestedTree />);

      expect(screen.getByRole('tree')).not.toHaveAttribute('data-selection-mode');
    });

    it.each(['single', 'multiselect'] as const)('reflects %s', selectionMode => {
      render(<NestedTree selectionMode={selectionMode} defaultOpenItems={['docs']} />);

      expect(screen.getByRole('tree')).toHaveAttribute('data-selection-mode', selectionMode);
      expect(screen.getByRole('group')).not.toHaveAttribute('data-selection-mode');
    });

    it('sets aria-multiselectable in multiselect mode', () => {
      render(<NestedTree selectionMode="multiselect" />);

      expect(screen.getByRole('tree')).toHaveAttribute('aria-multiselectable', 'true');
    });
  });

  describe('open state', () => {
    it('does not render a closed subtree', () => {
      render(<NestedTree />);

      expect(screen.queryByRole('group')).toBeNull();
      expect(screen.queryByText('README')).toBeNull();
    });

    it('opens and closes a branch on click (uncontrolled)', () => {
      const onOpenChange = jest.fn();
      render(<NestedTree onOpenChange={onOpenChange} />);

      fireEvent.click(getItem('Docs'));

      expect(onOpenChange).toHaveBeenLastCalledWith(
        expect.any(Object),
        expect.objectContaining({ open: true, value: 'docs', type: 'Click' }),
      );
      expect(getItem('Docs')).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByRole('group')).toBeInTheDocument();
      expect(getItem('README')).toHaveAttribute('aria-level', '2');

      fireEvent.click(getItem('Docs'));

      expect(getItem('Docs')).toHaveAttribute('aria-expanded', 'false');
      expect(screen.queryByRole('group')).toBeNull();
    });

    it('respects controlled open items', () => {
      const onOpenChange = jest.fn();
      render(<NestedTree openItems={['docs']} onOpenChange={onOpenChange} />);

      fireEvent.click(getItem('Docs'));

      expect(onOpenChange).toHaveBeenCalledWith(expect.any(Object), expect.objectContaining({ open: false }));
      expect(getItem('Docs')).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByRole('group')).toBeInTheDocument();
    });
  });

  describe('keyboard navigation', () => {
    it('applies a roving tab index to the first item', () => {
      render(<NestedTree />);

      expect(getItem('Docs')).toHaveAttribute('tabindex', '0');
      expect(getItem('LICENSE')).toHaveAttribute('tabindex', '-1');
    });

    it('moves focus with arrow keys, Home, End and type ahead', () => {
      render(<NestedTree />);

      getItem('Docs').focus();
      fireEvent.keyDown(getItem('Docs'), { key: 'ArrowDown' });
      expect(getItem('LICENSE')).toHaveFocus();
      expect(getItem('LICENSE')).toHaveAttribute('tabindex', '0');
      expect(getItem('Docs')).toHaveAttribute('tabindex', '-1');

      fireEvent.keyDown(getItem('LICENSE'), { key: 'End' });
      expect(getItem('package.json')).toHaveFocus();

      fireEvent.keyDown(getItem('package.json'), { key: 'ArrowUp' });
      expect(getItem('LICENSE')).toHaveFocus();

      fireEvent.keyDown(getItem('LICENSE'), { key: 'Home' });
      expect(getItem('Docs')).toHaveFocus();

      fireEvent.keyDown(getItem('Docs'), { key: 'p' });
      expect(getItem('package.json')).toHaveFocus();
    });

    it('opens, enters, leaves and closes a branch with ArrowRight and ArrowLeft', () => {
      render(<NestedTree />);

      getItem('Docs').focus();
      fireEvent.keyDown(getItem('Docs'), { key: 'ArrowRight' });
      expect(getItem('Docs')).toHaveAttribute('aria-expanded', 'true');

      fireEvent.keyDown(getItem('Docs'), { key: 'ArrowRight' });
      expect(getItem('README')).toHaveFocus();

      fireEvent.keyDown(getItem('README'), { key: 'ArrowLeft' });
      expect(getItem('Docs')).toHaveFocus();

      fireEvent.keyDown(getItem('Docs'), { key: 'ArrowLeft' });
      expect(getItem('Docs')).toHaveAttribute('aria-expanded', 'false');
    });

    it('keeps the roving tab index in sync with programmatic focus', () => {
      render(<NestedTree />);

      getItem('package.json').focus();

      expect(getItem('package.json')).toHaveAttribute('tabindex', '0');
      expect(getItem('Docs')).toHaveAttribute('tabindex', '-1');
    });

    it('lets onNavigation prevent the default navigation', () => {
      render(<NestedTree onNavigation={event => event.preventDefault()} />);

      getItem('Docs').focus();
      fireEvent.keyDown(getItem('Docs'), { key: 'ArrowDown' });

      expect(getItem('Docs')).toHaveFocus();
    });

    it('moves focus into the actions and back in treegrid mode', () => {
      jest.useFakeTimers();
      render(
        <Tree aria-label="Files" navigationMode="treegrid">
          <TreeItem itemType="leaf" value="readme">
            <TreeItemLayout actions={{ visible: true, children: <button>Rename</button> }}>README</TreeItemLayout>
          </TreeItem>
        </Tree>,
      );

      getItem('README').focus();
      fireEvent.keyDown(getItem('README'), { key: 'ArrowRight' });
      expect(screen.getByRole('button', { name: 'Rename' })).toHaveFocus();

      fireEvent.keyDown(screen.getByRole('button', { name: 'Rename' }), { key: 'ArrowLeft' });
      act(() => {
        jest.runOnlyPendingTimers();
      });
      expect(getItem('README')).toHaveFocus();
      jest.useRealTimers();
    });

    it('leaves ArrowLeft to the actions focusgroup and returns to the tree item only when it does not move focus', () => {
      jest.useFakeTimers();
      const onKeyDown = jest.fn();
      const onNavigation = jest.fn();
      render(
        <Tree aria-label="Files" navigationMode="treegrid" onNavigation={onNavigation}>
          <TreeItem itemType="leaf" value="readme" onKeyDown={onKeyDown}>
            <TreeItemLayout
              actions={{
                visible: true,
                children: (
                  <>
                    <button>Rename</button>
                    <button>Delete</button>
                  </>
                ),
              }}
            >
              README
            </TreeItemLayout>
          </TreeItem>
        </Tree>,
      );

      // jsdom has no focusgroup, so its default action of moving focus to the preceding action is emulated
      screen.getByRole('button', { name: 'Delete' }).focus();
      fireEvent.keyDown(screen.getByRole('button', { name: 'Delete' }), { key: 'ArrowLeft' });
      screen.getByRole('button', { name: 'Rename' }).focus();
      act(() => {
        jest.runOnlyPendingTimers();
      });
      expect(screen.getByRole('button', { name: 'Rename' })).toHaveFocus();
      expect(onKeyDown).toHaveBeenCalledTimes(1);
      expect(onNavigation).not.toHaveBeenCalled();

      fireEvent.keyDown(screen.getByRole('button', { name: 'Rename' }), { key: 'ArrowLeft' });
      act(() => {
        jest.runOnlyPendingTimers();
      });
      expect(getItem('README')).toHaveFocus();
      expect(onNavigation).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining({ type: 'ArrowLeft', value: 'readme' }),
      );
      jest.useRealTimers();
    });
    it('returns focus from the actions to the tree item inside a shadow root in treegrid mode', () => {
      jest.useFakeTimers();
      const host = document.createElement('div');
      document.body.appendChild(host);
      const container = document.createElement('div');
      const shadowRoot = host.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(container);
      const { unmount } = render(
        <Tree aria-label="Files" navigationMode="treegrid" defaultOpenItems={['docs']}>
          <TreeItem itemType="branch" value="docs">
            <TreeItemLayout>Docs</TreeItemLayout>
            <Tree>
              <TreeItem itemType="leaf" value="readme">
                <TreeItemLayout actions={{ visible: true, children: <button>Rename</button> }}>README</TreeItemLayout>
              </TreeItem>
            </Tree>
          </TreeItem>
        </Tree>,
        { container },
      );
      const item = container.querySelector<HTMLElement>('[data-fui-tree-item-value="readme"]')!;
      const action = container.querySelector('button')!;

      action.focus();
      fireEvent.keyDown(action, { key: 'ArrowLeft' });
      act(() => {
        jest.runOnlyPendingTimers();
      });

      expect(shadowRoot.activeElement).toBe(item);
      unmount();
      host.remove();
      jest.useRealTimers();
    });
  });

  describe('selection', () => {
    it('returns focus to the tree item when its selector is clicked, so that navigation continues', () => {
      render(<SelectableTree selectionMode="multiselect" />);

      userEvent.click(screen.getByRole('checkbox', { name: 'LICENSE' }));
      expect(getItem('LICENSE')).toHaveFocus();

      fireEvent.keyDown(getItem('LICENSE'), { key: 'ArrowDown' });
      expect(getItem('package.json')).toHaveFocus();
    });

    it('keeps focus where the consumer moved it when the selector click is prevented', () => {
      render(
        <Tree aria-label="Files" selectionMode="multiselect">
          <TreeItem itemType="leaf" value="license">
            <TreeItemLayout selector={{ onClick: event => event.preventDefault() }}>LICENSE</TreeItemLayout>
          </TreeItem>
        </Tree>,
      );

      userEvent.click(screen.getByRole('checkbox', { name: 'LICENSE' }));
      expect(screen.getByRole('checkbox', { name: 'LICENSE' })).toHaveFocus();
    });

    it('checks and unchecks items in multiselect mode', () => {
      const onCheckedChange = jest.fn();
      render(<SelectableTree selectionMode="multiselect" onCheckedChange={onCheckedChange} />);

      const checkbox = screen.getByRole('checkbox', { name: 'LICENSE' });
      fireEvent.click(checkbox);

      expect(onCheckedChange).toHaveBeenLastCalledWith(
        expect.any(Object),
        expect.objectContaining({ value: 'license', checked: true, selectionMode: 'multiselect' }),
      );
      expect(getItem('LICENSE')).toHaveAttribute('aria-checked', 'true');
      expect(checkbox).toBeChecked();

      fireEvent.click(checkbox);

      expect(getItem('LICENSE')).toHaveAttribute('aria-checked', 'false');
      expect(checkbox).not.toBeChecked();
    });

    it('marks a branch as mixed when only some of its children are checked', () => {
      render(<NestedTree selectionMode="multiselect" defaultOpenItems={['docs']} checkedItems={[['docs', 'mixed']]} />);

      expect(getItem('Docs')).toHaveAttribute('aria-checked', 'mixed');
      expect(screen.getByRole('checkbox', { name: 'Docs' })).toBePartiallyChecked();
    });

    it('selects an item with Space in single selection mode', () => {
      const onCheckedChange = jest.fn();
      render(<SelectableTree selectionMode="single" onCheckedChange={onCheckedChange} />);

      fireEvent.keyDown(getItem('LICENSE'), { key: ' ' });

      expect(onCheckedChange).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining({ value: 'license', checked: true, selectionMode: 'single' }),
      );
      expect(getItem('LICENSE')).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByRole('radio', { name: 'LICENSE' })).toBeChecked();
    });

    it('only changes the checked items through onCheckedChange', () => {
      const onCheckedChange = jest.fn();
      render(<NestedTree selectionMode="multiselect" checkedItems={['license']} onCheckedChange={onCheckedChange} />);

      fireEvent.click(screen.getByRole('checkbox', { name: 'LICENSE' }));

      expect(onCheckedChange).toHaveBeenCalledWith(expect.any(Object), expect.objectContaining({ checked: false }));
      expect(getItem('LICENSE')).toHaveAttribute('aria-checked', 'true');
    });
  });
});
