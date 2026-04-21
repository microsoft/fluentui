import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import type { ToolbarProps } from './Toolbar.types';
import { useToolbar_unstable } from './useToolbar';

describe('useToolbar_unstable', () => {
  let ref: React.RefObject<HTMLDivElement | null>;

  beforeEach(() => {
    ref = React.createRef<HTMLDivElement | null>();
  });

  it('should return state with default props', () => {
    const { result } = renderHook(() => useToolbar_unstable({}, ref));

    expect(result.current).toMatchObject({
      vertical: false,
      size: 'medium',
      checkedValues: {},
      components: {
        root: 'div',
      },
      root: expect.objectContaining({
        role: 'toolbar',
        ref,
      }),
    });
  });

  it('should reflect custom props in state', () => {
    const props = {
      checkedValues: { group1: ['item1', 'item2'] },
      size: 'small',
      vertical: true,
    } satisfies ToolbarProps;

    const { result } = renderHook(() => useToolbar_unstable(props, ref));

    expect(result.current).toMatchObject({
      checkedValues: props.checkedValues,
      size: props.size,
      vertical: props.vertical,
      root: expect.objectContaining({
        role: 'toolbar',
        'aria-orientation': 'vertical',
        ref,
      }),
    });
  });
});
