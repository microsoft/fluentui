import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { Checkbox } from '@fluentui/react-checkbox';
import type { TabsterDOMAttribute } from '@fluentui/react-tabster';
import { List } from '../List/List';
import { useListItem_unstable } from './useListItem';

describe('useListItem_unstable', () => {
  it('applies Tabster navigation to focusable list items', () => {
    const { result } = renderHook(() => useListItem_unstable({}, React.createRef()), {
      wrapper: ({ children }: React.PropsWithChildren) => <List navigationMode="items">{children}</List>,
    });

    expect((result.current.root as Partial<TabsterDOMAttribute>)['data-tabster']).toContain('mover');
  });

  it('does not apply arrow navigation to non focusable list items', () => {
    const { result } = renderHook(() => useListItem_unstable({}, React.createRef()), {
      wrapper: ({ children }: React.PropsWithChildren) => <List>{children}</List>,
    });

    expect((result.current.root as Partial<TabsterDOMAttribute>)['data-tabster']).not.toContain('mover');
  });

  it('uses a Fluent Checkbox for the checkmark', () => {
    const { result } = renderHook(() => useListItem_unstable({}, React.createRef()), {
      wrapper: ({ children }: React.PropsWithChildren) => <List selectionMode="single">{children}</List>,
    });

    // eslint-disable-next-line @typescript-eslint/no-deprecated
    expect(result.current.components.checkmark).toBe(Checkbox);
    expect(result.current.checkmark?.tabIndex).toBe(-1);
  });
});
