import * as React from 'react';
import { flushSync } from 'react-dom';
import { mount } from '@fluentui/scripts-cypress';
import type { PositioningImperativeRef, PositioningOptions } from './types';
import { usePositioning as useReplacement } from './usePositioning';
// @ts-expect-error Resolved to the immutable baseline source by the benchmark's Cypress alias.
import { usePositioning as useOracle } from '@positioning-oracle/usePositioning';

const engines = ['oracle', 'replacement'] as const;
type Engine = (typeof engines)[number];
type Operation = 'imperative' | 'scroll' | 'resize';
type Workload = 'initialize-24' | Operation;

const instanceCount = 24;
const warmupRounds = 5;
const measuredRounds = 24;
const initializationWarmups = 2;
const measuredInitializations = 8;
const boundary = { x: 20, y: 20, width: 1240, height: 760 };

type Sample = {
  engine: Engine;
  workload: Workload;
  round: number;
  startedAt: number;
  expected: number;
  completedIds: Set<number>;
  latencies: number[];
  resolve: (result: SampleResult) => void;
};
type SampleResult = { round: number; batchMs: number; instanceMs: number[] };

class PositioningBenchmarkTracker {
  public results: Record<Engine, Record<Workload, SampleResult[]>> = {
    oracle: { 'initialize-24': [], imperative: [], scroll: [], resize: [] },
    replacement: { 'initialize-24': [], imperative: [], scroll: [], resize: [] },
  };
  private active = new Map<Engine, Sample>();
  private browserWindow: Window | null = null;

  public setWindow(browserWindow: Window): void {
    this.browserWindow = browserWindow;
  }

  public now(): number {
    if (!this.browserWindow) {
      throw new Error('Browser window not available');
    }
    return this.browserWindow.performance.now();
  }

  public get document(): Document {
    if (!this.browserWindow) {
      throw new Error('Browser window not available');
    }
    return this.browserWindow.document;
  }

  public begin(engine: Engine, workload: Workload, round: number, retain = true): Promise<SampleResult> {
    const startedAt = this.now();
    return new Promise((resolve, reject) => {
      const timeout = this.browserWindow!.setTimeout(() => reject(new Error(`${engine} ${workload} timed out`)), 10000);
      this.active.set(engine, {
        engine,
        workload,
        round,
        startedAt,
        expected: instanceCount,
        completedIds: new Set(),
        latencies: [],
        resolve: result => {
          this.browserWindow!.clearTimeout(timeout);
          if (retain) {
            this.results[engine][workload].push(result);
          }
          resolve(result);
        },
      });
    });
  }

  public dispatch(operation: 'scroll' | 'resize'): void {
    if (!this.browserWindow) {
      throw new Error('Browser window not available');
    }
    this.browserWindow.dispatchEvent(new Event(operation));
  }

  public settleFrame(): Promise<void> {
    if (!this.browserWindow) {
      throw new Error('Browser window not available');
    }
    return new Promise(resolve => {
      this.browserWindow!.requestAnimationFrame(() => {
        this.browserWindow!.requestAnimationFrame(() => resolve());
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
    if (sample.completedIds.size === sample.expected) {
      this.active.delete(engine);
      const completedAt = this.now();
      sample.resolve({
        round: sample.round,
        batchMs: completedAt - sample.startedAt,
        instanceMs: sample.latencies,
      });
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
  index: number;
  generation: number;
  tracker: PositioningBenchmarkTracker;
  refs: React.RefObject<Array<PositioningImperativeRef | null> | null>;
};

function PositionedItem({ engine, index, generation, tracker, refs }: PositionedItemProps) {
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
  return (
    <React.Fragment key={`${engine}-${index}-${generation}`}>
      <button
        ref={targetRef}
        data-bench-target={`${engine}-${index}`}
        style={{
          position: 'fixed',
          left: position.left,
          top: position.top,
          width: 64,
          height: 32,
        }}
      />
      <div
        ref={containerRef}
        data-bench-floating={`${engine}-${index}`}
        style={{ width: size.width, height: size.height }}
      >
        {hasArrow && <span ref={arrowRef} style={{ position: 'absolute', width: 8, height: 8 }} />}
      </div>
    </React.Fragment>
  );
}

function BenchmarkHarness({
  tracker,
  refs,
  controls,
}: {
  tracker: PositioningBenchmarkTracker;
  refs: Record<Engine, React.RefObject<Array<PositioningImperativeRef | null> | null>>;
  controls: { show: (engine: Engine | null, generation: number) => void };
}) {
  const [active, setActive] = React.useState<{ engine: Engine; generation: number } | null>(null);
  controls.show = (engine, generation) => flushSync(() => setActive(engine ? { engine, generation } : null));
  return (
    <div data-benchmark-root>
      {active &&
        Array.from({ length: instanceCount }, (_, index) => (
          <PositionedItem
            key={`${active.engine}-${index}-${active.generation}`}
            engine={active.engine}
            index={index}
            generation={active.generation}
            tracker={tracker}
            refs={refs[active.engine]}
          />
        ))}
    </div>
  );
}

function summarize(values: number[]) {
  const sorted = [...values].sort((a, b) => a - b);
  const percentile = (fraction: number) => sorted[Math.min(sorted.length - 1, Math.ceil(sorted.length * fraction) - 1)];
  const median = percentile(0.5);
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  const variance = values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length;
  return {
    count: values.length,
    medianMs: median,
    p95Ms: percentile(0.95),
    p10Ms: percentile(0.1),
    p90Ms: percentile(0.9),
    coefficientOfVariation: mean ? Math.sqrt(variance) / mean : 0,
  };
}

function randomGenerator(seed: number) {
  let value = seed % 4294967296;
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 0x100000000;
  };
}

function shuffle<T>(values: T[], random: () => number): T[] {
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
    this.timeout(180000);
    cy.viewport(1280, 800);
    const tracker = new PositioningBenchmarkTracker();
    const refs = {
      oracle: React.createRef<Array<PositioningImperativeRef | null>>(),
      replacement: React.createRef<Array<PositioningImperativeRef | null>>(),
    };
    refs.oracle.current = [];
    refs.replacement.current = [];
    const random = randomGenerator(Number(Cypress.env('positioningBenchSeed')) || 36870);
    const controls = {
      show: (_engine: Engine | null, _generation: number) => {
        throw new Error('Benchmark harness is not mounted');
      },
    };
    let benchmarkReport: object | undefined;
    cy.window().then(browserWindow => {
      tracker.setWindow(browserWindow);
    });
    mount(<BenchmarkHarness tracker={tracker} refs={refs} controls={controls} />);
    cy.get('[data-benchmark-root]').should('exist');
    cy.then({ timeout: 180000 }, async () => {
      const initialize = async (engine: Engine, round: number, retain: boolean) => {
        controls.show(null, round);
        await tracker.settleFrame();
        const wait = tracker.begin(engine, 'initialize-24', round, retain);
        controls.show(engine, round);
        await wait;
        expect(tracker.document.querySelectorAll('[data-bench-floating]')).to.have.length(instanceCount);
        const other = engine === 'oracle' ? 'replacement' : 'oracle';
        expect(tracker.document.querySelectorAll(`[data-bench-target^="${other}-"]`)).to.have.length(0);
        await tracker.settleFrame();
      };
      for (let round = 0; round < initializationWarmups + measuredInitializations; round++) {
        for (const engine of shuffle([...engines], random)) {
          await initialize(engine, round, round >= initializationWarmups);
        }
      }

      const runOperation = async (operation: Operation, round: number, retain: boolean) => {
        for (const engine of shuffle([...engines], random)) {
          await initialize(engine, round, false);
          for (let index = 0; index < instanceCount; index++) {
            const target = tracker.document.querySelector<HTMLElement>(`[data-bench-target="${engine}-${index}"]`);
            const point = targetPosition(index, round + 1);
            target!.style.left = `${point.left}px`;
            target!.style.top = `${point.top}px`;
          }
          const wait = tracker.begin(engine, operation, round, retain);
          if (operation === 'imperative') {
            refs[engine].current!.forEach(ref => ref?.updatePosition());
          } else {
            tracker.dispatch(operation);
          }
          await wait;
          await tracker.settleFrame();
        }
      };

      const operations: Operation[] = ['imperative', 'scroll', 'resize'];
      for (let round = 0; round < warmupRounds; round++) {
        for (const operation of shuffle(operations, random)) {
          await runOperation(operation, round, false);
        }
      }
      for (let round = 0; round < measuredRounds; round++) {
        for (const operation of shuffle(operations, random)) {
          await runOperation(operation, round + warmupRounds, true);
        }
      }

      controls.show(null, 0);
      benchmarkReport = {
        seed: Number(Cypress.env('positioningBenchSeed')) || 36870,
        generatedAt: new Date().toISOString(),
        metadata: {
          activeEngineCount: 1,
          userAgent: tracker.document.defaultView!.navigator.userAgent,
          hardwareConcurrency: tracker.document.defaultView!.navigator.hardwareConcurrency,
          devicePixelRatio: tracker.document.defaultView!.devicePixelRatio,
          viewport: {
            width: tracker.document.defaultView!.innerWidth,
            height: tracker.document.defaultView!.innerHeight,
          },
        },
        baseline: String(Cypress.env('positioningBenchBaseline')),
        workloads: Object.fromEntries(
          (['initialize-24', ...operations] as Workload[]).map(workload => {
            const oracle = tracker.results.oracle[workload];
            const replacement = tracker.results.replacement[workload];
            if (oracle.length !== replacement.length || !oracle.length) {
              throw new Error(`${workload}: paired samples are missing or mismatched`);
            }
            const oracleBatch = oracle.map(sample => sample.batchMs);
            const replacementBatch = replacement.map(sample => sample.batchMs);
            const pairedRatios = replacementBatch.map((value, index) => value / oracleBatch[index]);
            return [
              workload,
              {
                oracle: {
                  batch: summarize(oracleBatch),
                  perInstance: summarize(oracle.flatMap(sample => sample.instanceMs)),
                },
                replacement: {
                  batch: summarize(replacementBatch),
                  perInstance: summarize(replacement.flatMap(sample => sample.instanceMs)),
                },
                pairedReplacementOverOracle: summarize(pairedRatios),
                samples: {
                  oracle,
                  replacement,
                  replacementOverOracle: pairedRatios,
                },
              },
            ];
          }),
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
