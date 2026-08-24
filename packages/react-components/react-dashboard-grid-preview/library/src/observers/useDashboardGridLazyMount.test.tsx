import * as React from 'react';
import { act, render, screen } from '@testing-library/react';
import { useDashboardGridLazyMount } from './useDashboardGridLazyMount';

describe('useDashboardGridLazyMount', () => {
  it('keeps the shell mounted and reveals content after intersection', () => {
    const original = window.IntersectionObserver;
    let callback: IntersectionObserverCallback | undefined;
    class MockIntersectionObserver {
      public readonly root = null;
      public readonly rootMargin = '';
      public readonly thresholds = [];

      public constructor(nextCallback: IntersectionObserverCallback) {
        callback = nextCallback;
      }
      public observe() {
        return undefined;
      }
      public unobserve() {
        return undefined;
      }
      public disconnect() {
        return undefined;
      }
      public takeRecords() {
        return [];
      }
    }
    window.IntersectionObserver =
      MockIntersectionObserver as unknown as typeof IntersectionObserver;

    const Harness = () => {
      const lazy = useDashboardGridLazyMount<HTMLDivElement>({
        targetDocument: document,
        enabled: true,
      });
      return (
        <div ref={lazy.ref} data-testid="shell">
          {lazy.visible ? 'content' : 'skeleton'}
        </div>
      );
    };

    render(<Harness />);
    expect(screen.getByTestId('shell')).toHaveTextContent('skeleton');

    act(() => {
      callback?.(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });
    expect(screen.getByTestId('shell')).toHaveTextContent('content');
    window.IntersectionObserver = original;
  });
});
