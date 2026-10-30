import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useTreeBase_unstable } from './useTree';
import { useTreeContextValues_unstable } from './useTreeContextValues';
import { renderTree_unstable } from './renderTree';
import type { TreeBaseProps } from './Tree.types';
import { TreeItem } from '../TreeItem/TreeItem';
import { useTreeItemLayoutBase_unstable } from '../TreeItemLayout/useTreeItemLayout';
import { renderTreeItemLayout_unstable } from '../TreeItemLayout/renderTreeItemLayout';
import type { TreeItemLayoutBaseProps } from '../TreeItemLayout/TreeItemLayout.types';

const BaseTree: ForwardRefComponent<TreeBaseProps> = React.forwardRef((props, ref) => {
  const state = useTreeBase_unstable(props, ref);
  const contextValues = useTreeContextValues_unstable(state);
  return renderTree_unstable(state, contextValues);
});

const BaseTreeItemLayout: ForwardRefComponent<TreeItemLayoutBaseProps> = React.forwardRef((props, ref) => {
  const state = useTreeItemLayoutBase_unstable(props, ref);
  return renderTreeItemLayout_unstable(state);
});

const getItem = (text: string) => screen.getByText(text).closest<HTMLElement>('[role="treeitem"]')!;

describe('useTreeBase_unstable', () => {
  it('resolves the root tree without design state or a collapse motion', () => {
    const { result } = renderHook(() => useTreeBase_unstable({ 'aria-label': 'Tree' }, React.createRef()));

    expect(result.current.root.role).toBe('tree');
    expect(result.current.contextType).toBe('root');
    expect(result.current).not.toHaveProperty('appearance');
    expect(result.current).not.toHaveProperty('size');
    expect(result.current).not.toHaveProperty('collapseMotion');
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    expect(result.current.components).toEqual({ root: 'div' });
  });

  it('provides the default design values through context', () => {
    const { result } = renderHook(() => {
      const state = useTreeBase_unstable({ 'aria-label': 'Tree' }, React.createRef());
      return useTreeContextValues_unstable(state);
    });

    expect(result.current.tree).toMatchObject({ appearance: 'subtle', size: 'medium' });
  });

  it('does not render a closed subtree and renders it once opened', () => {
    render(
      <BaseTree aria-label="Tree">
        <TreeItem itemType="branch" value="1">
          <BaseTreeItemLayout>parent</BaseTreeItemLayout>
          <BaseTree>
            <TreeItem itemType="leaf" value="1-1">
              <BaseTreeItemLayout>child</BaseTreeItemLayout>
            </TreeItem>
          </BaseTree>
        </TreeItem>
      </BaseTree>,
    );

    expect(screen.queryByRole('group')).toBeNull();
    expect(screen.queryByText('child')).toBeNull();

    fireEvent.click(getItem('parent'));

    expect(screen.getByRole('group')).toBeTruthy();
    expect(getItem('child').getAttribute('aria-level')).toBe('2');
  });

  describe('navigation without Tabster', () => {
    const renderTree = (props: Partial<TreeBaseProps> = {}) =>
      render(
        <BaseTree aria-label="Tree" {...props}>
          <TreeItem itemType="branch" value="1">
            <BaseTreeItemLayout>item 1</BaseTreeItemLayout>
            <BaseTree>
              <TreeItem itemType="leaf" value="1-1">
                <BaseTreeItemLayout>item 1-1</BaseTreeItemLayout>
              </TreeItem>
            </BaseTree>
          </TreeItem>
          <TreeItem itemType="leaf" value="2">
            <BaseTreeItemLayout>item 2</BaseTreeItemLayout>
          </TreeItem>
          <TreeItem itemType="leaf" value="3">
            <BaseTreeItemLayout>item 3</BaseTreeItemLayout>
          </TreeItem>
        </BaseTree>,
      );

    it('applies a roving tab index to the first item', () => {
      renderTree();

      expect(getItem('item 1').tabIndex).toBe(0);
      expect(getItem('item 2').tabIndex).toBe(-1);
    });

    it('moves focus with arrow keys, Home, End and type ahead', () => {
      renderTree();

      getItem('item 1').focus();
      fireEvent.keyDown(getItem('item 1'), { key: 'ArrowDown' });
      expect(document.activeElement).toBe(getItem('item 2'));
      expect(getItem('item 2').tabIndex).toBe(0);
      expect(getItem('item 1').tabIndex).toBe(-1);

      fireEvent.keyDown(getItem('item 2'), { key: 'End' });
      expect(document.activeElement).toBe(getItem('item 3'));

      fireEvent.keyDown(getItem('item 3'), { key: 'Home' });
      expect(document.activeElement).toBe(getItem('item 1'));

      fireEvent.keyDown(getItem('item 1'), { key: 'i' });
      expect(document.activeElement).toBe(getItem('item 2'));
    });

    it('opens a branch with ArrowRight and walks into and out of it', () => {
      renderTree();

      getItem('item 1').focus();
      fireEvent.keyDown(getItem('item 1'), { key: 'ArrowRight' });
      expect(getItem('item 1').getAttribute('aria-expanded')).toBe('true');

      fireEvent.keyDown(getItem('item 1'), { key: 'ArrowRight' });
      expect(document.activeElement).toBe(getItem('item 1-1'));

      fireEvent.keyDown(getItem('item 1-1'), { key: 'ArrowLeft' });
      expect(document.activeElement).toBe(getItem('item 1'));
    });

    it('keeps the roving tab index in sync with programmatic focus', () => {
      renderTree();

      getItem('item 3').focus();

      expect(getItem('item 3').tabIndex).toBe(0);
      expect(getItem('item 1').tabIndex).toBe(-1);
    });

    it('keeps the roving tab index in sync with focus inside a shadow root', () => {
      const host = document.createElement('div');
      document.body.appendChild(host);
      const container = document.createElement('div');
      host.attachShadow({ mode: 'open' }).appendChild(container);
      const { unmount } = render(
        <BaseTree aria-label="Tree">
          <TreeItem itemType="leaf" value="1">
            <BaseTreeItemLayout>item 1</BaseTreeItemLayout>
          </TreeItem>
          <TreeItem itemType="leaf" value="2">
            <BaseTreeItemLayout>item 2</BaseTreeItemLayout>
          </TreeItem>
        </BaseTree>,
        { container },
      );
      const [item1, item2] = Array.from(container.querySelectorAll<HTMLElement>('[role="treeitem"]'));

      item2.focus();

      expect(item2.tabIndex).toBe(0);
      expect(item1.tabIndex).toBe(-1);

      unmount();
      host.remove();
    });

    it('moves focus into the actions and back in treegrid mode', () => {
      render(
        <BaseTree aria-label="Tree" navigationMode="treegrid">
          <TreeItem itemType="leaf" value="1">
            <BaseTreeItemLayout
              actions={{
                visible: true,
                children: (
                  <>
                    <input type="hidden" />
                    <button hidden>Hidden</button>
                    <div aria-hidden="true">
                      <button>Aria hidden</button>
                    </div>
                    {/* React 17 and 18 do not forward `inert`, so it is set through a ref */}
                    <div ref={element => element?.setAttribute('inert', '')}>
                      <button>Inert</button>
                    </div>
                    <div style={{ visibility: 'hidden' }}>
                      <button>Visibility hidden</button>
                    </div>
                    <button disabled tabIndex={0}>
                      Disabled
                    </button>
                    <button>Edit</button>
                  </>
                ),
              }}
            >
              item 1
            </BaseTreeItemLayout>
          </TreeItem>
        </BaseTree>,
      );

      const item = getItem('item 1');
      item.focus();
      fireEvent.keyDown(item, { key: 'ArrowRight' });
      expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Edit' }));

      fireEvent.keyDown(screen.getByRole('button', { name: 'Edit' }), { key: 'ArrowLeft' });
      expect(document.activeElement).toBe(item);
    });

    it('moves focus into an action that overrides a hidden ancestor visibility in treegrid mode', () => {
      render(
        <BaseTree aria-label="Tree" navigationMode="treegrid">
          <TreeItem itemType="leaf" value="1">
            <BaseTreeItemLayout
              actions={{
                visible: true,
                children: (
                  <div style={{ visibility: 'hidden' }}>
                    <button>Hidden</button>
                    <button style={{ visibility: 'visible' }}>Edit</button>
                  </div>
                ),
              }}
            >
              item 1
            </BaseTreeItemLayout>
          </TreeItem>
        </BaseTree>,
      );

      const item = getItem('item 1');
      item.focus();
      fireEvent.keyDown(item, { key: 'ArrowRight' });

      expect(document.activeElement).toBe(screen.getByText('Edit'));
    });

    it('keeps the roving tab index in sync when a consumer stops focus propagation', () => {
      render(
        <BaseTree aria-label="Tree">
          <TreeItem itemType="leaf" value="1">
            <BaseTreeItemLayout>item 1</BaseTreeItemLayout>
          </TreeItem>
          <TreeItem itemType="leaf" value="2" onFocus={event => event.stopPropagation()}>
            <BaseTreeItemLayout>item 2</BaseTreeItemLayout>
          </TreeItem>
        </BaseTree>,
      );

      getItem('item 2').focus();

      expect(getItem('item 2').tabIndex).toBe(0);
      expect(getItem('item 1').tabIndex).toBe(-1);
    });

    it('finds actions whose role is overridden, and ignores toolbars outside the actions', () => {
      const actionsRef = React.createRef<HTMLDivElement>();
      render(
        <BaseTree aria-label="Tree" navigationMode="treegrid">
          <TreeItem itemType="leaf" value="1">
            <BaseTreeItemLayout
              actions={{ role: 'group', ref: actionsRef, visible: true, children: <button>Edit</button> }}
            >
              item 1
            </BaseTreeItemLayout>
          </TreeItem>
          <TreeItem itemType="leaf" value="2">
            <BaseTreeItemLayout main={{ role: 'toolbar' }}>
              <button>Main</button>
            </BaseTreeItemLayout>
          </TreeItem>
        </BaseTree>,
      );

      const item = getItem('item 1');
      item.focus();
      fireEvent.keyDown(item, { key: 'ArrowRight' });
      expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Edit' }));
      expect(actionsRef.current?.getAttribute('role')).toBe('group');

      fireEvent.keyDown(screen.getByRole('button', { name: 'Edit' }), { key: 'ArrowLeft' });
      expect(document.activeElement).toBe(item);

      const mainItem = getItem('Main');
      mainItem.focus();
      fireEvent.keyDown(mainItem, { key: 'ArrowRight' });
      expect(document.activeElement).toBe(mainItem);
    });

    it('moves focus into a contenteditable action in treegrid mode', () => {
      render(
        <BaseTree aria-label="Tree" navigationMode="treegrid">
          <TreeItem itemType="leaf" value="1">
            <BaseTreeItemLayout
              actions={{
                visible: true,
                children: <div contentEditable={true} data-testid="editor" />,
              }}
            >
              item 1
            </BaseTreeItemLayout>
          </TreeItem>
        </BaseTree>,
      );

      const item = getItem('item 1');
      item.focus();
      fireEvent.keyDown(item, { key: 'ArrowRight' });

      expect(document.activeElement).toBe(screen.getByTestId('editor'));
    });

    it('skips the content of a closed details action in treegrid mode', () => {
      render(
        <BaseTree aria-label="Tree" navigationMode="treegrid">
          <TreeItem itemType="leaf" value="1">
            <BaseTreeItemLayout
              actions={{
                visible: true,
                children: (
                  <>
                    <details>
                      <summary tabIndex={-1}>More</summary>
                      <button>Hidden</button>
                    </details>
                    <button>Edit</button>
                  </>
                ),
              }}
            >
              item 1
            </BaseTreeItemLayout>
          </TreeItem>
        </BaseTree>,
      );

      const item = getItem('item 1');
      item.focus();
      fireEvent.keyDown(item, { key: 'ArrowRight' });

      expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Edit' }));
    });

    it('moves focus into the summary of a details action in treegrid mode', () => {
      render(
        <BaseTree aria-label="Tree" navigationMode="treegrid">
          <TreeItem itemType="leaf" value="1">
            <BaseTreeItemLayout
              actions={{
                visible: true,
                children: (
                  <details>
                    <summary>Options</summary>
                    <summary>Not a summary</summary>
                  </details>
                ),
              }}
            >
              item 1
            </BaseTreeItemLayout>
          </TreeItem>
        </BaseTree>,
      );

      const item = getItem('item 1');
      item.focus();
      fireEvent.keyDown(item, { key: 'ArrowRight' });

      expect(document.activeElement).toBe(screen.getByText('Options'));
    });
  });
});
