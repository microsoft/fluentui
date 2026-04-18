import { createContext } from './createContext';
import { useContextSelector } from './useContextSelector';
import { render, act } from '@testing-library/react';

import * as React from 'react';

const TestContext = createContext<{ index: number }>({ index: -1 });

const TestComponent: React.FC<{ index: number; onUpdate?: () => void }> = props => {
  const active = useContextSelector(TestContext, v => v.index === props.index);

  React.useEffect(() => {
    props.onUpdate && props.onUpdate();
  });

  return <div className="test-component" data-active={active} />;
};

const TestProvider: React.FC<{ children?: React.ReactNode }> = props => {
  const [index, setIndex] = React.useState<number>(0);

  return (
    <div className="test-provider" onClick={() => setIndex(prevIndex => prevIndex + 1)}>
      <TestContext.Provider value={{ index }}>{props.children}</TestContext.Provider>
    </div>
  );
};

describe('useContextSelector', () => {
  let container: HTMLElement | null;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container as HTMLElement);
    container = null;
  });

  it('updates only on selector match', () => {
    const onUpdate = jest.fn();
    render(
      <TestProvider>
        <TestComponent index={1} onUpdate={onUpdate} />
      </TestProvider>,
      { container: container as HTMLElement },
    );

    act(() => {
      // no-op to wait for effects
    });

    expect(document.querySelector<HTMLElement>('.test-component')?.dataset.active).toBe('false');
    expect(onUpdate).toHaveBeenCalledTimes(1);

    // Match => update, (v.index: 1, p.index: 1)
    act(() => {
      document.querySelector<HTMLElement>('.test-provider')?.click();
    });
    expect(document.querySelector<HTMLElement>('.test-component')?.dataset.active).toBe('true');
    expect(onUpdate).toHaveBeenCalledTimes(2);

    // No match, but update because "active" changed, (v.index: 2, p.index: 1)
    act(() => {
      document.querySelector<HTMLElement>('.test-provider')?.click();
    });
    expect(document.querySelector<HTMLElement>('.test-component')?.dataset.active).toBe('false');
    expect(onUpdate).toHaveBeenCalledTimes(3);

    // Match previous => no update, (v.index: 3, p.index: 1)
    act(() => {
      document.querySelector<HTMLElement>('.test-provider')?.click();
    });
    expect(document.querySelector<HTMLElement>('.test-component')?.dataset.active).toBe('false');
    expect(onUpdate).toHaveBeenCalledTimes(3);
  });

  it('updates are propogated inside React.memo()', () => {
    // https://reactjs.org/docs/react-api.html#reactmemo
    // Will never pass updates
    const MemoComponent = React.memo(TestComponent, () => true);
    const onUpdate = jest.fn();

    render(
      <TestProvider>
        <MemoComponent index={1} onUpdate={onUpdate} />
      </TestProvider>,
      { container: container as HTMLElement },
    );

    expect(document.querySelector<HTMLElement>('.test-component')?.dataset.active).toBe('false');

    act(() => {
      document.querySelector<HTMLElement>('.test-provider')?.click();
    });
    expect(document.querySelector<HTMLElement>('.test-component')?.dataset.active).toBe('true');
    expect(onUpdate).toHaveBeenCalledTimes(2);
  });

  // Regression test for the eager-bailout glitch fixed in this hook rewrite.
  // With the previous `[value, selected]` + `setState(prev => prev)` bailout,
  // React's eager path silently stopped working after the first listener-driven
  // render committed (the bound-at-mount fiber becomes the stale alternate and
  // its .lanes never clear). That resulted in extra component-function calls
  // on subsequent context updates, even when the selected slice didn't change.
  //
  // This test runs the RFC's Scenario 2 (controlled List + memoized items) and
  // asserts that each memoized item re-renders only when its `active` flag
  // actually flipped — no "three items re-rendered instead of two" anomaly.
  it('memoized consumers re-render only when their selected slice changes', () => {
    const MemoizedTestComponent = React.memo(TestComponent);

    const onUpdates: Record<number, jest.Mock> = {
      1: jest.fn(),
      2: jest.fn(),
      3: jest.fn(),
      4: jest.fn(),
    };

    render(
      <TestProvider>
        <MemoizedTestComponent index={1} onUpdate={onUpdates[1]} />
        <MemoizedTestComponent index={2} onUpdate={onUpdates[2]} />
        <MemoizedTestComponent index={3} onUpdate={onUpdates[3]} />
        <MemoizedTestComponent index={4} onUpdate={onUpdates[4]} />
      </TestProvider>,
      { container: container as HTMLElement },
    );

    // Initial render. TestProvider starts at index=0, so none are active.
    // Each memoized item has committed once — the `onUpdate` effect fires
    // once per item on mount.
    Object.values(onUpdates).forEach(m => expect(m).toHaveBeenCalledTimes(1));

    // Click 1: 0 → 1. Only index=1 flips (false → true).
    act(() => {
      document.querySelector<HTMLElement>('.test-provider')?.click();
    });
    expect(onUpdates[1]).toHaveBeenCalledTimes(2);
    expect(onUpdates[2]).toHaveBeenCalledTimes(1);
    expect(onUpdates[3]).toHaveBeenCalledTimes(1);
    expect(onUpdates[4]).toHaveBeenCalledTimes(1);

    // Click 2: 1 → 2. index=1 flips true→false, index=2 flips false→true.
    // Items 3 and 4 did not change and must not re-render.
    act(() => {
      document.querySelector<HTMLElement>('.test-provider')?.click();
    });
    expect(onUpdates[1]).toHaveBeenCalledTimes(3);
    expect(onUpdates[2]).toHaveBeenCalledTimes(2);
    expect(onUpdates[3]).toHaveBeenCalledTimes(1); // ← was 2 under the old eager-bailout glitch
    expect(onUpdates[4]).toHaveBeenCalledTimes(1);

    // Click 3: 2 → 3.
    act(() => {
      document.querySelector<HTMLElement>('.test-provider')?.click();
    });
    expect(onUpdates[1]).toHaveBeenCalledTimes(3);
    expect(onUpdates[2]).toHaveBeenCalledTimes(3);
    expect(onUpdates[3]).toHaveBeenCalledTimes(2);
    expect(onUpdates[4]).toHaveBeenCalledTimes(1);
  });

  it('a single consumer throw does not starve later subscribers of context updates', () => {
    const ThrowingConsumer: React.FC<{ threshold: number }> = ({ threshold }) => {
      useContextSelector(TestContext, v => {
        if (v.index > threshold) {
          throw new Error('selector cannot handle this value');
        }
        return v.index;
      });
      return null;
    };

    const onUpdate = jest.fn();

    render(
      <TestProvider>
        <ThrowingConsumer threshold={0} />
        <TestComponent index={1} onUpdate={onUpdate} />
      </TestProvider>,
      { container: container as HTMLElement },
    );

    expect(onUpdate).toHaveBeenCalledTimes(1);

    // Click: index goes 0 → 1. The first consumer's selector will throw
    // (1 > 0). The downstream TestComponent must still receive the update
    // because listener error isolation prevents `listeners.forEach` from
    // short-circuiting.
    act(() => {
      document.querySelector<HTMLElement>('.test-provider')?.click();
    });
    expect(document.querySelector<HTMLElement>('.test-component')?.dataset.active).toBe('true');
    expect(onUpdate).toHaveBeenCalledTimes(2);
  });
});
