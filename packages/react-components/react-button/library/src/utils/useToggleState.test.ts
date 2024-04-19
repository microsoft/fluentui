import * as React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { useToggleState } from './useToggleState';

describe('useToggleState', () => {
  it('defaults to unchecked', () => {
    const { result } = renderHook(() => useToggleState({}, { root: {} }));

    expect(result.current.checked).toBe(false);
    expect(result.current.root['aria-pressed']).toBe(false);
  });

  it('respects defaultChecked prop', () => {
    const { result } = renderHook(() => useToggleState({ defaultChecked: true }, { root: {} }));

    expect(result.current.checked).toBe(true);
    expect(result.current.root['aria-pressed']).toBe(true);
  });

  it('respects checked prop', () => {
    const { result } = renderHook(() => useToggleState({ checked: true }, { root: {} }));

    expect(result.current.checked).toBe(true);
    expect(result.current.root['aria-pressed']).toBe(true);
  });

  it('uses aria-checked instead of aria-pressed if role checkbox is passed in', () => {
    const { result } = renderHook(() => useToggleState({ checked: true }, { root: { role: 'checkbox' } }));

    expect(result.current.checked).toBe(true);
    expect(result.current.root['aria-checked']).toBe(true);
    expect(result.current.root['aria-pressed']).toBeUndefined();
  });

  it('uses aria-checked instead of aria-pressed if role menuitemcheckbox is passed in', () => {
    const { result } = renderHook(() => useToggleState({ checked: true }, { root: { role: 'menuitemcheckbox' } }));

    expect(result.current.checked).toBe(true);
    expect(result.current.root['aria-checked']).toBe(true);
    expect(result.current.root['aria-pressed']).toBeUndefined();
  });

  it('ignores defaultChecked updates', () => {
    const { rerender, result } = renderHook(({ defaultChecked }) => useToggleState({ defaultChecked }, { root: {} }), {
      initialProps: { defaultChecked: true },
    });

    expect(result.current.checked).toBe(true);
    expect(result.current.root['aria-pressed']).toBe(true);

    rerender({ defaultChecked: false });

    expect(result.current.checked).toBe(true);
    expect(result.current.root['aria-pressed']).toBe(true);
  });

  it('respects checked updates', () => {
    const { rerender, result } = renderHook(({ checked }) => useToggleState({ checked }, { root: {} }), {
      initialProps: { checked: true },
    });

    expect(result.current.checked).toBe(true);
    expect(result.current.root['aria-pressed']).toBe(true);

    rerender({ checked: false });

    expect(result.current.checked).toBe(false);
    expect(result.current.root['aria-pressed']).toBe(false);
  });

  it('triggers a change in the checked state if it is uncontrolled', () => {
    const { result } = renderHook(() => useToggleState({ defaultChecked: true }, { root: {} }));

    expect(result.current.checked).toBe(true);
    expect(result.current.root['aria-pressed']).toBe(true);

    act(() => {
      result.current.root.onClick?.(
        new MouseEvent('click') as unknown as React.MouseEvent<HTMLButtonElement & HTMLAnchorElement>,
      );
    });

    expect(result.current.checked).toBe(false);
    expect(result.current.root['aria-pressed']).toBe(false);

    act(() => {
      result.current.root.onClick?.(
        new MouseEvent('click') as unknown as React.MouseEvent<HTMLButtonElement & HTMLAnchorElement>,
      );
    });

    expect(result.current.checked).toBe(true);
    expect(result.current.root['aria-pressed']).toBe(true);
  });

  it('does not trigger a change in the checked state if it is controlled', () => {
    const { result } = renderHook(() => useToggleState({ checked: true }, { root: {} }));

    expect(result.current.checked).toBe(true);
    expect(result.current.root['aria-pressed']).toBe(true);

    act(() => {
      result.current.root.onClick?.(
        new MouseEvent('click') as unknown as React.MouseEvent<HTMLButtonElement & HTMLAnchorElement>,
      );
    });

    expect(result.current.checked).toBe(true);
    expect(result.current.root['aria-pressed']).toBe(true);
  });

  it('does not trigger a change in the checked state if it is disabled', () => {
    const { result } = renderHook(() => useToggleState({ defaultChecked: true, disabled: true }, { root: {} }));

    expect(result.current.checked).toBe(true);
    expect(result.current.root['aria-pressed']).toBe(true);

    act(() => {
      result.current.root.onClick?.(
        new MouseEvent('click') as unknown as React.MouseEvent<HTMLButtonElement & HTMLAnchorElement>,
      );
    });

    expect(result.current.checked).toBe(true);
    expect(result.current.root['aria-pressed']).toBe(true);
  });

  it('does not trigger a change in the checked state if it is disabledFocusable', () => {
    const { result } = renderHook(() =>
      useToggleState({ defaultChecked: true, disabledFocusable: true }, { root: {} }),
    );

    expect(result.current.checked).toBe(true);
    expect(result.current.root['aria-pressed']).toBe(true);

    act(() => {
      result.current.root.onClick?.(
        new MouseEvent('click') as unknown as React.MouseEvent<HTMLButtonElement & HTMLAnchorElement>,
      );
    });

    expect(result.current.checked).toBe(true);
    expect(result.current.root['aria-pressed']).toBe(true);
  });

  it('does not trigger a change in the checked state if the event passed onClick has defaultPrevented set', () => {
    const { result } = renderHook(() => useToggleState({ defaultChecked: true }, { root: {} }));

    expect(result.current.checked).toBe(true);
    expect(result.current.root['aria-pressed']).toBe(true);
    act(() => {
      const ev = new MouseEvent('click', { cancelable: true }) as unknown as React.MouseEvent<
        HTMLButtonElement & HTMLAnchorElement
      >;
      ev.preventDefault();
      result.current.root.onClick?.(ev);
    });

    expect(result.current.checked).toBe(true);
    expect(result.current.root['aria-pressed']).toBe(true);
  });
});
