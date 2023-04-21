import { renderHook } from '@testing-library/react-hooks';
import { usePortalMountNode } from './usePortalMountNode';

describe('usePortalMountNode', () => {
  it('creates an element and attaches it to "document.body"', () => {
    const { result } = renderHook(() => usePortalMountNode({}));

    expect(result.current).toBeInstanceOf(HTMLDivElement);
    expect(document.body.contains(result.current)).toBeTruthy();
  });

  it('applies classes to an element', () => {
    const { result } = renderHook(() => usePortalMountNode({ className: 'foo' }));

    expect(result.current?.classList).toContain('foo');
  });

  it('does not create an element if is disabled', () => {
    const { result } = renderHook(() => usePortalMountNode({ disabled: true }));

    expect(result.current).toBeNull();
  });
});
