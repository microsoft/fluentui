import * as React from 'react';
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { resetIdsForTests, SSRProvider } from '@fluentui/react-utilities';
// Import the shipping barrel first: native chart barrels and responsive wrappers share initialization.
import { VegaDeclarativeChart } from '../../index';
import { validateVegaLiteSpec } from './VegaLiteDiagnostics';
import type { VegaLiteDiagnostic } from './VegaLiteDiagnostics';
import { buildVegaViewTree, getVegaViewSourceSpec } from './VegaLiteViewTree';
import type { VegaViewNode } from './VegaLiteViewTree';
import { readVegaField } from './VegaLiteDataTransforms';
import { getVegaRangedGeometry } from './VegaLiteRangedGeometry';
import { resolveVegaLiteResources } from './VegaLiteResourceLoader';
import type { VegaDataResolver } from './VegaLiteResourceLoader';
import { transformVegaLiteToVerticalStackedBarChartProps } from './VegaLiteSchemaAdapter';
import type { VegaLiteSpec } from './VegaLiteTypes';
import { corpusGrammar, specificationCorpus } from './testing/specs/manifest';
import type { CorpusColumn, CorpusEntry } from './testing/specs/manifest';

const strict = { mode: 'strict' as const };
const specsDirectory = join(__dirname, 'testing', 'specs');
const originalFetch = Object.getOwnPropertyDescriptor(globalThis, 'fetch');

function units(node: VegaViewNode): Extract<VegaViewNode, { type: 'unit' }>[] {
  return node.type === 'unit' ? [node] : node.children.flatMap(units);
}

function plotSvgs(container: Element): SVGSVGElement[] {
  // Native legends may contain SVG swatches. Only count actual chart viewports.
  return Array.from(container.querySelectorAll('svg')).filter(
    svg => svg.getAttribute('role') === 'region' || !!svg.querySelector('[data-ranged-mark]'),
  );
}

function field(spec: VegaLiteSpec, column: CorpusColumn): string {
  const definition = column.channel
    ? spec.encoding?.[column.channel]
    : column.tooltip !== undefined && Array.isArray(spec.encoding?.tooltip)
    ? spec.encoding.tooltip[column.tooltip]
    : undefined;
  const name = column.field ?? definition?.field;
  // Resolve generated aggregate/timeUnit aliases from the ACTUAL prepared encoding, never hardcode them.
  expect(typeof name).toBe('string');
  return name as string;
}

function value(actual: unknown, column: CorpusColumn): unknown {
  if (actual instanceof Date) {
    expect(Number.isFinite(actual.getTime())).toBe(true);
    if (column.normalize === 'local-date') {
      return `${actual.getFullYear()}-${String(actual.getMonth() + 1).padStart(2, '0')}-${String(
        actual.getDate(),
      ).padStart(2, '0')}`;
    }
    return actual.toISOString();
  }
  return actual;
}

function expectMatrix(actual: unknown[][], expected: unknown[][]): void {
  expect(actual).toHaveLength(expected.length);
  expected.forEach((row, i) => {
    expect(actual[i]).toHaveLength(row.length);
    row.forEach((cell, j) => {
      if (typeof cell === 'number') {
        expect(Number.isFinite(actual[i][j])).toBe(true);
        expect(actual[i][j]).toBeCloseTo(cell, 10);
      } else {
        expect(actual[i][j]).toEqual(cell);
      }
    });
  });
}

function resolverFor(entry: CorpusEntry) {
  return jest.fn<ReturnType<VegaDataResolver>, Parameters<VegaDataResolver>>(async request => {
    expect(request.url).toBe(entry.resource?.url);
    expect(request.signal.aborted).toBe(false);
    return JSON.parse(JSON.stringify(entry.resource?.rows));
  });
}

async function resolved(entry: CorpusEntry): Promise<VegaLiteSpec> {
  if (!entry.resource) {
    return entry.spec;
  }
  const resolver = resolverFor(entry);
  const result = await resolveVegaLiteResources(entry.spec, {
    resolveData: resolver,
    signal: new AbortController().signal,
    allowedOrigins: ['https://fixtures.example.test'],
  });
  expect(resolver).toHaveBeenCalledTimes(1);
  return result;
}

function portable(valueToCheck: unknown): void {
  if (typeof valueToCheck === 'number') {
    expect(Number.isFinite(valueToCheck)).toBe(true);
  } else if (Array.isArray(valueToCheck)) {
    valueToCheck.forEach(portable);
  } else if (valueToCheck !== null && typeof valueToCheck === 'object') {
    Object.values(valueToCheck).forEach(portable);
  } else {
    expect(['string', 'boolean', 'object']).toContain(typeof valueToCheck);
  }
}

beforeEach(() => {
  resetIdsForTests();
  // Only host layout is modeled. No renderer, hook, validation, transform, observer or effect is mocked.
  jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (this: Element) {
    const text = this.tagName.toLowerCase() === 'text';
    const legend = this.getAttribute('role') === 'listbox' || /legend/i.test(this.getAttribute('class') ?? '');
    const width = text ? Math.max(1, this.textContent?.length ?? 0) * 7 : 640;
    const height = text ? 18 : legend ? 32 : 400;
    return { width, height, top: 0, left: 0, right: width, bottom: height, x: 0, y: 0, toJSON: () => ({}) };
  });
  const computedStyle = globalThis.getComputedStyle;
  jest.spyOn(globalThis, 'getComputedStyle').mockImplementation(element => {
    const style = computedStyle(element);
    return {
      ...style,
      marginTop: '0px',
      marginBottom: '0px',
      getPropertyValue: (property: string) => style.getPropertyValue(property),
    } as CSSStyleDeclaration;
  });
  // A fetch attempt is a test error, never a network fallback. Works even when jsdom supplies no fetch.
  Object.defineProperty(globalThis, 'fetch', {
    configurable: true,
    writable: true,
    value: jest.fn(() => {
      throw new Error('Corpus must use offline host dataResolver');
    }),
  });
});

afterEach(() => {
  jest.restoreAllMocks();
  if (originalFetch) {
    Object.defineProperty(globalThis, 'fetch', originalFetch);
  } else {
    Reflect.deleteProperty(globalThis, 'fetch');
  }
});

describe('source-backed real Vega-Lite specification corpus', () => {
  it('registers every JSON document once and records pinned grammar and upstream semantics', () => {
    const files = readdirSync(specsDirectory)
      .filter(name => name.endsWith('.vl.json'))
      .sort();
    expect(files.length).toBeGreaterThanOrEqual(15);
    expect(specificationCorpus.map(entry => entry.file).sort()).toEqual(files);
    expect(new Set(specificationCorpus.map(entry => entry.file)).size).toBe(files.length);
    expect(corpusGrammar.version).toBe('6.5.0');
    specificationCorpus.forEach(entry => {
      expect(entry.support).toBe('required');
      expect(entry.description.length).toBeGreaterThan(0);
      expect(entry.sources.map(source => source.tag)).toEqual(['grammar', 'authoring', 'semantics']);
      expect(entry.sources[0].url).toBe(corpusGrammar.schema);
      expect(entry.expectedTables.length).toBeGreaterThan(0);
      portable(entry.expectedTables.map(table => table.rows));
    });
  });

  describe.each(specificationCorpus)('$file', entry => {
    it('parses a portable real JSON specification, not a generated TS fixture', () => {
      const document = JSON.parse(readFileSync(join(specsDirectory, entry.file), 'utf8'));
      expect(document).toEqual(entry.spec);
      expect(document.$schema).toBe('https://vega.github.io/schema/vega-lite/v6.json');
      portable(document);
    });

    it('requires clean strict capability diagnostics for the valid upstream declaration', () => {
      expect(validateVegaLiteSpec(entry.spec, { ...strict, allowExternalData: !!entry.resource })).toEqual([]);
    });

    it('compares every actual prepared row field and encoding alias to independent expected tables', async () => {
      const original = JSON.stringify(entry.spec);
      const source = await resolved(entry);
      const leaves = units(buildVegaViewTree(source, strict));
      expect(leaves).toHaveLength(entry.expectedTables.length);
      leaves.forEach((leaf, i) => {
        const expected = entry.expectedTables[i];
        if (expected.title) {
          expect(leaf.spec.title).toBe(expected.title);
        }
        const names = expected.columns.map(column => field(leaf.spec, column));
        const rows = leaf.spec.data?.values as Record<string, unknown>[];
        expect(Array.isArray(rows)).toBe(true);
        expectMatrix(
          rows.map(row => names.map((name, j) => value(readVegaField(row, name), expected.columns[j]))),
          expected.rows,
        );
      });
      expect(JSON.stringify(entry.spec)).toBe(original);
    });

    it('renders the common public SSR boundary with structural view counts and no effects or I/O', () => {
      const onDiagnostics = jest.fn();
      const resolver = resolverFor(entry);
      const html = renderToString(
        <SSRProvider>
          <VegaDeclarativeChart
            chartSchema={{ vegaLiteSpec: entry.spec }}
            semanticMode="strict"
            onDiagnostics={onDiagnostics}
            dataResolver={entry.resource ? resolver : undefined}
            allowedDataOrigins={entry.resource ? ['https://fixtures.example.test'] : undefined}
          />
        </SSRProvider>,
      );
      expect(html).not.toContain('role="alert"');
      expect(html).not.toMatch(/NaN|Infinity/);
      expect(html).toContain('<div');
      expect((html.match(/data-vega-view=/g) ?? []).length).toBe(entry.composed ? entry.expectedTables.length : 0);
      if (entry.resource) {
        expect(html).toContain('Loading chart data');
      } else if (entry.geometry) {
        expect((html.match(/<svg\b/g) ?? []).length).toBe(1);
        expect((html.match(/data-ranged-mark=/g) ?? []).length).toBe(entry.geometry.rectangles.length);
      }
      // Native responsive charts may have no SSR SVG before measurement. Composition still has real cells.
      expect(onDiagnostics).not.toHaveBeenCalled();
      expect(resolver).not.toHaveBeenCalled();
      expect(globalThis.fetch).not.toHaveBeenCalled();
    });

    it('renders every nonempty public view in strict mode and delivers clean committed diagnostics', async () => {
      const original = JSON.stringify(entry.spec);
      const onDiagnostics = jest.fn<void, [VegaLiteDiagnostic[]]>();
      const resolver = resolverFor(entry);
      const ref = React.createRef<HTMLDivElement>();
      const { container } = render(
        <VegaDeclarativeChart
          ref={ref}
          chartSchema={{ vegaLiteSpec: entry.spec }}
          semanticMode="strict"
          onDiagnostics={onDiagnostics}
          dataResolver={entry.resource ? resolver : undefined}
          allowedDataOrigins={entry.resource ? ['https://fixtures.example.test'] : undefined}
        />,
      );
      await waitFor(() => {
        expect(container.querySelector('[role="alert"]')).toBeNull();
        expect(plotSvgs(container)).toHaveLength(entry.publicSvgCount);
      });
      expect(container.firstElementChild).toBe(ref.current);
      expect(container.querySelectorAll('[data-vega-view]')).toHaveLength(
        entry.composed ? entry.expectedTables.length : 0,
      );
      const emptyViews = entry.expectedTables.filter(table => !table.rows.length).length;
      expect(
        Array.from(container.querySelectorAll('[data-vega-view]')).filter(view =>
          view.textContent?.includes('No data'),
        ),
      ).toHaveLength(emptyViews);
      expect(onDiagnostics).toHaveBeenCalled();
      onDiagnostics.mock.calls.forEach(([diagnostics]) => expect(diagnostics).toEqual([]));
      expect(container.innerHTML).not.toMatch(/NaN|Infinity|PRIVATE_CORPUS_VALUE/);
      expect(resolver).toHaveBeenCalledTimes(entry.resource ? 1 : 0);
      expect(globalThis.fetch).not.toHaveBeenCalled();
      expect(JSON.stringify(entry.spec)).toBe(original);
    });
  });

  it.each(specificationCorpus.filter(entry => !!entry.geometry))(
    '$file: independently expected geometry is also the actual public SVG path geometry',
    entry => {
      const leaf = units(buildVegaViewTree(entry.spec, strict))[0];
      const geometry = getVegaRangedGeometry(leaf.spec, 200, 100);
      const expected = entry.geometry!;
      expectMatrix(
        geometry.marks.map(mark => [mark.x, mark.y, mark.width, mark.height]),
        expected.rectangles,
      );
      if (expected.roundedEnds) {
        expect(geometry.marks.map(mark => mark.roundedEnd)).toEqual(expected.roundedEnds);
      }
      const { container } = render(
        <VegaDeclarativeChart chartSchema={{ vegaLiteSpec: entry.spec }} semanticMode="strict" />,
      );
      expect(container.querySelector('[role="alert"]')).toBeNull();
      const svg = container.querySelector('svg')!;
      expect(svg).not.toBeNull();
      expect(svg.getAttribute('width')).toBe('272');
      expect(svg.getAttribute('height')).toBe('172');
      // Compare real component paths to the helper AFTER independently checking its coordinates above.
      // A second copied dictionary of path numbers would not exercise the component-to-helper boundary.
      const paths = Array.from(svg.querySelectorAll('path[data-ranged-mark]'));
      expect(paths).toHaveLength(expected.rectangles.length);
      expect(paths.map(path => path.getAttribute('d'))).toEqual(geometry.marks.map(mark => mark.d));
      expect(paths.every(path => path.getAttribute('role') === 'img')).toBe(true);
    },
  );

  it('normalized-bar-order: native normalized contributions follow explicit order, not the color domain', () => {
    const entry = specificationCorpus.find(item => item.file === 'normalized-bar-order.vl.json')!;
    const leaf = units(buildVegaViewTree(entry.spec, strict))[0];
    const props = transformVegaLiteToVerticalStackedBarChartProps(
      getVegaViewSourceSpec(leaf.spec),
      { current: new Map() },
      false,
      strict,
    );
    expectMatrix(
      props.data!.flatMap(stack => stack.chartData.map(point => [stack.xAxisPoint, point.legend, point.data])),
      [
        ['A', 'Second', 0.75],
        ['A', 'First', 0.25],
        ['B', 'Second', 0.75],
        ['B', 'First', 0.25],
      ],
    );
    expect(props.yAxisTickFormat).toBe('.0%');
  });

  it.each(['focus', 'hover'] as const)(
    'filtered-tooltip-newlines: actual native %s callouts retain explicit fields, formats and newline text',
    async interaction => {
      const entry = specificationCorpus.find(item => !!item.tooltipLabels)!;
      const { container, baseElement } = render(
        <VegaDeclarativeChart chartSchema={{ vegaLiteSpec: entry.spec }} semanticMode="strict" />,
      );
      expect(container.querySelector('[role="alert"]')).toBeNull();
      for (const label of entry.tooltipLabels!) {
        const mark = Array.from(container.querySelectorAll('[aria-label]')).find(
          element => element.getAttribute('aria-label') === label,
        );
        expect(mark).toBeDefined();
        if (interaction === 'focus') {
          fireEvent.focus(mark!);
        } else {
          fireEvent.mouseOver(mark!, { clientX: 100, clientY: 100 });
        }
        await waitFor(() => {
          const tooltip = Array.from(baseElement.querySelectorAll('[role="tooltip"]')).find(
            element => element.getAttribute('aria-label') === label,
          );
          expect(tooltip).toBeDefined();
          expect(tooltip!.textContent).toContain(label.split(';')[0].replace('Note: ', ''));
          expect(tooltip!.textContent).not.toContain('PRIVATE_CORPUS_VALUE');
        });
        if (interaction === 'focus') {
          fireEvent.blur(mark!);
        } else {
          fireEvent.mouseOut(mark!);
        }
      }
    },
  );

  it('managed-resource: a URL alone cannot authorize public I/O, but the explicit host callback can', () => {
    const entry = specificationCorpus.find(item => !!item.resource)!;
    const onDiagnostics = jest.fn<void, [VegaLiteDiagnostic[]]>();
    expect(validateVegaLiteSpec(entry.spec, strict)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: 'external-data-resolver', severity: 'error', path: '$.data.url' }),
      ]),
    );
    // Strict preflight errors are thrown, not rendered as resource-load error alerts.
    expect(() =>
      renderToString(
        <SSRProvider>
          <VegaDeclarativeChart
            chartSchema={{ vegaLiteSpec: entry.spec }}
            semanticMode="strict"
            onDiagnostics={onDiagnostics}
          />
        </SSRProvider>,
      ),
    ).toThrow(/external-data-resolver/);
    expect(onDiagnostics).not.toHaveBeenCalled();
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });
});
