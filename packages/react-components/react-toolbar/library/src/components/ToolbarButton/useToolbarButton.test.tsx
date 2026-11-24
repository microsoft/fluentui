import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { useToolbarButton_unstable } from './useToolbarButton';
import { useToolbarButtonStyles_unstable } from './useToolbarButtonStyles.styles';

describe('useToolbarButton_unstable', () => {
  let ref: React.RefObject<HTMLButtonElement | null>;

  beforeEach(() => {
    ref = React.createRef<HTMLButtonElement>();
  });

  it('returns the styled state while preserving user slot classes', () => {
    const { result } = renderHook(() => {
      const state = useToolbarButton_unstable(
        { vertical: true, className: 'custom-root', icon: { className: 'custom-icon' } },
        ref,
      );
      return { state, styled: useToolbarButtonStyles_unstable(state) };
    });

    expect(result.current.styled).toBe(result.current.state);
    expect(result.current.state.root.className).toContain('custom-root');
    expect(result.current.state.icon?.className).toContain('custom-icon');
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
