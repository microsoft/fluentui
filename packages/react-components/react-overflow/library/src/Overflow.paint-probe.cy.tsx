import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import { Overflow, OverflowItem, useOverflowMenu } from '@fluentui/react-overflow';

// Disable StrictMode so the probe measures a single mount/commit path.
const mount = (element: React.ReactElement) => mountBase(element, { strict: false });

const selectors = {
  container: 'data-test-container',
  item: 'data-test-item',
  menu: 'data-test-menu',
};

// The only thing this probe measures: what is on screen.
type Paint = { menuText: string | null; overflowingItemIds: string[] };

const ALL_ITEMS = Array.from({ length: 10 }, (_, i) => String(i));

const read = (): Paint => {
  const menu = document.querySelector<HTMLElement>(`[${selectors.menu}]`);
  const overflowingItemIds = Array.from(document.querySelectorAll<HTMLElement>(`[${selectors.item}]`))
    .filter(item => item.getAttribute('data-overflowing') !== null)
    .map(item => item.getAttribute(selectors.item) ?? '');
  return { menuText: menu?.textContent ?? null, overflowingItemIds };
};

// A plain requestAnimationFrame loop measuring actual painted frames.
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

const PaintRecorder: React.FC<{ name: string; frames: number }> = ({ name, frames }) => {
  // eslint-disable-next-line no-restricted-properties
  React.useLayoutEffect(() => recordPaints(name, frames), [name, frames]);
  return null;
};

const distinctPaints = (filmstrip: Paint[]): Paint[] =>
  filmstrip.filter((paint, i) => i === 0 || JSON.stringify(paint) !== JSON.stringify(filmstrip[i - 1]));

const visibleItems = (paint: Paint): string[] => ALL_ITEMS.filter(id => !paint.overflowingItemIds.includes(id));

type VisualSnapshot = { menu: string | null; visibleItems: string[] };
const toVisualSnapshots = (filmstrip: Paint[]): VisualSnapshot[] =>
  distinctPaints(filmstrip).map(paint => ({ menu: paint.menuText, visibleItems: visibleItems(paint) }));

// Real shipping components, used as-is.
const Item: React.FC<{ id: string }> = ({ id }) => (
  <OverflowItem id={id}>
    <button {...{ [selectors.item]: id }} style={{ width: 50, height: 50, flexShrink: 0 }}>
      {id}
    </button>
  </OverflowItem>
);

const Menu: React.FC = () => {
  const { isOverflowing, ref, overflowCount } = useOverflowMenu<HTMLButtonElement>();
  if (!isOverflowing) {
    return null;
  }
  return (
    <button ref={ref} {...{ [selectors.menu]: '' }} style={{ width: 50, height: 50, flexShrink: 0 }}>
      +{overflowCount}
    </button>
  );
};

// 300px container, 10 items @ 50px, menu @ 50px → settled state: items 0..4 visible (+5 hidden).
const Container: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <Overflow padding={0} overflowAxis="horizontal">
    <div {...{ [selectors.container]: '' }} style={{ display: 'flex', width: 300, whiteSpace: 'nowrap' }}>
      {children}
    </div>
  </Overflow>
);

const items = Array.from({ length: 10 }, (_, i) => <Item key={i} id={String(i)} />);
const FRAMES = 12;

const mountCase = (name: string, content: React.ReactNode) => {
  mount(
    <>
      <Container>{content}</Container>
      <PaintRecorder name={name} frames={FRAMES} />
    </>,
  );
};

const waitForFilmstrip = (name: string) =>
  cy.wrap(null, { timeout: 8000 }).should(() => {
    expect(paints[name], `${name}: paint recorder did not produce a filmstrip`).to.be.an('array');
    expect(paints[name].length, `${name}: expected ${FRAMES} frames`).to.be.at.least(FRAMES);
  });

const SETTLED: VisualSnapshot = { menu: '+5', visibleItems: ['0', '1', '2', '3', '4'] };

describe('Overflow paint probe', () => {
  beforeEach(() => {
    Object.keys(paints).forEach(key => delete paints[key]);
    cy.viewport(700, 700);
  });

  // Items and menu both call forceUpdateOverflow synchronously on registration.
  // The very first painted frame must already be fully settled: items hidden AND menu count correct.
  it('first paint is fully settled', () => {
    mountCase(
      'settled',
      <>
        {items}
        <Menu />
      </>,
    );
    waitForFilmstrip('settled');
    cy.then(() => {
      const snapshots = toVisualSnapshots(paints.settled);
      expect(snapshots, 'filmstrip should have exactly one distinct state').to.have.length(1);
      expect(snapshots[0]).to.deep.equal(SETTLED);
    });
  });
});
