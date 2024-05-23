import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { elementContains } from '@fluentui/react-utilities';
import { useInferredVirtualParent } from './useInferredVirtualParent';

describe('useInferredVirtualParent', () => {
  let button = document.createElement('button');
  let dialogElement = document.createElement('div');
  let container = document.createElement('div');

  /**
   * Test DOM setup:
   *
   * <container>
   *   <button></button>
   * </container>
   *
   * <dialogElement></dialogElement>
   */

  beforeEach(() => {
    button.remove();
    dialogElement.remove();
    container.remove();

    button = document.createElement('button');
    dialogElement = document.createElement('div');
    container = document.createElement('div');

    container.append(button);
    document.body.appendChild(container);
    document.body.appendChild(dialogElement);
  });

  it('should not do anything if trigger is provided', () => {
    let open = false;

    const { rerender, result } = renderHook(() =>
      useInferredVirtualParent({ trigger: <button />, enabled: true, open }),
    );
    result.current.current = dialogElement;
    open = true;
    button.focus();

    rerender();

    expect(elementContains(container, dialogElement)).toBe(false);
  });

  it('should not do anything if not enabled', () => {
    let open = false;

    const { rerender, result } = renderHook(() =>
      useInferredVirtualParent({ trigger: undefined, enabled: false, open }),
    );
    result.current.current = dialogElement;
    open = true;
    button.focus();

    rerender();

    expect(elementContains(container, dialogElement)).toBe(false);
  });

  it('should not do anything if not open', () => {
    const { rerender, result } = renderHook(() =>
      useInferredVirtualParent({ trigger: undefined, enabled: true, open: false }),
    );
    result.current.current = dialogElement;
    button.focus();

    rerender();

    expect(elementContains(container, dialogElement)).toBe(false);
  });

  it('should not do anything if there is no activeElement', () => {
    let open = false;

    const { rerender, result } = renderHook(() =>
      useInferredVirtualParent({ trigger: undefined, enabled: true, open: false }),
    );
    result.current.current = dialogElement;
    open = true;

    rerender();

    expect(document.activeElement).toBe(document.body);
    expect(elementContains(container, dialogElement)).toBe(false);
  });

  it('should infer virtual parent from active element', () => {
    let open = false;

    const { rerender, result } = renderHook(() =>
      useInferredVirtualParent({ trigger: undefined, enabled: true, open }),
    );
    result.current.current = dialogElement;
    open = true;
    button.focus();

    rerender();

    expect(elementContains(container, dialogElement)).toBe(true);
    expect(document.querySelector('[data-fui-virtual-parent]')).not.toBeNull();
  });

  it('should cleanup virtual parent', () => {
    let open = false;

    const { rerender, unmount, result } = renderHook(() =>
      useInferredVirtualParent({ trigger: undefined, enabled: true, open }),
    );
    result.current.current = dialogElement;
    open = true;
    button.focus();

    rerender();
    expect(elementContains(container, dialogElement)).toBe(true);

    unmount();
    expect(document.querySelector('[data-fui-virtual-parent]')).toBe(null);
    expect(elementContains(container, dialogElement)).toBe(false);
  });
});
