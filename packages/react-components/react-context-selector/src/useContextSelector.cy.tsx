import { mount as mountBase } from '@fluentui/scripts-cypress';
import * as React from 'react';

import { createContext } from './createContext';
import { useContextSelector } from './useContextSelector';

// Render-count assertions are sensitive to StrictMode's intentional double-invoke.
// This test validates a lane-pollution behavior that is orthogonal to StrictMode,
// so we disable it to keep counts deterministic and 1:1 with commits.
const mount = (element: React.ReactElement) => mountBase(element, { strict: false });

// Module-level render counter. Mutated inside the render body to capture
// function-component invocations that `useEffect` cannot observe: under the
// v1 `useState`-bailout hook on React 18, React runs the component function
// and then discards the render via `bailoutOnAlreadyFinishedWork`, so no
// commit happens — but the function already ran.
type Index = 1 | 2 | 3 | 4;
const RENDER_COUNTS: Record<Index, number> = { 1: 0, 2: 0, 3: 0, 4: 0 };
const resetRenderCounts = () => {
  RENDER_COUNTS[1] = 0;
  RENDER_COUNTS[2] = 0;
  RENDER_COUNTS[3] = 0;
  RENDER_COUNTS[4] = 0;
};

const TestContext = createContext<{ index: number }>({ index: -1 });

const Item: React.FC<{ index: Index }> = props => {
  const active = useContextSelector(TestContext, value => value.index === props.index);
  RENDER_COUNTS[props.index] += 1;
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
    // Cypress reuses the component iframe across retries within the same spec,
    // so the module-level counter accumulates across attempts. Reset it so
    // assertions are absolute, not cumulative.
    resetRenderCounts();
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
    cy.wrap(RENDER_COUNTS).should('deep.equal', { 1: 1, 2: 1, 3: 1, 4: 1 });

    // Click 1: 0 → 1. Only item 1 flips (false → true).
    cy.get('[data-testid=provider]').click();
    cy.get('[data-testid=item-1]').should('have.attr', 'data-active', 'true');
    cy.wrap(RENDER_COUNTS).should('deep.equal', { 1: 2, 2: 1, 3: 1, 4: 1 });

    // Click 2: 1 → 2. Item 1 flips (true → false), item 2 flips (false → true).
    cy.get('[data-testid=provider]').click();
    cy.get('[data-testid=item-1]').should('have.attr', 'data-active', 'false');
    cy.get('[data-testid=item-2]').should('have.attr', 'data-active', 'true');
    cy.wrap(RENDER_COUNTS).should('deep.equal', { 1: 3, 2: 2, 3: 1, 4: 1 });

    // Click 3: 2 → 3. Item 2 flips (true → false), item 3 flips (false → true).
    // Item 1's alternate fiber retains lanes from click 2. Under the legacy
    // `useState` path the in-render reducer is invoked, bails out, and the
    // JSX is discarded — but the function body already incremented the
    // counter. This assertion pins item 1 to 3 renders (not 4).
    cy.get('[data-testid=provider]').click();
    cy.get('[data-testid=item-2]').should('have.attr', 'data-active', 'false');
    cy.get('[data-testid=item-3]').should('have.attr', 'data-active', 'true');
    cy.wrap(RENDER_COUNTS).should('deep.equal', { 1: 3, 2: 3, 3: 2, 4: 1 });
  });
});
