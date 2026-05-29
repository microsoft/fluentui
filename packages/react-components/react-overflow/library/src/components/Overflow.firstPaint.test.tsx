import * as React from 'react';
import { render } from '@testing-library/react';
import { Overflow } from './Overflow';
import { OverflowItem } from './OverflowItem';
import { useOverflowMenu } from '../useOverflowMenu';

/**
 * Regression coverage for first-paint correctness, localized to react-overflow
 * rather than relying on downstream consumers (e.g. react-charts Legends) to
 * surface it.
 *
 * A consumer composes Overflow as a set of OverflowItems plus a menu that only
 * renders while `isOverflowing`. In jsdom there is no layout and `ResizeObserver`
 * is mocked to a no-op, so element sizes report as 0 and — with the default
 * padding — the available size is negative. A *completed* overflow pass therefore
 * moves items into overflow and renders the menu.
 *
 * The container must reflect that pass on the first painted frame: the menu is
 * present and the overflowing items carry `data-overflowing`. Before the
 * synchronous first-paint computation this assertion fails (the items render
 * un-processed and the menu never mounts), which is the flicker this guards
 * against.
 */
describe('Overflow - first paint', () => {
  beforeAll(() => {
    // https://github.com/jsdom/jsdom/issues/3368
    global.ResizeObserver = class ResizeObserver {
      public observe() {
        // do nothing
      }
      public unobserve() {
        // do nothing
      }
      public disconnect() {
        // do nothing
      }
    } as unknown as typeof ResizeObserver;
  });

  const Menu: React.FC = () => {
    const { isOverflowing, ref, overflowCount } = useOverflowMenu<HTMLButtonElement>();

    if (!isOverflowing) {
      return null;
    }

    return (
      <button data-test-menu="" ref={ref}>
        +{overflowCount}
      </button>
    );
  };

  it('does not collapse items before the container has been measured', () => {
    const { container } = render(
      <Overflow>
        <div>
          {new Array(5).fill(0).map((_, i) => (
            <OverflowItem key={i} id={`${i}`}>
              <button data-test-item={`${i}`}>{i}</button>
            </OverflowItem>
          ))}
          <Menu />
        </div>
      </Overflow>,
    );

    // With no real layout (jsdom reports 0 sizes) the manager has nothing meaningful to
    // measure, so it must not prematurely hide items or surface the overflow menu.
    // Forcing the overflow pass against unmeasured (zero) sizes collapses everything,
    // which is the degenerate first paint we want to avoid.
    expect(container.querySelector('[data-test-menu]')).toBeNull();
    expect(container.querySelectorAll('[data-overflowing]').length).toBe(0);
  });
});
