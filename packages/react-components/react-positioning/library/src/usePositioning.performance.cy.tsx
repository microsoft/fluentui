import * as React from 'react';
import { createPortal, flushSync } from 'react-dom';
import { mount } from '@fluentui/scripts-cypress';
import type { PositioningImperativeRef, PositioningOptions } from './types';
import { usePositioning as useReplacement } from './usePositioning';
// @ts-expect-error Resolved to the immutable baseline source by the benchmark's Cypress alias.
import { usePositioning as useOracle } from '@positioning-oracle/usePositioning';

const engines = ['oracle', 'replacement'] as const;
type Engine = (typeof engines)[number];
/**
 * `flat`: targets are fixed children of the body, the cheapest DOM for ancestor walks.
 * `nested`: targets sit 12 levels deep inside a scroll container, with the surfaces rendered at the end of the body
 * like portals. This is the common application shape and exercises clipping, containing-block and scroll-parent
 * traversal.
 */
const layouts = ['flat', 'nested'] as const;
type Layout = (typeof layouts)[number];
type Operation = 'imperative' | 'scroll' | 'resize';
const operations: Operation[] = ['imperative', 'scroll', 'resize'];
type Workload = `${Layout}/${'initialize-24' | Operation}`;

const instanceCount = 24;
const nestingDepth = 12;
const warmupRounds = 5;
const measuredRounds = 24;
const initializationWarmups = 3;
// Mounting dominates initialization and is bimodal on some hosts, so it needs more samples than updates
const measuredInitializations = 16;
const boundary = { x: 20, y: 20, width: 1240, height: 760 };

type Sample = {
  round: number;
  startedAt: number;
  completedIds: Set<number>;
  latencies: number[];
  resolve: (result: SampleResult) => void;
};
type SampleResult = { round: number; batchMs: number; instanceMs: number[] };

class PositioningBenchmarkTracker {
  public results: Record<Engine, Partial<Record<Workload, SampleResult[]>>> = { oracle: {}, replacement: {} };
  private active = new Map<Engine, Sample>();
  private browserWindow: Window | null = null;

  public setWindow(browserWindow: Window): void {
    this.browserWindow = browserWindow;
  }

  public get window(): Window {
    if (!this.browserWindow) {
      throw new Error('Browser window not available');
    }
    return this.browserWindow;
  }

  public now(): number {
    return this.window.performance.now();
  }

  public begin(engine: Engine, workload: Workload, round: number, retain = true): Promise<SampleResult> {
    const startedAt = this.now();
    return new Promise((resolve, reject) => {
      const timeout = this.window.setTimeout(() => reject(new Error(`${engine} ${workload} timed out`)), 10000);
      this.active.set(engine, {
        round,
        startedAt,
        completedIds: new Set(),
        latencies: [],
        resolve: result => {
          this.window.clearTimeout(timeout);
          if (retain) {
            (this.results[engine][workload] ??= []).push(result);
          }
          resolve(result);
        },
      });
    });
  }

  public settleFrame(): Promise<void> {
    return new Promise(resolve => {
      this.window.requestAnimationFrame(() => {
        this.window.requestAnimationFrame(() => resolve());
      });
    });
  }

  public record(engine: Engine, index: number): void {
    const sample = this.active.get(engine);
    if (!sample || sample.completedIds.has(index)) {
      return;
    }
    sample.completedIds.add(index);
    sample.latencies.push(this.now() - sample.startedAt);
    if (sample.completedIds.size === instanceCount) {
      this.active.delete(engine);
      sample.resolve({ round: sample.round, batchMs: this.now() - sample.startedAt, instanceMs: sample.latencies });
    }
  }
}

function optionsFor(index: number): PositioningOptions {
  switch (index % 5) {
    case 0:
      return { position: 'below', offset: 8 };
    case 1:
      return { position: 'after', align: 'top', flipBoundary: boundary, fallbackPositions: ['above-start'] };
    case 2:
      return { position: 'above', align: 'end', overflowBoundary: boundary, overflowBoundaryPadding: 12, pinned: true };
    case 3:
      return { position: 'below', align: 'start', autoSize: true, flipBoundary: boundary };
    default:
      return { position: 'before', align: 'bottom', arrowPadding: 6, offset: { mainAxis: 5, crossAxis: 3 } };
  }
}

function targetPosition(index: number, round: number) {
  const edge = round % 2 === 1;
  return {
    left: edge ? 1160 - (index % 4) * 12 : 80 + (index % 8) * 140,
    top: edge ? 680 - (index % 3) * 10 : 80 + (Math.floor(index / 8) % 3) * 220,
  };
}

/* eslint-disable @typescript-eslint/naming-convention */
type PositionedItemProps = {
  engine: Engine;
  layout: Layout;
  index: number;
  generation: number;
  tracker: PositioningBenchmarkTracker;
  refs: React.RefObject<Array<PositioningImperativeRef | null> | null>;
  portal: HTMLElement;
};

/** Wraps the children in `depth` unstyled blocks, the outermost being the scroll container that moves */
function Nesting({ depth, children }: { depth: number; children: React.ReactNode }): React.ReactElement {
  return depth ? (
    <div style={{ paddingTop: 2 }}>
      <Nesting depth={depth - 1}>{children}</Nesting>
    </div>
  ) : (
    <>{children}</>
  );
}

function PositionedItem({ engine, layout, index, generation, tracker, refs, portal }: PositionedItemProps) {
  const usePositioning = engine === 'oracle' ? useOracle : useReplacement;
  const setPositioningRef = React.useCallback(
    (value: PositioningImperativeRef | null) => {
      refs.current![index] = value;
    },
    [refs, index],
  );
  const { targetRef, containerRef, arrowRef } = usePositioning({
    ...optionsFor(index),
    positioningRef: setPositioningRef,
    onPositioningEnd: () => tracker.record(engine, index),
  });
  const position = targetPosition(index, generation);
  const hasArrow = index % 5 === 2 || index % 5 === 4;
  const size = index % 5 === 3 ? { width: 280, height: 180 } : { width: 120, height: 72 };
  const anchor = `${engine}-${index}`;
  const surface = (
    <div ref={containerRef} data-bench-floating={anchor} style={{ width: size.width, height: size.height }}>
      {hasArrow && <span ref={arrowRef} style={{ position: 'absolute', width: 8, height: 8 }} />}
    </div>
  );

  return layout === 'flat' ? (
    <>
      <button
        ref={targetRef}
        data-bench-anchor={anchor}
        style={{ position: 'fixed', ...position, width: 64, height: 32 }}
      />
      {surface}
    </>
  ) : (
    <>
      <div
        data-bench-anchor={anchor}
        style={{ position: 'fixed', ...position, width: 96, height: 72, overflow: 'auto', scrollbarWidth: 'none' }}
      >
        <Nesting depth={nestingDepth}>
          <button ref={targetRef} style={{ width: 64, height: 32 }} />
          <div style={{ height: 120 }} />
        </Nesting>
      </div>
      {createPortal(surface, portal)}
    </>
  );
}

function BenchmarkHarness({
  tracker,
  refs,
  controls,
}: {
  tracker: PositioningBenchmarkTracker;
  refs: Record<Engine, React.RefObject<Array<PositioningImperativeRef | null> | null>>;
  controls: { show: (active: { engine: Engine; layout: Layout; generation: number } | null) => void };
}) {
  const [active, setActive] = React.useState<{ engine: Engine; layout: Layout; generation: number } | null>(null);
  const [portal, setPortal] = React.useState<HTMLElement | null>(null);
  controls.show = next => flushSync(() => setActive(next));
  return (
    <div data-benchmark-root>
      {active &&
        portal &&
        Array.from({ length: instanceCount }, (_, index) => (
          <PositionedItem
            key={`${active.engine}-${active.layout}-${index}-${active.generation}`}
            engine={active.engine}
            layout={active.layout}
            index={index}
            generation={active.generation}
            tracker={tracker}
            refs={refs[active.engine]}
            portal={portal}
          />
        ))}
      <div data-bench-portal ref={setPortal} />
    </div>
  );
}

function randomGenerator(seed: number) {
  let value = seed % 4294967296;
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 0x100000000;
  };
}

function shuffle<T>(values: readonly T[], random: () => number): T[] {
  const result = [...values];
  for (let index = result.length - 1; index > 0; index--) {
    const other = Math.floor(random() * (index + 1));
    [result[index], result[other]] = [result[other], result[index]];
  }
  return result;
}

/* eslint-enable @typescript-eslint/naming-convention */

describe('usePositioning end-to-end performance benchmark', () => {
  it('compares the immutable Floating UI oracle and replacement in randomized paired browser workloads', function () {
    this.timeout(360000);
    cy.viewport(1280, 800);
    const tracker = new PositioningBenchmarkTracker();
    const refs = {
      oracle: React.createRef<Array<PositioningImperativeRef | null>>(),
      replacement: React.createRef<Array<PositioningImperativeRef | null>>(),
    };
    refs.oracle.current = [];
    refs.replacement.current = [];
    const seed = Number(Cypress.env('positioningBenchSeed')) || 36870;
    const random = randomGenerator(seed);
    const controls = {
      show: (_active: { engine: Engine; layout: Layout; generation: number } | null) => {
        throw new Error('Benchmark harness is not mounted');
      },
    };
    let benchmarkReport: object | undefined;
    cy.window().then(browserWindow => {
      tracker.setWindow(browserWindow);
    });
    mount(<BenchmarkHarness tracker={tracker} refs={refs} controls={controls} />);
    cy.get('[data-bench-portal]').should('exist');
    cy.then({ timeout: 360000 }, async () => {
      const doc = tracker.window.document;
      const initialize = async (engine: Engine, layout: Layout, round: number, retain: boolean) => {
        controls.show(null);
        await tracker.settleFrame();
        const wait = tracker.begin(engine, `${layout}/initialize-24`, round, retain);
        controls.show({ engine, layout, generation: round });
        await wait;
        expect(doc.querySelectorAll('[data-bench-floating]')).to.have.length(instanceCount);
        const other = engine === 'oracle' ? 'replacement' : 'oracle';
        expect(doc.querySelectorAll(`[data-bench-anchor^="${other}-"]`)).to.have.length(0);
        await tracker.settleFrame();
      };

      const runOperation = async (layout: Layout, operation: Operation, round: number, retain: boolean) => {
        for (const engine of shuffle(engines, random)) {
          await initialize(engine, layout, round, false);
          const anchors = Array.from({ length: instanceCount }, (_, index) => {
            const anchor = doc.querySelector<HTMLElement>(`[data-bench-anchor="${engine}-${index}"]`)!;
            const point = targetPosition(index, round + 1);
            anchor.style.left = `${point.left}px`;
            anchor.style.top = `${point.top}px`;
            return anchor;
          });
          const wait = tracker.begin(engine, `${layout}/${operation}`, round, retain);
          if (operation === 'imperative') {
            refs[engine].current!.forEach(ref => ref?.updatePosition());
          } else if (operation === 'scroll' && layout === 'nested') {
            // Element scrolling reaches the managers through their scroll-parent listeners
            anchors.forEach(anchor => anchor.dispatchEvent(new Event('scroll')));
          } else {
            tracker.window.dispatchEvent(new Event(operation));
          }
          await wait;
          await tracker.settleFrame();
        }
      };

      for (let round = 0; round < initializationWarmups + measuredInitializations; round++) {
        for (const layout of shuffle(layouts, random)) {
          for (const engine of shuffle(engines, random)) {
            await initialize(engine, layout, round, round >= initializationWarmups);
          }
        }
      }
      for (let round = 0; round < warmupRounds + measuredRounds; round++) {
        for (const [layout, operation] of shuffle(
          layouts.flatMap(name => operations.map(operationName => [name, operationName] as const)),
          random,
        )) {
          await runOperation(layout, operation, round, round >= warmupRounds);
        }
      }

      controls.show(null);
      const browserWindow = tracker.window;
      benchmarkReport = {
        seed,
        generatedAt: new Date().toISOString(),
        metadata: {
          activeEngineCount: 1,
          instanceCount,
          nestingDepth,
          userAgent: browserWindow.navigator.userAgent,
          hardwareConcurrency: browserWindow.navigator.hardwareConcurrency,
          devicePixelRatio: browserWindow.devicePixelRatio,
          viewport: { width: browserWindow.innerWidth, height: browserWindow.innerHeight },
        },
        baseline: String(Cypress.env('positioningBenchBaseline')),
        // Raw paired samples, statistics are computed by scripts/positioning-benchmark.mjs
        workloads: Object.fromEntries(
          layouts.flatMap(layout =>
            (['initialize-24', ...operations] as const).map(name => {
              const workload: Workload = `${layout}/${name}`;
              const oracle = tracker.results.oracle[workload] ?? [];
              const replacement = tracker.results.replacement[workload] ?? [];
              if (oracle.length !== replacement.length || !oracle.length) {
                throw new Error(`${workload}: paired samples are missing or mismatched`);
              }
              return [workload, { samples: { oracle, replacement } }];
            }),
          ),
        ),
      };
      return benchmarkReport;
    });
    cy.then(() => {
      if (!benchmarkReport) {
        throw new Error('Performance benchmark report was not generated');
      }
      return cy.writeFile('dist/positioning-perf/benchmark.json', benchmarkReport, { log: false });
    });
  });
});
