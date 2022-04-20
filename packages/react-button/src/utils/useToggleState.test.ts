import { act, renderHook } from '@testing-library/react-hooks';
import { useToggleState } from './useToggleState';
import type { MouseEvent as ReactMouseEvent } from 'react';

describe('useToggleState', () => {
  it('defaults to unchecked', () => {
    const { result } = renderHook(() => useToggleState({}, {}));

    expect(result.current.checked).toBe(false);
    expect(result.current.root['aria-pressed']).toBe(false);
  });

  it('respects defaultChecked prop', () => {
    const { result } = renderHook(() => useToggleState({ defaultChecked: true }, {}));

    expect(result.current.checked).toBe(true);
    expect(result.current.root['aria-pressed']).toBe(true);
  });

  it('respects checked prop', () => {
    const { result } = renderHook(() => useToggleState({ checked: true }, {}));

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
    const { rerender, result } = renderHook(({ defaultChecked }) => useToggleState({ defaultChecked }, {}), {
      initialProps: { defaultChecked: true },
    });

    expect(result.current.checked).toBe(true);
    expect(result.current.root['aria-pressed']).toBe(true);

    rerender({ defaultChecked: false });

    expect(result.current.checked).toBe(true);
    expect(result.current.root['aria-pressed']).toBe(true);
  });

  it('respects checked updates', () => {
    const { rerender, result } = renderHook(({ checked }) => useToggleState({ checked }, {}), {
      initialProps: { checked: true },
    });

    expect(result.current.checked).toBe(true);
    expect(result.current.root['aria-pressed']).toBe(true);

    rerender({ checked: false });

    expect(result.current.checked).toBe(false);
    expect(result.current.root['aria-pressed']).toBe(false);
  });

  it('triggers a change in the checked state if it is uncontrolled', () => {
    const { result } = renderHook(() => useToggleState({ defaultChecked: true }, {}));

    expect(result.current.checked).toBe(true);
    expect(result.current.root['aria-pressed']).toBe(true);

    act(() => {
      result.current.root.onClick?.(
        (new MouseEvent('click') as unknown) as ReactMouseEvent<HTMLButtonElement & HTMLAnchorElement>,
      );
    });

    expect(result.current.checked).toBe(false);
    expect(result.current.root['aria-pressed']).toBe(false);

    act(() => {
      result.current.root.onClick?.(
        (new MouseEvent('click') as unknown) as ReactMouseEvent<HTMLButtonElement & HTMLAnchorElement>,
      );
    });

    expect(result.current.checked).toBe(true);
    expect(result.current.root['aria-pressed']).toBe(true);
  });

  it('does not trigger a change in the checked state if it is controlled', () => {
    const { result } = renderHook(() => useToggleState({ checked: true }, {}));

    expect(result.current.checked).toBe(true);
    expect(result.current.root['aria-pressed']).toBe(true);

    act(() => {
      result.current.root.onClick?.(
        (new MouseEvent('click') as unknown) as ReactMouseEvent<HTMLButtonElement & HTMLAnchorElement>,
      );
    });

    expect(result.current.checked).toBe(true);
    expect(result.current.root['aria-pressed']).toBe(true);
  });

  it('does not trigger a change in the checked state if it is disabled', () => {
    const { result } = renderHook(() => useToggleState({ defaultChecked: true, disabled: true }, {}));

    expect(result.current.checked).toBe(true);
    expect(result.current.root['aria-pressed']).toBe(true);

    act(() => {
      result.current.root.onClick?.(
        (new MouseEvent('click') as unknown) as ReactMouseEvent<HTMLButtonElement & HTMLAnchorElement>,
      );
    });

    expect(result.current.checked).toBe(true);
    expect(result.current.root['aria-pressed']).toBe(true);
  });

  it('does not trigger a change in the checked state if it is disabledFocusable', () => {
    const { result } = renderHook(() => useToggleState({ defaultChecked: true, disabledFocusable: true }, {}));

    expect(result.current.checked).toBe(true);
    expect(result.current.root['aria-pressed']).toBe(true);

    act(() => {
      result.current.root.onClick?.(
        (new MouseEvent('click') as unknown) as ReactMouseEvent<HTMLButtonElement & HTMLAnchorElement>,
      );
    });

    expect(result.current.checked).toBe(true);
    expect(result.current.root['aria-pressed']).toBe(true);
  });
});
