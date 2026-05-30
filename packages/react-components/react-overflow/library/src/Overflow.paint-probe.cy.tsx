import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import {
  Overflow,
  OverflowItem,
  useOverflowMenu,
  type OverflowProps,
  type OverflowItemProps,
} from '@fluentui/react-overflow';
import type { DistributiveOmit } from '@fluentui/react-utilities';

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

const writePhaseSnapshot = (name: string, phase: 'layout' | 'effect' | 'raf1', snapshot: PaintPhaseSnapshot) => {
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
      </div>
      <PaintPhaseProbe name={name} />
    </>
  );
};

const assertProbeConvergence = (name: string, expected: PaintPhaseSnapshot) => {
  cy.get(`[${selectors.probe}="${name}"] [${selectors.probePhase}="raf1"]`).should($node => {
    expect($node.text(), 'raf1 snapshot marker').not.to.equal('');
  });

  cy.get(`[${selectors.probe}="${name}"]`).then($probe => {
    const read = (phase: 'layout' | 'effect' | 'raf1') => {
      const text = $probe.find(`[${selectors.probePhase}="${phase}"]`).text();
      return JSON.parse(text) as PaintPhaseSnapshot;
    };

    const layout = read('layout');
    const effect = read('effect');
    const raf1 = read('raf1');
    const debugSnapshots = `layout=${JSON.stringify(layout)} effect=${JSON.stringify(effect)} raf1=${JSON.stringify(
      raf1,
    )}`;

    expect(layout, `missing layout snapshot; ${debugSnapshots}`).to.exist;
    expect(effect, `missing effect snapshot; ${debugSnapshots}`).to.exist;
    expect(raf1, `missing first-raf snapshot; ${debugSnapshots}`).to.exist;
    expect(raf1, `unexpected first-raf snapshot; ${debugSnapshots}`).to.deep.equal(expected);
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
        <Container size={355}>
          <Item width="unset" id="0">
            Item 0
          </Item>
          <Item width="unset" id="1">
            Item 1
          </Item>
          <Item width="unset" id="2">
            Super Long Item 2
          </Item>
          <Item width="unset" id="3">
            3
          </Item>
          <Item id="4">Item 4</Item>
          <Item id="5">Item 5</Item>
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
});
