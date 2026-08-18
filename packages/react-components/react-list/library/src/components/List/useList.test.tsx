import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import type { TabsterDOMAttribute } from '@fluentui/react-tabster';
import { useList_unstable } from './useList';

describe('useList_unstable', () => {
  it('applies Tabster navigation to the list', () => {
    const { result } = renderHook(() =>
      useList_unstable({ navigationMode: 'items' }, React.createRef<HTMLUListElement>()),
    );

    expect((result.current.root as Partial<TabsterDOMAttribute>)['data-tabster']).toContain('mover');
  });
});
