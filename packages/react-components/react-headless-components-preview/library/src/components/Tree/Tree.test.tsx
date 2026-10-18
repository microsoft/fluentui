import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Tree } from './Tree';
import { TreeItem } from './TreeItem/TreeItem';
import { TreeItemLayout } from './TreeItemLayout/TreeItemLayout';
import type { TreeProps } from './Tree.types';

const getItem = (text: string) => screen.getByText(text).closest<HTMLElement>('[role="treeitem"]')!;

const NestedTree = (props: Partial<TreeProps>) => (
  <Tree aria-label="Files" {...props}>
    <TreeItem itemType="branch" value="docs">
      <TreeItemLayout>Docs</TreeItemLayout>
      <Tree>
        <TreeItem itemType="leaf" value="readme">
          <TreeItemLayout>README</TreeItemLayout>
        </TreeItem>
      </Tree>
    </TreeItem>
    <TreeItem itemType="leaf" value="license">
      <TreeItemLayout>LICENSE</TreeItemLayout>
    </TreeItem>
    <TreeItem itemType="leaf" value="package">
      <TreeItemLayout>package.json</TreeItemLayout>
    </TreeItem>
  </Tree>
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
    const ref = React.createRef<HTMLElement>();

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
      expect(getItem('README')).toHaveFocus();
    });
  });

  describe('selection', () => {
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
