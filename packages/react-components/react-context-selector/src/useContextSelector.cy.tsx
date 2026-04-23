import { mount as mountBase } from '@fluentui/scripts-cypress';
import * as React from 'react';

import { createContext } from './createContext';
import { useContextSelector } from './useContextSelector';

// Render-count assertions are sensitive to StrictMode's intentional double-invoke.
// This test validates a lane-pollution behavior that is orthogonal to StrictMode,
// so we disable it to keep counts deterministic and 1:1 with commits.
const mount = (element: React.ReactElement) => mountBase(element, { strict: false });

type RenderCountMap = Record<number, number>;
interface WindowWithRenderCounts extends Window {
  __useContextSelectorRenderCounts__?: RenderCountMap;
}

const readRenderCounts = (): RenderCountMap => {
  const w = window as WindowWithRenderCounts;
  w.__useContextSelectorRenderCounts__ = w.__useContextSelectorRenderCounts__ ?? { 1: 0, 2: 0, 3: 0, 4: 0 };
  return w.__useContextSelectorRenderCounts__;
};

const TestContext = createContext<{ index: number }>({ index: -1 });

const Item: React.FC<{ index: number }> = props => {
  const active = useContextSelector(TestContext, value => value.index === props.index);

  // Side effect in the render body: pushes a signal that the function ran
  // even when React later discards the render via `bailoutOnAlreadyFinishedWork`.
  // A commit-timed effect (`useEffect`) cannot observe discarded renders.
  readRenderCounts()[props.index] += 1;

  return (
    <div data-testid={`item-${props.index}`} data-active={String(active)}>
      item {props.index}
    </div>
  );
};

const MemoItem = React.memo(Item);

const Provider: React.FC<{ children?: React.ReactNode }> = props => {
  const [index, setIndex] = React.useState(0);
  return (
    <button type="button" data-testid="provider" onClick={() => setIndex(prev => prev + 1)}>
      <TestContext.Provider value={{ index }}>{props.children}</TestContext.Provider>
    </button>
  );
};

// Regression test for the `useState` eager-bailout pitfall described in
// docs/react-v9/contributing/rfcs/react-components/context-selector-tearing.md.
//
// On React 18, a bound-at-mount fiber's alternate retains lanes from a prior
// listener-driven `setState`. On the next listener-driven `setState(prev => prev)`
// the eager-bailout precondition (`fiber.lanes === NoLanes && alternate.lanes === NoLanes`)
// fails, so React enqueues the update, enters `beginWork`, runs the component
// function, and only then discards the JSX via `bailoutOnAlreadyFinishedWork`.
// The DOM never changes — but the function already ran. A `useEffect` cannot
// observe this leak because no commit happens. The in-render counter can.
//
// This is a React-18-only glitch (React 19 relaxed the precondition), so the
// test is most meaningful under `test-rit--18--e2e`. On React 17/18 against
// the legacy `useState`-bailout hook, `item-1`'s render count grows from 3 to 4
// on click 3.
describe('useContextSelector — eager-bailout regression', () => {
  beforeEach(() => {
    // Cypress reuses the component iframe window across retries within the
    // same spec, so state stored on `window` accumulates. Reset before each
    // test so render-count assertions are absolute, not cumulative.
    cy.window({ log: false }).then((win: Window) => {
      (win as WindowWithRenderCounts).__useContextSelectorRenderCounts__ = { 1: 0, 2: 0, 3: 0, 4: 0 };
    });
  });

  it('memoized consumers whose selected slice did not change must not execute their render function', () => {
    mount(
      <Provider>
        <MemoItem index={1} />
        <MemoItem index={2} />
        <MemoItem index={3} />
        <MemoItem index={4} />
      </Provider>,
    );

    // Mount: each item's function body ran once.
    cy.window().its('__useContextSelectorRenderCounts__').should('deep.equal', { 1: 1, 2: 1, 3: 1, 4: 1 });

    // Click 1: 0 → 1. Only item 1 flips (false → true).
    cy.get('[data-testid=provider]').click();
    cy.get('[data-testid=item-1]').should('have.attr', 'data-active', 'true');
    cy.window().its('__useContextSelectorRenderCounts__').should('deep.equal', { 1: 2, 2: 1, 3: 1, 4: 1 });

    // Click 2: 1 → 2. Item 1 flips (true → false), item 2 flips (false → true).
    cy.get('[data-testid=provider]').click();
    cy.get('[data-testid=item-1]').should('have.attr', 'data-active', 'false');
    cy.get('[data-testid=item-2]').should('have.attr', 'data-active', 'true');
    cy.window().its('__useContextSelectorRenderCounts__').should('deep.equal', { 1: 3, 2: 2, 3: 1, 4: 1 });

    // Click 3: 2 → 3. Item 2 flips (true → false), item 3 flips (false → true).
    // Item 1's alternate fiber retains lanes from click 2. Under the legacy
    // `useState` path the in-render reducer is invoked, bails out, and the
    // JSX is discarded — but the function body already incremented the
    // counter. This assertion pins item 1 to 3 renders (not 4).
    cy.get('[data-testid=provider]').click();
    cy.get('[data-testid=item-2]').should('have.attr', 'data-active', 'false');
    cy.get('[data-testid=item-3]').should('have.attr', 'data-active', 'true');
    cy.window().its('__useContextSelectorRenderCounts__').should('deep.equal', { 1: 3, 2: 3, 3: 2, 4: 1 });
  });
});
