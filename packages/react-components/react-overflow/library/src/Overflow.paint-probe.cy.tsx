import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import {
  Overflow,
  OverflowItem,
  useOverflowMenu,
  useOverflowContext,
  useOverflowCount,
  type OverflowProps,
  type OverflowItemProps,
} from '@fluentui/react-overflow';
import { useIsomorphicLayoutEffect, type DistributiveOmit } from '@fluentui/react-utilities';

// Disable StrictMode so the probe measures a single mount/commit path.
const mount = (element: React.ReactElement) => mountBase(element, { strict: false });

const selectors = {
  container: 'data-test-container',
  item: 'data-test-item',
  menu: 'data-test-menu',
  probe: 'data-test-paint-probe',
  probePhase: 'data-test-paint-phase',
};

type PaintPhaseSnapshot = {
  menuText: string | null;
  overflowingItemIds: string[];
};

const readPaintPhaseSnapshot = (): PaintPhaseSnapshot => {
  const menu = document.querySelector<HTMLElement>(`[${selectors.menu}]`);
  const overflowingItemIds = Array.from(document.querySelectorAll<HTMLElement>(`[${selectors.item}]`))
    .filter(item => item.getAttribute('data-overflowing') !== null)
    .map(item => item.getAttribute(selectors.item) ?? '');

  return {
    menuText: menu?.textContent ?? null,
    overflowingItemIds,
  };
};

const writePhaseSnapshot = (
  name: string,
  phase: 'layout' | 'effect' | 'raf1' | 'raf2',
  snapshot: PaintPhaseSnapshot,
) => {
  const probeRoot = document.querySelector<HTMLElement>(`[${selectors.probe}="${name}"]`);
  const phaseNode = probeRoot?.querySelector<HTMLElement>(`[${selectors.probePhase}="${phase}"]`);

  if (phaseNode) {
    phaseNode.textContent = JSON.stringify(snapshot);
  }
};

const Container: React.FC<{ children?: React.ReactNode; size?: number } & Omit<OverflowProps, 'children'>> = ({
  children,
  size,
  ...userProps
}) => {
  const selector = {
    [selectors.container]: '',
  };

  return (
    <Overflow padding={0} {...userProps} overflowAxis="horizontal">
      <div
        {...selector}
        style={{
          display: 'flex',
          width: size,
          border: '1px dashed red',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }}
      >
        {children}
      </div>
    </Overflow>
  );
};

type ItemProps = { children?: React.ReactNode; width?: number | string } & DistributiveOmit<
  OverflowItemProps,
  'children'
>;

const Item = ({ children, width, ...overflowItemProps }: ItemProps) => {
  const selector = {
    [selectors.item]: overflowItemProps.id,
  };

  return (
    <OverflowItem {...overflowItemProps}>
      <button {...selector} style={{ width: width ?? 50, height: 50, flexShrink: 0 }}>
        {children}
      </button>
    </OverflowItem>
  );
};

const Menu = () => {
  const { isOverflowing, ref, overflowCount } = useOverflowMenu<HTMLButtonElement>();
  const selector = {
    [selectors.menu]: '',
  };

  if (!isOverflowing) {
    return null;
  }

  return (
    <button {...selector} ref={ref} style={{ width: 50, height: 50, flexShrink: 0 }}>
      +{overflowCount}
    </button>
  );
};

// Opt-out hooks: equivalent to useOverflowItem / useOverflowMenu but WITHOUT requesting first-paint
// correctness (no forceUpdateOverflow on registration). This is how a hot-path consumer opts the
// container out of the synchronous first-paint pass — no Overflow prop, just a custom item/menu hook.
const useOptOutOverflowItem = <TElement extends HTMLElement>(id: string): React.RefObject<TElement | null> => {
  const ref = React.useRef<TElement | null>(null);
  const registerItem = useOverflowContext(v => v.registerItem);
  useIsomorphicLayoutEffect(() => {
    if (ref.current) {
      return registerItem({ element: ref.current, id, priority: 0 });
    }
  }, [id, registerItem]);
  return ref;
};

const useOptOutOverflowMenu = <TElement extends HTMLElement>() => {
  const ref = React.useRef<TElement | null>(null);
  const overflowCount = useOverflowCount();
  const registerOverflowMenu = useOverflowContext(v => v.registerOverflowMenu);
  const isOverflowing = overflowCount > 0;
  useIsomorphicLayoutEffect(() => {
    if (ref.current) {
      return registerOverflowMenu(ref.current);
    }
  }, [registerOverflowMenu, isOverflowing]);
  return { ref, overflowCount, isOverflowing };
};

const OptOutItem = ({ children, width, id }: { children?: React.ReactNode; width?: number; id: string }) => {
  const ref = useOptOutOverflowItem<HTMLButtonElement>(id);
  return (
    <button ref={ref} {...{ [selectors.item]: id }} style={{ width: width ?? 50, height: 50, flexShrink: 0 }}>
      {children}
    </button>
  );
};

const OptOutMenu = () => {
  const { isOverflowing, ref, overflowCount } = useOptOutOverflowMenu<HTMLButtonElement>();
  if (!isOverflowing) {
    return null;
  }
  return (
    <button {...{ [selectors.menu]: '' }} ref={ref} style={{ width: 50, height: 50, flexShrink: 0 }}>
      +{overflowCount}
    </button>
  );
};

const PaintPhaseProbe: React.FC<{ name: string }> = ({ name }) => {
  // The probe deliberately distinguishes the layout phase from the passive effect phase,
  // so it must use the non-isomorphic variant.
  // eslint-disable-next-line no-restricted-properties
  React.useLayoutEffect(() => {
    writePhaseSnapshot(name, 'layout', readPaintPhaseSnapshot());
  }, [name]);

  React.useEffect(() => {
    writePhaseSnapshot(name, 'effect', readPaintPhaseSnapshot());

    requestAnimationFrame(() => {
      writePhaseSnapshot(name, 'raf1', readPaintPhaseSnapshot());
      // Second frame: used to assert the first-rAF snapshot is already settled (no drift),
      // i.e. it is the converged value rather than a transient mid-convergence reading.
      requestAnimationFrame(() => {
        writePhaseSnapshot(name, 'raf2', readPaintPhaseSnapshot());
      });
    });
  }, [name]);

  return null;
};

const PaintPhaseProbeHarness: React.FC<{ name: string; children: React.ReactNode }> = ({ name, children }) => {
  return (
    <>
      {children}
      <div {...{ [selectors.probe]: name }} style={{ display: 'none' }}>
        <pre {...{ [selectors.probePhase]: 'layout' }} />
        <pre {...{ [selectors.probePhase]: 'effect' }} />
        <pre {...{ [selectors.probePhase]: 'raf1' }} />
        <pre {...{ [selectors.probePhase]: 'raf2' }} />
      </div>
      <PaintPhaseProbe name={name} />
    </>
  );
};

const assertProbeConvergence = (name: string, expected: PaintPhaseSnapshot) => {
  cy.get(`[${selectors.probe}="${name}"] [${selectors.probePhase}="raf1"]`).should($node => {
    expect($node.text(), 'raf1 snapshot marker').not.to.equal('');
  });

  cy.get(`[${selectors.probe}="${name}"] [${selectors.probePhase}="raf2"]`).should($node => {
    expect($node.text(), 'raf2 snapshot marker').not.to.equal('');
  });

  cy.get(`[${selectors.probe}="${name}"]`).then($probe => {
    const read = (phase: 'layout' | 'effect' | 'raf1' | 'raf2') => {
      const text = $probe.find(`[${selectors.probePhase}="${phase}"]`).text();
      return JSON.parse(text) as PaintPhaseSnapshot;
    };

    const raf1 = read('raf1');
    const raf2 = read('raf2');
    const debugSnapshots = `raf1=${JSON.stringify(raf1)} raf2=${JSON.stringify(raf2)}`;

    // First-paint correctness: the snapshot is already the expected final value by the first rAF.
    expect(raf1, `unexpected first-raf snapshot; ${debugSnapshots}`).to.deep.equal(expected);
    // Convergence: the first-rAF value is settled, not a transient — it does not drift next frame.
    expect(raf2, `first-raf snapshot drifted on the next frame; ${debugSnapshots}`).to.deep.equal(raf1);
  });
};

describe('Overflow paint probe', () => {
  beforeEach(() => {
    cy.viewport(700, 700);
  });

  it('is already final by first rAF on initial overflowing mount', { retries: 0 }, () => {
    const mapHelper = new Array(10).fill(0).map((_, i) => i);

    mount(
      <PaintPhaseProbeHarness name="initial-overflow">
        <Container size={300}>
          {mapHelper.map(i => (
            <Item key={i} id={i.toString()}>
              {i}
            </Item>
          ))}
          <Menu />
        </Container>
      </PaintPhaseProbeHarness>,
    );

    assertProbeConvergence('initial-overflow', {
      menuText: '+5',
      overflowingItemIds: ['5', '6', '7', '8', '9'],
    });
  });

  it('is already final by first rAF for a slightly wider initial-overflow case', { retries: 0 }, () => {
    const mapHelper = new Array(10).fill(0).map((_, i) => i);

    mount(
      <PaintPhaseProbeHarness name="initial-overflow-wide">
        <Container size={350}>
          {mapHelper.map(i => (
            <Item key={i} id={i.toString()}>
              {i}
            </Item>
          ))}
          <Menu />
        </Container>
      </PaintPhaseProbeHarness>,
    );

    assertProbeConvergence('initial-overflow-wide', {
      menuText: '+4',
      overflowingItemIds: ['6', '7', '8', '9'],
    });
  });

  it('is already final by first rAF for an uneven-width initial-overflow case', { retries: 0 }, () => {
    mount(
      <PaintPhaseProbeHarness name="initial-overflow-uneven">
        {/* Explicit, uneven, font-independent widths. Text-content widths vary with the host's
            installed fonts (narrower on CI), shifting the overflow boundary and making the
            expected snapshot non-deterministic across environments. */}
        <Container size={355}>
          <Item width={40} id="0">
            Item 0
          </Item>
          <Item width={55} id="1">
            Item 1
          </Item>
          <Item width={95} id="2">
            Super Long Item 2
          </Item>
          <Item width={70} id="3">
            3
          </Item>
          <Item width={65} id="4">
            Item 4
          </Item>
          <Item width={80} id="5">
            Item 5
          </Item>
          <Menu />
        </Container>
      </PaintPhaseProbeHarness>,
    );

    assertProbeConvergence('initial-overflow-uneven', {
      menuText: '+2',
      overflowingItemIds: ['4', '5'],
    });
  });

  it('is already final by first rAF when the menu never becomes visible', { retries: 0 }, () => {
    const mapHelper = new Array(5).fill(0).map((_, i) => i);

    mount(
      <PaintPhaseProbeHarness name="initial-no-menu">
        <Container size={500}>
          {mapHelper.map(i => (
            <Item key={i} id={i.toString()}>
              {i}
            </Item>
          ))}
          <Menu />
        </Container>
      </PaintPhaseProbeHarness>,
    );

    assertProbeConvergence('initial-no-menu', {
      menuText: null,
      overflowingItemIds: [],
    });
  });

  it('defers overflow past first paint when items and menu opt out of first-paint correctness', { retries: 0 }, () => {
    const mapHelper = new Array(10).fill(0).map((_, i) => i);

    mount(
      <PaintPhaseProbeHarness name="opt-out">
        <Container size={300}>
          {mapHelper.map(i => (
            <OptOutItem key={i} id={i.toString()}>
              {i}
            </OptOutItem>
          ))}
          <OptOutMenu />
        </Container>
      </PaintPhaseProbeHarness>,
    );

    // The opt-out hooks never call forceUpdateOverflow, so nothing requests the synchronous
    // first-paint pass. At the synchronous commit (layout phase) overflow is therefore unresolved —
    // the eager cases above collapse items here instead. The ResizeObserver resolves it afterwards.
    cy.get(`[${selectors.probe}="opt-out"] [${selectors.probePhase}="raf2"]`).should($node => {
      expect($node.text(), 'probe snapshots written').not.to.equal('');
    });
    cy.get(`[${selectors.probe}="opt-out"]`).then($probe => {
      const layout = JSON.parse($probe.find(`[${selectors.probePhase}="layout"]`).text()) as PaintPhaseSnapshot;
      expect(layout, 'first paint (layout) is unresolved when opting out of first-paint correctness').to.deep.equal({
        menuText: null,
        overflowingItemIds: [],
      });
    });

    // It still resolves eventually — the ResizeObserver drives the deferred overflow pass.
    cy.get(`[${selectors.menu}]`).should('exist');
  });
});
