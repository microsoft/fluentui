import * as React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { VegaDeclarativeChart } from '../../index';
import { validateVegaLiteSpec } from './VegaLiteDiagnostics';
import { buildVegaViewTree } from './VegaLiteViewTree';
import { buildVegaTooltip } from './VegaLiteTooltip';
import { prepareVegaLiteSpec } from './VegaLiteDataTransforms';
import type { VegaLiteSpec } from './VegaLiteTypes';
import { specificationCorpus } from './testing/specs/manifest';

const strict = { mode: 'strict' as const };

beforeEach(() => {
  jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (this: Element) {
    const width = this.tagName.toLowerCase() === 'text' ? Math.max(1, this.textContent?.length ?? 0) * 7 : 640;
    const legend = this.getAttribute('role') === 'listbox' || /legend/i.test(this.getAttribute('class') ?? '');
    const height = this.tagName.toLowerCase() === 'text' ? 18 : legend ? 32 : 400;
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
});
afterEach(() => jest.restoreAllMocks());

describe('source-backed tooltip-array filter public integration', () => {
  it.each(specificationCorpus.filter(entry => !!entry.tooltipLabels))('$file preserves every row and label', entry => {
    expect(validateVegaLiteSpec(entry.spec, strict)).toEqual([]);
    const leaf = buildVegaViewTree(entry.spec, strict);
    expect(leaf.type).toBe('unit');
    if (leaf.type !== 'unit') {
      throw new Error('Expected a corpus unit');
    }
    expect(leaf.spec.data?.values).toHaveLength(entry.expectedTables[0].rows.length);
  });

  describe.each(specificationCorpus.filter(entry => !!entry.tooltipLabels))('$file', entry => {
    it.each(['focus', 'hover'] as const)(
      'checks every actual %s callout and mark ARIA, not the first manifest entry',
      async interaction => {
        const onDiagnostics = jest.fn();
        const ref = React.createRef<HTMLDivElement>();
        const original = JSON.stringify(entry.spec);
        const { container, baseElement } = render(
          <VegaDeclarativeChart
            ref={ref}
            chartSchema={{ vegaLiteSpec: entry.spec }}
            semanticMode="strict"
            onDiagnostics={onDiagnostics}
          />,
        );
        const labels = entry.tooltipLabels!;
        const marks = () =>
          Array.from(container.querySelectorAll('svg [aria-label]')).filter(mark =>
            labels.includes(mark.getAttribute('aria-label') ?? ''),
          );
        await waitFor(() => expect(marks()).toHaveLength(labels.length));
        expect(container.firstElementChild).toBe(ref.current);
        expect(marks().map(mark => mark.getAttribute('aria-label'))).toEqual(labels);
        expect(marks().every(mark => !/NaN|Infinity/.test(mark.outerHTML))).toBe(true);
        marks().forEach(mark => {
          expect(mark.tagName.toLowerCase()).toBe('circle');
          for (const attribute of ['cx', 'cy', 'r']) {
            expect(mark.hasAttribute(attribute)).toBe(true);
            expect(Number.isFinite(Number(mark.getAttribute(attribute)))).toBe(true);
          }
          expect(Number(mark.getAttribute('r'))).toBeGreaterThan(0);
          expect(mark.getAttribute('aria-hidden')).not.toBe('true');
        });
        for (const label of labels) {
          const mark = marks().find(item => item.getAttribute('aria-label') === label)!;
          if (interaction === 'focus') {
            fireEvent.focus(mark);
          } else {
            fireEvent.mouseOver(mark, { clientX: 100, clientY: 100 });
          }
          await waitFor(() => {
            const tooltips = Array.from(baseElement.querySelectorAll('[role="tooltip"]'));
            const tooltip = tooltips.find(item => item.getAttribute('aria-label') === label);
            expect(tooltip).toBeDefined();
            expect(tooltip!.getAttribute('aria-label')).toBe(label);
            expect(tooltip!.textContent).not.toMatch(/PRIVATE_CORPUS_VALUE|secret|plotValue|not numeric/);
            const titles = Array.from(tooltip!.querySelectorAll('dt')).map(item => item.textContent);
            expect(titles).toEqual(label.split('; ').map(part => part.split(': ')[0]));
            const values = Array.from(tooltip!.querySelectorAll('dd')).map(item => item.textContent);
            expect(values).toEqual(label.split('; ').map(part => part.slice(part.indexOf(': ') + 2)));
            if (label === 'Note: zero') {
              expect(tooltip!.textContent).not.toMatch(/value|forecast/);
            }
            if (label.startsWith('Note: missing')) {
              expect(tooltip!.textContent).not.toContain('forecast');
            }
          });
          expect(marks()).toHaveLength(labels.length);
          if (interaction === 'focus') {
            fireEvent.blur(mark);
          } else {
            fireEvent.mouseOut(mark);
          }
        }
        expect(onDiagnostics).toHaveBeenCalled();
        onDiagnostics.mock.calls.forEach(([diagnostics]) => expect(diagnostics).toEqual([]));
        expect(JSON.stringify(entry.spec)).toBe(original);
      },
    );
  });

  it('filters prepared aggregate and timeUnit aliases by displayed group values, not a hovered source singleton', () => {
    const spec = {
      mark: 'point',
      data: {
        values: [
          { group: 'A', amount: 0, when: '2024-01-04', secret: 'PRIVATE_CORPUS_VALUE' },
          { group: 'A', amount: 8, when: '2024-01-20', secret: 'PRIVATE_CORPUS_VALUE' },
          { group: 'B', amount: 0, when: '2024-02-03', secret: 'PRIVATE_CORPUS_VALUE' },
          { group: 'B', amount: 0, when: '2024-02-10', secret: 'PRIVATE_CORPUS_VALUE' },
        ],
      },
      encoding: {
        x: { field: 'group', type: 'nominal', tooltip: false },
        y: { field: 'amount', aggregate: 'sum', type: 'quantitative', tooltip: false },
        tooltip: [
          { field: 'group', title: 'Group' },
          { field: 'amount', aggregate: 'mean', type: 'quantitative', title: 'Mean', filter: { gt: 0 } },
          {
            field: 'when',
            timeUnit: 'utcyearmonth',
            type: 'temporal',
            title: 'Month',
            formatType: 'utc',
            format: '%Y-%m',
            filter: { lt: { year: 2024, month: 'February', utc: true } },
          },
          { aggregate: 'count', type: 'quantitative', title: 'Rows', filter: { equal: 2 } },
        ],
      },
    } as unknown as VegaLiteSpec;
    expect(validateVegaLiteSpec(spec, strict)).toEqual([]);
    const prepared = prepareVegaLiteSpec(spec, strict);
    const rows = prepared.data!.values as Record<string, unknown>[];
    expect(rows).toHaveLength(2);
    expect(Array.isArray(prepared.encoding!.tooltip)).toBe(true);
    const definitions = prepared.encoding!.tooltip as Array<{ field?: string }>;
    expect(definitions[1].field).not.toBe('amount');
    expect(definitions[2].field).not.toBe('when');
    expect(buildVegaTooltip(prepared, rows[0]).ariaLabel).toBe('Group: A; Mean: 4; Month: 2024-01; Rows: 2');
    expect(buildVegaTooltip(prepared, rows[1]).ariaLabel).toBe('Group: B; Rows: 2');
    rows.forEach(row => expect(buildVegaTooltip(prepared, row).ariaLabel).not.toMatch(/secret|PRIVATE/));
  });
});
