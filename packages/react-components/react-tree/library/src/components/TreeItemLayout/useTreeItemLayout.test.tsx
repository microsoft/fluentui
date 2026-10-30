import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { Checkbox } from '@fluentui/react-checkbox';
import { Radio } from '@fluentui/react-radio';
import type { TabsterDOMAttribute } from '@fluentui/react-tabster';
import type { SelectionMode } from '@fluentui/react-utilities';
import { Tree } from '../Tree/Tree';
import { TreeItem } from '../TreeItem/TreeItem';
import { TreeItemChevron } from '../TreeItemChevron';
import { useTreeItemLayout_unstable } from './useTreeItemLayout';
import type { TreeItemLayoutProps } from './TreeItemLayout.types';

const renderLayoutHook = (
  props: TreeItemLayoutProps = {},
  { selectionMode, itemType = 'leaf' }: { selectionMode?: SelectionMode; itemType?: 'leaf' | 'branch' } = {},
) =>
  renderHook(() => useTreeItemLayout_unstable(props, React.createRef()), {
    wrapper: ({ children }: React.PropsWithChildren) => (
      <Tree aria-label="Tree" selectionMode={selectionMode}>
        <TreeItem itemType={itemType} value="item">
          {children}
        </TreeItem>
      </Tree>
    ),
  });

describe('useTreeItemLayout_unstable', () => {
  it('uses a Fluent Checkbox for the selector in multiselect mode', () => {
    const { result } = renderLayoutHook({}, { selectionMode: 'multiselect' });

    // eslint-disable-next-line @typescript-eslint/no-deprecated
    expect(result.current.components.selector).toBe(Checkbox);
    expect(result.current.selector?.tabIndex).toBe(-1);
  });

  it('uses a Fluent Radio for the selector in single selection mode', () => {
    const { result } = renderLayoutHook({}, { selectionMode: 'single' });

    // eslint-disable-next-line @typescript-eslint/no-deprecated
    expect(result.current.components.selector).toBe(Radio);
  });

  it('does not render a selector without selection', () => {
    const { result } = renderLayoutHook();

    expect(result.current.selector).toBeUndefined();
  });

  it('links an explicitly provided selector to the main content even without selection', () => {
    const { result } = renderLayoutHook({ selector: {} });

    expect(result.current.selector).toBeDefined();
    expect(result.current.main.id).toBeDefined();
    expect(result.current.selector?.['aria-labelledby']).toBe(result.current.main.id);
  });

  it('renders the chevron as the default expand icon of a branch', () => {
    const { result } = renderLayoutHook({}, { itemType: 'branch' });

    expect(React.isValidElement(result.current.expandIcon?.children)).toBe(true);
    expect((result.current.expandIcon?.children as React.ReactElement).type).toBe(TreeItemChevron);
    expect(result.current.expandIcon?.['aria-hidden']).toBe(true);
  });

  it('does not render an expand icon for a leaf', () => {
    const { result } = renderLayoutHook();

    expect(result.current.expandIcon).toBeUndefined();
  });

  it('applies Tabster arrow navigation and the toolbar role to visible actions', () => {
    const { result } = renderLayoutHook({ actions: { visible: true, children: 'actions' } });

    expect(result.current.actions?.role).toBe('toolbar');
    expect((result.current.actions as Partial<TabsterDOMAttribute>)['data-tabster']).toContain('mover');
  });

  it('provides a small button context to the actions', () => {
    const { result } = renderLayoutHook();

    expect(result.current.buttonContextValue).toEqual({ size: 'small' });
  });
});
