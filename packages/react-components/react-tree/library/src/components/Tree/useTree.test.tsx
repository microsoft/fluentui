import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { Collapse } from '@fluentui/react-motion-components-preview';
import { Tree } from './Tree';
import { useTree_unstable } from './useTree';
import { TreeItem } from '../TreeItem/TreeItem';
import { TreeItemLayout } from '../TreeItemLayout/TreeItemLayout';

describe('useTree_unstable', () => {
  it('resolves the root tree with design defaults and without a collapse motion', () => {
    const { result } = renderHook(() => useTree_unstable({ 'aria-label': 'Tree' }, React.createRef()));

    expect(result.current.root.role).toBe('tree');
    expect(result.current.open).toBe(true);
    expect(result.current.collapseMotion).toBeUndefined();
    expect(result.current).toMatchObject({ appearance: 'subtle', size: 'medium', contextType: 'root' });
  });

  it('resolves a subtree with a Collapse motion', () => {
    const { result } = renderHook(() => useTree_unstable({}, React.createRef()), {
      wrapper: ({ children }: React.PropsWithChildren) => (
        <Tree aria-label="Tree">
          <TreeItem itemType="branch" value="parent" open>
            {children}
          </TreeItem>
        </Tree>
      ),
    });

    expect(result.current.root.role).toBe('group');
    expect(result.current.open).toBe(true);
    expect(result.current.contextType).toBe('subtree');
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    expect(result.current.components.collapseMotion).toBe(Collapse);
    expect(result.current.collapseMotion).toBeDefined();
  });
});

describe('Tree behavior contract', () => {
  const renderNestedTree = (props: Partial<React.ComponentProps<typeof Tree>> = {}) =>
    render(
      <Tree aria-label="Tree" {...props}>
        <TreeItem itemType="branch" value="1">
          <TreeItemLayout>level 1, item 1</TreeItemLayout>
          <Tree>
            <TreeItem itemType="leaf" value="1-1">
              <TreeItemLayout>level 2, item 1</TreeItemLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
        <TreeItem itemType="leaf" value="2">
          <TreeItemLayout>level 1, item 2</TreeItemLayout>
        </TreeItem>
        <TreeItem itemType="leaf" value="3">
          <TreeItemLayout>level 1, item 3</TreeItemLayout>
        </TreeItem>
      </Tree>,
    );

  const getItem = (text: string) => screen.getByText(text).closest<HTMLElement>('[role="treeitem"]')!;

  it('applies a roving tab index to the first item', () => {
    renderNestedTree();

    expect(getItem('level 1, item 1').tabIndex).toBe(0);
    expect(getItem('level 1, item 2').tabIndex).toBe(-1);
    expect(getItem('level 1, item 3').tabIndex).toBe(-1);
  });

  it('does not render a closed subtree', () => {
    renderNestedTree();

    expect(screen.queryByRole('group')).toBeNull();
    expect(screen.queryByText('level 2, item 1')).toBeNull();
  });

  it('moves focus and the roving tab index with ArrowDown, ArrowUp, End and Home', () => {
    renderNestedTree();

    getItem('level 1, item 1').focus();
    fireEvent.keyDown(getItem('level 1, item 1'), { key: 'ArrowDown' });
    expect(document.activeElement).toBe(getItem('level 1, item 2'));
    expect(getItem('level 1, item 2').tabIndex).toBe(0);
    expect(getItem('level 1, item 1').tabIndex).toBe(-1);

    fireEvent.keyDown(getItem('level 1, item 2'), { key: 'End' });
    expect(document.activeElement).toBe(getItem('level 1, item 3'));

    fireEvent.keyDown(getItem('level 1, item 3'), { key: 'ArrowUp' });
    expect(document.activeElement).toBe(getItem('level 1, item 2'));

    fireEvent.keyDown(getItem('level 1, item 2'), { key: 'Home' });
    expect(document.activeElement).toBe(getItem('level 1, item 1'));
  });

  it('opens a branch with ArrowRight, moves into it, and walks back with ArrowLeft', () => {
    renderNestedTree();

    getItem('level 1, item 1').focus();
    fireEvent.keyDown(getItem('level 1, item 1'), { key: 'ArrowRight' });
    expect(getItem('level 1, item 1').getAttribute('aria-expanded')).toBe('true');
    expect(screen.getByRole('group')).toBeTruthy();

    fireEvent.keyDown(getItem('level 1, item 1'), { key: 'ArrowRight' });
    expect(document.activeElement).toBe(getItem('level 2, item 1'));

    fireEvent.keyDown(getItem('level 2, item 1'), { key: 'ArrowLeft' });
    expect(document.activeElement).toBe(getItem('level 1, item 1'));

    fireEvent.keyDown(getItem('level 1, item 1'), { key: 'ArrowLeft' });
    expect(getItem('level 1, item 1').getAttribute('aria-expanded')).toBe('false');
  });

  it('moves focus with type ahead', () => {
    render(
      <Tree aria-label="Tree">
        <TreeItem itemType="leaf" value="apple">
          <TreeItemLayout>Apple</TreeItemLayout>
        </TreeItem>
        <TreeItem itemType="leaf" value="banana">
          <TreeItemLayout>Banana</TreeItemLayout>
        </TreeItem>
      </Tree>,
    );

    getItem('Apple').focus();
    fireEvent.keyDown(getItem('Apple'), { key: 'b' });
    expect(document.activeElement).toBe(getItem('Banana'));
  });

  it('moves focus and the roving tab index to a clicked item', () => {
    renderNestedTree();

    fireEvent.click(getItem('level 1, item 3'));

    expect(document.activeElement).toBe(getItem('level 1, item 3'));
    expect(getItem('level 1, item 3').tabIndex).toBe(0);
    expect(getItem('level 1, item 1').tabIndex).toBe(-1);
  });

  it('lets onNavigation prevent the default navigation', () => {
    const onNavigation = jest.fn(event => event.preventDefault());
    renderNestedTree({ onNavigation });

    getItem('level 1, item 1').focus();
    fireEvent.keyDown(getItem('level 1, item 1'), { key: 'ArrowDown' });

    expect(onNavigation).toHaveBeenCalledWith(expect.any(Object), expect.objectContaining({ type: 'ArrowDown' }));
    expect(document.activeElement).toBe(getItem('level 1, item 1'));
  });
});
