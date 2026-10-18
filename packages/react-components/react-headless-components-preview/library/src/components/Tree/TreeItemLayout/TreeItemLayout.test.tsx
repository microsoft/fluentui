import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import type { SelectionMode } from '@fluentui/react-utilities';
import { isConformant } from '../../../testing/isConformant';
import { Tree } from '../Tree';
import type { TreeNavigationMode } from '../Tree.types';
import { TreeItem } from '../TreeItem/TreeItem';
import { TreeItemLayout } from './TreeItemLayout';

const renderInTree = (
  layout: React.ReactElement,
  {
    selectionMode,
    navigationMode,
    itemType = 'leaf',
  }: { selectionMode?: SelectionMode; navigationMode?: TreeNavigationMode; itemType?: 'leaf' | 'branch' } = {},
) =>
  render(
    <Tree aria-label="Tree" selectionMode={selectionMode} navigationMode={navigationMode}>
      <TreeItem itemType={itemType} value="item">
        {layout}
      </TreeItem>
    </Tree>,
  );

const TreeItemWrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <Tree aria-label="Tree">
    <TreeItem itemType="leaf">{children}</TreeItem>
  </Tree>
);

describe('TreeItemLayout', () => {
  isConformant({
    Component: TreeItemLayout,
    displayName: 'TreeItemLayout',
    renderOptions: { wrapper: TreeItemWrapper },
    getTargetElement: renderResult => renderResult.getByRole('treeitem').firstElementChild as HTMLElement,
    requiredProps: {
      iconBefore: 'iconBefore',
      iconAfter: 'iconAfter',
      aside: 'aside',
    },
    disabledTests: ['has-top-level-file-extra'],
  });

  it('renders the main content and the decorative slots', () => {
    renderInTree(
      <TreeItemLayout iconBefore="before" iconAfter="after" aside="aside">
        Item
      </TreeItemLayout>,
    );

    const main = screen.getByText('Item');
    expect(main.previousElementSibling).toHaveTextContent('before');
    expect(main.nextElementSibling).toHaveTextContent('after');
    expect(screen.getByText('aside')).toBeInTheDocument();
  });

  it('forwards ref, className and style to the root element', () => {
    const ref = React.createRef<HTMLElement>();
    renderInTree(
      <TreeItemLayout ref={ref} className="custom" style={{ marginBlockStart: '4px' }}>
        Item
      </TreeItemLayout>,
    );

    const root = screen.getByText('Item').parentElement!;
    expect(ref.current).toBe(root);
    expect(root).toHaveClass('custom');
    expect(root).toHaveStyle({ marginBlockStart: '4px' });
  });

  describe('selector', () => {
    it('is not rendered without selection', () => {
      renderInTree(<TreeItemLayout>Item</TreeItemLayout>);

      expect(screen.queryByRole('checkbox')).toBeNull();
      expect(screen.queryByRole('radio')).toBeNull();
    });

    it.each([
      ['multiselect', 'checkbox'],
      ['single', 'radio'],
    ] as const)('renders a native %s input labelled by the main content', (selectionMode, type) => {
      renderInTree(<TreeItemLayout>Item</TreeItemLayout>, { selectionMode });

      const selector = screen.getByRole(type, { name: 'Item' });
      expect(selector.tagName).toBe('INPUT');
      expect(selector).toHaveAttribute('type', type);
      expect(selector).toHaveAttribute('tabindex', '-1');
      expect(selector.closest('.fui-Checkbox, .fui-Radio')).toBeNull();
    });

    it('keeps a consumer provided accessible name', () => {
      renderInTree(<TreeItemLayout selector={{ 'aria-label': 'Select item' }}>Item</TreeItemLayout>, {
        selectionMode: 'multiselect',
      });

      expect(screen.getByRole('checkbox', { name: 'Select item' })).not.toHaveAttribute('aria-labelledby');
    });

    it('can be disabled by the consumer', () => {
      renderInTree(<TreeItemLayout selector={null}>Item</TreeItemLayout>, { selectionMode: 'multiselect' });

      expect(screen.queryByRole('checkbox')).toBeNull();
    });
  });

  describe('expandIcon', () => {
    it('renders an empty, hidden expand icon for a branch', () => {
      const { container } = renderInTree(<TreeItemLayout>Branch</TreeItemLayout>, { itemType: 'branch' });

      const expandIcon = container.querySelector('[aria-hidden="true"]');
      expect(expandIcon).toBeInTheDocument();
      expect(expandIcon).toBeEmptyDOMElement();
      expect(container.querySelector('svg')).toBeNull();
    });

    it('renders consumer provided content', () => {
      renderInTree(<TreeItemLayout expandIcon="▸">Branch</TreeItemLayout>, { itemType: 'branch' });

      expect(screen.getByText('▸')).toHaveAttribute('aria-hidden', 'true');
    });

    it('is not rendered for a leaf', () => {
      const { container } = renderInTree(<TreeItemLayout>Leaf</TreeItemLayout>);

      expect(container.querySelector('[aria-hidden="true"]')).toBeNull();
    });
  });

  describe('actions', () => {
    it('are hidden until the tree item is hovered or focused, replacing the aside', () => {
      renderInTree(
        <TreeItemLayout aside="aside" actions={<button>Rename</button>}>
          Item
        </TreeItemLayout>,
      );

      expect(screen.queryByRole('toolbar')).toBeNull();
      expect(screen.getByText('aside')).toBeInTheDocument();

      fireEvent.mouseOver(screen.getByRole('treeitem'));

      expect(screen.getByRole('toolbar')).toBeInTheDocument();
      expect(screen.queryByText('aside')).toBeNull();

      fireEvent.mouseOut(screen.getByRole('treeitem'));

      expect(screen.queryByRole('toolbar')).toBeNull();
    });

    it('render a wrapping toolbar focus group in tree mode', () => {
      renderInTree(
        <TreeItemLayout actions={{ visible: true, children: <button>Rename</button> }}>Item</TreeItemLayout>,
      );

      const toolbar = screen.getByRole('toolbar');
      expect(toolbar).toHaveAttribute('focusgroup', 'toolbar inline wrap');
      expect(toolbar).not.toHaveAttribute('data-tabster');
    });

    it('render a non wrapping toolbar focus group in treegrid mode', () => {
      renderInTree(
        <TreeItemLayout actions={{ visible: true, children: <button>Rename</button> }}>Item</TreeItemLayout>,
        {
          navigationMode: 'treegrid',
        },
      );

      expect(screen.getByRole('toolbar')).toHaveAttribute('focusgroup', 'toolbar inline');
    });
  });
});
