import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import type { OverflowItemProps, UseOverflowMenuOptions } from '@fluentui/react-overflow';
import { Overflow, OverflowItem, useOverflowMenu } from '@fluentui/react-overflow';

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

const ALL_ITEMS = Array.from({ length: 10 }, (_, i) => String(i));

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
  paints[name] = filmstrip;
  const tick = () => {
    filmstrip.push(read());

    if (filmstrip.length < frames) {
      requestAnimationFrame(tick);
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

const distinctSequence = <T,>(values: T[]): T[] =>
  values.filter((value, i) => i === 0 || JSON.stringify(value) !== JSON.stringify(values[i - 1]));

const visibleItems = (paint: Paint): string[] => ALL_ITEMS.filter(id => !paint.overflowingItemIds.includes(id));
type VisualSnapshot = {
  menu: string | null;
  visibleItems: string[];
};

type SnapshotMatrix = {
  allowedMenuSequences: Array<Array<string | null>>;
  allowedVisibleSequences: string[][][];
  final: VisualSnapshot;
  disallowAllVisible?: boolean;
};

const toVisualSnapshots = (filmstrip: Paint[]): VisualSnapshot[] => {
  return distinctPaints(filmstrip).map(paint => ({
    menu: paint.menuText,
    visibleItems: visibleItems(paint),
  }));
};

// Real shipping components, used as-is.
const Item: React.FC<{ id: string } & Pick<OverflowItemProps, 'defer'>> = ({ id, defer }) => (
  <OverflowItem id={id} defer={defer}>
    <button {...{ [selectors.item]: id }} style={{ width: 50, height: 50, flexShrink: 0 }}>
      {id}
    </button>
  </OverflowItem>
);

const Menu: React.FC<UseOverflowMenuOptions> = options => {
  const { isOverflowing, ref, overflowCount } = useOverflowMenu<HTMLButtonElement>(options);
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
    <div {...{ [selectors.container]: '' }} style={{ display: 'flex', width: 300, whiteSpace: 'nowrap' }}>
      {children}
    </div>
  </Overflow>
);

// 300px container, 10 items @ 50px, menu @ 50px, padding 0 -> settled state hides items 5..9 (+5).
const createItem = (defer: boolean) =>
  Array.from({ length: 10 }, (_, i) => <Item key={i} id={String(i)} defer={defer} />);
const FRAMES = 12;

const mountCase = (name: string, content: React.ReactNode) => {
  mount(
    <>
      <Container>{content}</Container>
      <PaintRecorder name={name} frames={FRAMES} />
    </>,
  );
};

const waitForFilmstrip = (name: string) => {
  return cy.wrap(null, { timeout: 8000 }).should(() => {
    expect(paints[name], `${name}: paint recorder did not produce a filmstrip`).to.be.an('array');
    expect(
      paints[name].length,
      `${name}: expected ${FRAMES} recorded paint frames before assertion, got ${paints[name].length}`,
    ).to.be.at.least(FRAMES);
  });
};

const recordCase = (name: string, content: React.ReactNode) => {
  mountCase(name, content);
  return waitForFilmstrip(name);
};

const assertSnapshotMatrix = (name: string, matrix: SnapshotMatrix) => {
  cy.then(() => {
    const snapshots = toVisualSnapshots(paints[name]);
    const menuSeq = distinctSequence(snapshots.map(s => s.menu));
    const visibleSeq = distinctSequence(snapshots.map(s => s.visibleItems));
    const hasAllVisible = snapshots.some(s => s.visibleItems.length === ALL_ITEMS.length);
    const debug =
      `; snapshots=${JSON.stringify(snapshots)}` +
      `; menuSeq=${JSON.stringify(menuSeq)}` +
      `; visibleSeq=${JSON.stringify(visibleSeq)}`;

    const menuAllowed = matrix.allowedMenuSequences.some(seq => JSON.stringify(seq) === JSON.stringify(menuSeq));
    expect(menuAllowed, `${name}: menu snapshot sequence not allowed${debug}`).to.equal(true);

    const visibleAllowed = matrix.allowedVisibleSequences.some(
      seq => JSON.stringify(seq) === JSON.stringify(visibleSeq),
    );
    expect(visibleAllowed, `${name}: visible snapshot sequence not allowed${debug}`).to.equal(true);

    expect(snapshots[snapshots.length - 1], `${name}: final snapshot mismatch${debug}`).to.deep.equal(matrix.final);

    if (matrix.disallowAllVisible) {
      expect(hasAllVisible, `${name}: all-items-visible snapshot is not allowed${debug}`).to.equal(false);
    }
  });
};

const assertNoOptOutTransitions = (name: string) => {
  assertSnapshotMatrix(name, {
    allowedMenuSequences: [['+5']],
    allowedVisibleSequences: [[['0', '1', '2', '3', '4']]],
    final: { menu: '+5', visibleItems: ['0', '1', '2', '3', '4'] },
    disallowAllVisible: true,
  });
};

const assertMenuOptOutTransitions = (name: string) => {
  assertSnapshotMatrix(name, {
    allowedMenuSequences: [['+5'], [null, '+5'], ['+4', '+5']],
    allowedVisibleSequences: [
      [['0', '1', '2', '3', '4']],
      [
        ['0', '1', '2', '3', '4', '5'],
        ['0', '1', '2', '3', '4'],
      ],
    ],
    final: { menu: '+5', visibleItems: ['0', '1', '2', '3', '4'] },
    disallowAllVisible: true,
  });
};

const assertItemsOptOutTransitions = (name: string) => {
  assertSnapshotMatrix(name, {
    allowedMenuSequences: [['+5'], [null, '+5'], ['+4', '+5'], [null, '+4', '+5']],
    allowedVisibleSequences: [
      [['0', '1', '2', '3', '4']],
      [
        ['0', '1', '2', '3', '4', '5'],
        ['0', '1', '2', '3', '4'],
      ],
      [
        ['0', '1', '2', '3', '4', '5', '6'],
        ['0', '1', '2', '3', '4', '5'],
        ['0', '1', '2', '3', '4'],
      ],
    ],
    final: { menu: '+5', visibleItems: ['0', '1', '2', '3', '4'] },
    disallowAllVisible: true,
  });
};

const assertBothOptOutTransitions = (name: string) => {
  assertSnapshotMatrix(name, {
    allowedMenuSequences: [['+5'], [null, '+5'], ['+4', '+5'], [null, '+4', '+5']],
    allowedVisibleSequences: [
      [['0', '1', '2', '3', '4']],
      [
        ['0', '1', '2', '3', '4', '5'],
        ['0', '1', '2', '3', '4'],
      ],
      [
        ['0', '1', '2', '3', '4', '5', '6'],
        ['0', '1', '2', '3', '4', '5'],
        ['0', '1', '2', '3', '4'],
      ],
    ],
    final: { menu: '+5', visibleItems: ['0', '1', '2', '3', '4'] },
    disallowAllVisible: true,
  });
};

describe('Overflow paint probe', () => {
  beforeEach(() => {
    Object.keys(paints).forEach(key => {
      delete paints[key];
    });

    cy.viewport(700, 700);
  });

  // No opt-out: both item and menu request first-paint correctness, so the very first painted frame
  // is already fully settled (items hidden AND menu count correct). Filmstrip: [+5].
  it('no opt-out: first paint is fully settled', () => {
    recordCase(
      'no-opt-out',
      <>
        {createItem(false)}
        <Menu />
      </>,
    );
    assertNoOptOutTransitions('no-opt-out');
  });

  // Menu opt-out: items still resolve at first paint, but the menu does not force, so its count is
  // corrected asynchronously and the menu number flickers. Filmstrip: [+4 -> +5]. We assert only the
  // stable part — items are correct on the first painted frame.
  it('menu opt-out: items correct at first paint (menu count may flicker)', () => {
    recordCase(
      'menu-opt-out',
      <>
        {createItem(false)}
        <Menu defer />
      </>,
    );
    assertMenuOptOutTransitions('menu-opt-out');
  });

  // Both opt-out: menu/count can settle in multiple steps, but all-items-visible flicker is not
  // allowed and item transitions must be monotonic shrinks only.
  it('both opt-out: menu accommodation without all-items-visible flicker', () => {
    recordCase(
      'both-opt-out',
      <>
        {createItem(true)}
        <Menu defer />
      </>,
    );
    assertBothOptOutTransitions('both-opt-out');
  });

  // Items opt-out: all-items-visible flicker is not allowed. Items may shrink in one or more steps
  // to accommodate menu space.
  it('items opt-out: menu accommodation without all-items-visible flicker', () => {
    recordCase(
      'items-opt-out',
      <>
        {createItem(true)}
        <Menu />
      </>,
    );
    assertItemsOptOutTransitions('items-opt-out');
  });
});
