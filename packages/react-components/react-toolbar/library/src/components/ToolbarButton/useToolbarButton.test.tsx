import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { useToolbarButton_unstable } from './useToolbarButton';

describe('useToolbarButton_unstable', () => {
  let ref: React.RefObject<HTMLButtonElement | null>;

  beforeEach(() => {
    ref = React.createRef<HTMLButtonElement>();
  });

  it('should return state with default props', () => {
    const { result } = renderHook(() => useToolbarButton_unstable({}, ref));

    expect(result.current).toMatchObject({
      appearance: 'subtle',
      size: 'medium',
      shape: 'rounded',
      vertical: false,
      root: expect.objectContaining({
        type: 'button',
        ref,
      }),
    });
  });

  it('should reflect custom props in state', () => {
    const props = { appearance: 'primary', disabled: true, vertical: true } as const;

    const { result } = renderHook(() => useToolbarButton_unstable(props, ref));

    expect(result.current).toMatchObject({
      appearance: props.appearance,
      size: 'medium',
      shape: 'rounded',
      vertical: props.vertical,
      disabled: props.disabled,
    });
  });
});
