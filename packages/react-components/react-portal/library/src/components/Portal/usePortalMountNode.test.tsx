import { renderHook } from '@testing-library/react-hooks';
import { PortalMountNodeProvider } from '@fluentui/react-shared-contexts';
import * as React from 'react';

import { usePortalMountNode } from './usePortalMountNode';

describe('usePortalMountNode', () => {
  it('creates an element and attaches it to "document.body"', () => {
    const { result } = renderHook(() => usePortalMountNode({}));

    expect(result.current).toBeInstanceOf(HTMLDivElement);
    expect(result.current).toHaveAttribute('data-portal-node', 'true');
    expect(document.body.contains(result.current)).toBeTruthy();
  });

  it('creates an element and attaches it to "mountNode"', () => {
    const mountNode = document.createElement('div');
    const { result } = renderHook(() => usePortalMountNode({}), {
      wrapper: props => <PortalMountNodeProvider {...props} value={mountNode} />,
    });

    expect(result.current).toBeInstanceOf(HTMLDivElement);
    expect(mountNode.contains(result.current)).toBeTruthy();
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
