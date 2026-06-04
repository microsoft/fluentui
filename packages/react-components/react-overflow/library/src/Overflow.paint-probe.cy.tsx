import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import { Overflow, useOverflowContext, useOverflowCount } from '@fluentui/react-overflow';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';

// Disable StrictMode so the probe measures a single mount/commit path.
const mount = (element: React.ReactElement) => mountBase(element, { strict: false });

const selectors = {
  container: 'data-test-container',
  item: 'data-test-item',
  menu: 'data-test-menu',
};

// The only thing this probe measures: what is on screen. `overflowingItemIds` are the items marked
// overflowing (what the real component hides); `menuText` is the rendered overflow-menu count.
type Paint = { menuText: string | null; overflowingItemIds: string[] };

const read = (): Paint => {
  const menu = document.querySelector<HTMLElement>(`[${selectors.menu}]`);
  const overflowingItemIds = Array.from(document.querySelectorAll<HTMLElement>(`[${selectors.item}]`))
    .filter(item => item.getAttribute('data-overflowing') !== null)
    .map(item => item.getAttribute(selectors.item) ?? '');
  return { menuText: menu?.textContent ?? null, overflowingItemIds };
};

// ── Paint recorder ──────────────────────────────────────────────────────────────────────────────
// A plain requestAnimationFrame loop, deliberately decoupled from React's render/commit/effect
// cycle. rAF fires once per frame, so every entry is a real painted frame — a faithful "filmstrip"
// of what was actually on screen, not a sample taken at some React lifecycle hook. The metric is
// paint, measured without React.
const paints: Record<string, Paint[]> = {};
const recordPaints = (name: string, frames: number) => {
  const filmstrip: Paint[] = [];
  const tick = () => {
    filmstrip.push(read());
    if (filmstrip.length < frames) {
      requestAnimationFrame(tick);
    } else {
      paints[name] = filmstrip;
    }
  };
  requestAnimationFrame(tick);
};

// Kicks the recorder off at mount. The layout effect runs before the first paint, so the first
// captured frame IS the first paint. React is used only to start the loop — never to measure.
const PaintRecorder: React.FC<{ name: string; frames: number }> = ({ name, frames }) => {
  // eslint-disable-next-line no-restricted-properties
  React.useLayoutEffect(() => recordPaints(name, frames), [name, frames]);
  return null;
};

// Collapse consecutive identical frames into the sequence of distinct painted states.
const distinctPaints = (filmstrip: Paint[]): Paint[] =>
  filmstrip.filter((paint, i) => i === 0 || JSON.stringify(paint) !== JSON.stringify(filmstrip[i - 1]));

// ── Opt-in / opt-out building blocks ──────────────────────────────────────────────────────────────
// Opt-in item mirrors useOverflowItem: it requests first-paint correctness by calling
// forceUpdateOverflow on registration. Opt-out only registers.
const Item: React.FC<{ id: string; optOut: boolean }> = ({ id, optOut }) => {
  const ref = React.useRef<HTMLButtonElement>(null);
  const registerItem = useOverflowContext(v => v.registerItem);
  const forceUpdateOverflow = useOverflowContext(v => v.forceUpdateOverflow);
  useIsomorphicLayoutEffect(() => {
    if (ref.current) {
      const unregister = registerItem({ element: ref.current, id, priority: 0 });
      if (!optOut) {
        forceUpdateOverflow();
      }
      return unregister;
    }
  }, [id, registerItem, forceUpdateOverflow, optOut]);
  return (
    <button ref={ref} {...{ [selectors.item]: id }} style={{ width: 50, height: 50, flexShrink: 0 }}>
      {id}
    </button>
  );
};

// Opt-in menu mirrors useOverflowMenu: it forces synchronously when overflowing so its own width is
// accounted before paint. Opt-out only registers (relying on addOverflowMenu's async pass).
const Menu: React.FC<{ optOut: boolean }> = ({ optOut }) => {
  const ref = React.useRef<HTMLButtonElement>(null);
  const overflowCount = useOverflowCount();
  const registerOverflowMenu = useOverflowContext(v => v.registerOverflowMenu);
  const forceUpdateOverflow = useOverflowContext(v => v.forceUpdateOverflow);
  const isOverflowing = overflowCount > 0;
  useIsomorphicLayoutEffect(() => {
    if (ref.current) {
      const unregister = registerOverflowMenu(ref.current);
      if (!optOut && isOverflowing) {
        forceUpdateOverflow();
      }
      return unregister;
    }
  }, [registerOverflowMenu, forceUpdateOverflow, isOverflowing, optOut]);
  if (!isOverflowing) {
    return null;
  }
  return (
    <button ref={ref} {...{ [selectors.menu]: '' }} style={{ width: 50, height: 50, flexShrink: 0 }}>
      +{overflowCount}
    </button>
  );
};

const Container: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <Overflow padding={0} overflowAxis="horizontal">
    <div
      {...{ [selectors.container]: '' }}
      style={{ display: 'flex', width: 300, whiteSpace: 'nowrap', overflow: 'hidden' }}
    >
      {children}
    </div>
  </Overflow>
);

// 300px container, 10 items @ 50px, menu @ 50px, padding 0 -> settled state hides items 5..9 (+5).
const ITEM_IDS = Array.from({ length: 10 }, (_, i) => String(i));
const FRAMES = 12;

const SETTLED: Paint = { menuText: '+5', overflowingItemIds: ['5', '6', '7', '8', '9'] };
const UNRESOLVED: Paint = { menuText: null, overflowingItemIds: [] };
const RESOLVED_ITEMS = ['5', '6', '7', '8', '9'];

const recordCase = (name: string, itemsOptOut: boolean, menuOptOut: boolean) => {
  mount(
    <>
      <Container>
        {ITEM_IDS.map(id => (
          <Item key={id} id={id} optOut={itemsOptOut} />
        ))}
        <Menu optOut={menuOptOut} />
      </Container>
      <PaintRecorder name={name} frames={FRAMES} />
    </>,
  );

  return cy.wrap(null, { timeout: 4000 }).should(() => {
    expect(paints[name], `${name}: recorded ${FRAMES} frames`).to.have.length(FRAMES);
  });
};

// Asserts on the distinct painted filmstrip: the first painted frame and the converged final frame.
// The middle of an opt-out filmstrip (e.g. a transient menu-count flicker) is timing-dependent and
// intentionally not asserted.
const assertFilmstrip = (name: string, assertFirst: (first: Paint) => void) => {
  cy.then(() => {
    const film = distinctPaints(paints[name]);
    const debug = `; filmstrip=${JSON.stringify(film)}`;
    assertFirst(film[0]);
    expect(film[film.length - 1], `${name}: converges to settled${debug}`).to.deep.equal(SETTLED);
  });
};

describe('Overflow paint probe', () => {
  beforeEach(() => {
    cy.viewport(700, 700);
  });

  // No opt-out: both item and menu request first-paint correctness, so the very first painted frame
  // is already fully settled (items hidden AND menu count correct). Filmstrip: [+5].
  it('no opt-out: first paint is fully settled', () => {
    recordCase('no-opt-out', false, false);
    assertFilmstrip('no-opt-out', first => {
      expect(first, 'no-opt-out: first paint is fully settled').to.deep.equal(SETTLED);
    });
  });

  // Menu opt-out: items still resolve at first paint, but the menu does not force, so its count is
  // corrected asynchronously and the menu number flickers. Filmstrip: [+4 -> +5]. We assert only the
  // stable part — items are correct on the first painted frame.
  it('menu opt-out: items correct at first paint (menu count may flicker)', () => {
    recordCase('menu-opt-out', false, true);
    assertFilmstrip('menu-opt-out', first => {
      expect(first.overflowingItemIds, 'menu-opt-out: items resolved at first paint').to.deep.equal(RESOLVED_ITEMS);
    });
  });

  // Items opt-out: nothing forces, so the first painted frame is unresolved (all items visible, no
  // menu); the ResizeObserver drives a later pass. Filmstrip: [none -> +5].
  it('items opt-out: first paint is unresolved, settles later', () => {
    recordCase('items-opt-out', true, false);
    assertFilmstrip('items-opt-out', first => {
      expect(first, 'items-opt-out: first paint is unresolved').to.deep.equal(UNRESOLVED);
    });
  });

  // Both opt-out: the worst case — first paint unresolved, then items + menu appear, then the menu
  // count settles. Filmstrip: [none -> (+4) -> +5]. First paint unresolved is the stable anchor.
  it('both opt-out: first paint is unresolved, settles later', () => {
    recordCase('both-opt-out', true, true);
    assertFilmstrip('both-opt-out', first => {
      expect(first, 'both-opt-out: first paint is unresolved').to.deep.equal(UNRESOLVED);
    });
  });
});
