import { createContext } from './createContext';
import { useContextSelector } from './useContextSelector';
import type { ContextValue } from './types';
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

    // Initial render. TestProvider starts at index=0, so none are active. Each memoized item has committed once — the
    // `onUpdate` effect fires once per item on mount.
    Object.values(onUpdates).forEach(m => expect(m).toHaveBeenCalledTimes(1));

    // Click 1: 0 → 1. Only index=1 flips (active: false → true).
    jest.clearAllMocks();
    act(() => {
      document.querySelector<HTMLElement>('.test-provider')?.click();
    });

    expect(onUpdates[1]).toHaveBeenCalledTimes(1); // true => false
    expect(onUpdates[2]).toHaveBeenCalledTimes(0);
    expect(onUpdates[3]).toHaveBeenCalledTimes(0);
    expect(onUpdates[4]).toHaveBeenCalledTimes(0);

    // Click 2: 1 → 2. index=1 flips (active: true → false), index=2 flips (active: false → true).
    // Items 3 and 4 did not change and must not re-render.
    jest.clearAllMocks();
    act(() => {
      document.querySelector<HTMLElement>('.test-provider')?.click();
    });

    expect(onUpdates[1]).toHaveBeenCalledTimes(1); // true => false
    expect(onUpdates[2]).toHaveBeenCalledTimes(1); // false => true
    expect(onUpdates[3]).toHaveBeenCalledTimes(0); // ← was 2 under the old eager-bailout with `useState()`
    expect(onUpdates[4]).toHaveBeenCalledTimes(0);

    // Click 3: 2 → 3.
    jest.clearAllMocks();
    act(() => {
      document.querySelector<HTMLElement>('.test-provider')?.click();
    });

    expect(onUpdates[1]).toHaveBeenCalledTimes(0);
    expect(onUpdates[2]).toHaveBeenCalledTimes(1); // true => false
    expect(onUpdates[3]).toHaveBeenCalledTimes(1); // false => true
    expect(onUpdates[4]).toHaveBeenCalledTimes(0);
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

  describe('unsubscribe', () => {
    const ListenersProbe = ({ onRender }: { onRender: (listeners: unknown[]) => void }) => {
      const { listeners } = React.useContext(TestContext as unknown as React.Context<ContextValue<{ index: number }>>);
      onRender(listeners);

      return null;
    };

    const Consumers = (props: { indexes: number[]; onListeners: (listeners: unknown[]) => void }) => (
      <TestProvider>
        <ListenersProbe onRender={props.onListeners} />
        {props.indexes.map(index => (
          <div key={index} data-index={index}>
            <TestComponent index={index} />
          </div>
        ))}
      </TestProvider>
    );

    const getActiveIndexes = () =>
      Array.from(document.querySelectorAll<HTMLElement>('[data-index]'))
        .filter(element => element.querySelector<HTMLElement>('.test-component')?.dataset.active === 'true')
        .map(element => Number(element.dataset.index));

    it('removes listeners of unmounted consumers without shifting the remaining listeners', () => {
      let listeners: unknown[] = [];
      const allIndexes = Array.from({ length: 20 }, (_, index) => index + 1);
      const { rerender } = render(<Consumers indexes={allIndexes} onListeners={value => (listeners = value)} />, {
        container: container as HTMLElement,
      });

      expect(listeners).toHaveLength(20);

      const spliceSpy = jest.spyOn(listeners, 'splice');
      const indexOfSpy = jest.spyOn(listeners, 'indexOf');

      rerender(<Consumers indexes={[2, 9, 20]} onListeners={value => (listeners = value)} />);

      expect(spliceSpy).not.toHaveBeenCalled();
      // Searches for removed listeners do not rescan the slots of previously removed listeners
      const visited = indexOfSpy.mock.calls.reduce((total, [, fromIndex = 0], call) => {
        const index = indexOfSpy.mock.results[call].value as number;
        return total + (index === -1 ? 20 : index + 1) - fromIndex;
      }, 0);
      expect(visited).toBeLessThanOrEqual(2 * 20);

      rerender(<Consumers indexes={[]} onListeners={value => (listeners = value)} />);

      expect(listeners).toHaveLength(0);
    });

    it('keeps notifying remaining consumers after other consumers unmount', () => {
      const allIndexes = Array.from({ length: 20 }, (_, index) => index + 1);
      const { rerender } = render(<Consumers indexes={allIndexes} onListeners={() => undefined} />, {
        container: container as HTMLElement,
      });

      rerender(<Consumers indexes={[2, 9, 20]} onListeners={() => undefined} />);
      expect(getActiveIndexes()).toEqual([]);

      for (let click = 1; click <= 20; click++) {
        act(() => {
          document.querySelector<HTMLElement>('.test-provider')?.click();
        });

        expect(getActiveIndexes()).toEqual([2, 9, 20].includes(click) ? [click] : []);
      }

      // Consumers mounted after removals are notified as well
      rerender(<Consumers indexes={[2, 9, 20, 21]} onListeners={() => undefined} />);
      act(() => {
        document.querySelector<HTMLElement>('.test-provider')?.click();
      });

      expect(getActiveIndexes()).toEqual([21]);
    });
  });
});
