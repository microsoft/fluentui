import * as React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import { GroupedVerticalBarChart, HeatMapChart, VegaDeclarativeChart } from '../../index';
import { validateVegaLiteSpec } from './VegaLiteDiagnostics';
import { buildVegaViewTree } from './VegaLiteViewTree';
import { buildVegaTooltip } from './VegaLiteTooltip';
import { prepareVegaLiteSpec } from './VegaLiteDataTransforms';
import {
  transformVegaLiteToGroupedVerticalBarChartProps,
  transformVegaLiteToHeatMapChartProps,
} from './VegaLiteSchemaAdapter';
import type { VegaLiteSpec } from './VegaLiteTypes';
import { specificationCorpus } from './testing/specs/manifest';

const strict = { mode: 'strict' as const };

const nativeKinds = ['scatter', 'grouped', 'heatmap', 'polar'] as const;
function nativeTooltipSpec(kind: (typeof nativeKinds)[number]): VegaLiteSpec {
  const mark = kind === 'grouped' ? 'bar' : kind === 'heatmap' ? 'rect' : 'point';
  const encoding = {
    x: { field: 'x', type: kind === 'grouped' || kind === 'heatmap' ? 'nominal' : 'quantitative', tooltip: false },
    y: { field: 'y', type: kind === 'heatmap' ? 'nominal' : 'quantitative', tooltip: false },
    tooltip: [{ field: 'note', title: 'Note', filter: { equal: 'shown' } }],
    ...(kind === 'grouped'
      ? { color: { field: 'group', type: 'nominal', tooltip: false }, xOffset: { field: 'group', type: 'nominal' } }
      : kind === 'heatmap'
      ? { color: { field: 'value', type: 'quantitative', tooltip: false } }
      : {}),
  };
  return {
    mark,
    data: {
      values: [
        { x: 1, y: 4, value: 10, group: 'series', note: 'hidden', secret: 'PRIVATE_CORPUS_VALUE' },
        { x: 2, y: 8, value: 20, group: 'series', note: 'shown', secret: 'PRIVATE_CORPUS_VALUE' },
      ],
    },
    encoding: kind === 'polar' ? { theta: encoding.x, radius: encoding.y, tooltip: encoding.tooltip } : encoding,
  } as unknown as VegaLiteSpec;
}

function showMark(mark: Element, interaction: 'focus' | 'hover') {
  if (interaction === 'focus') {
    fireEvent.focus(mark);
  } else {
    fireEvent.mouseOver(mark, { clientX: 100, clientY: 100 });
  }
}

function renderNativeTooltipChart(spec: VegaLiteSpec, kind: (typeof nativeKinds)[number]) {
  // Public xOffset specs deliberately route to the ranged renderer. Exercise the
  // grouped native hook using the public adapter's actual native props instead.
  return render(
    kind === 'grouped' ? (
      <GroupedVerticalBarChart
        {...transformVegaLiteToGroupedVerticalBarChartProps(spec, { current: new Map() }, false, strict)}
      />
    ) : (
      <VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} semanticMode="strict" />
    ),
  );
}

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

it.each([false, true])('reports an invalid config numberFormat at its authored path (nested: %s)', nested => {
  const spec: VegaLiteSpec = {
    mark: 'line',
    config: { numberFormat: 'zz' },
    data: { values: [{ x: 1, amount: 1234.5 }] },
    encoding: {
      x: { field: 'x', type: 'quantitative' },
      y: { field: 'amount', type: 'quantitative' },
      tooltip: [{ field: 'amount', type: 'quantitative' }],
    },
  };

  const input = nested ? { hconcat: [spec] } : spec;
  const path = nested ? '$.hconcat[0].config.numberFormat' : '$.config.numberFormat';
  expect(validateVegaLiteSpec(input)).toEqual([
    expect.objectContaining({ code: 'unsupported-format', path, severity: 'warning' }),
  ]);
  expect(validateVegaLiteSpec(input, strict)).toEqual([
    expect.objectContaining({ code: 'unsupported-format', path, severity: 'error' }),
  ]);
  expect(() =>
    renderToStaticMarkup(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: input }} semanticMode="strict" />),
  ).toThrow(path);
});

describe('config numberFormat controls', () => {
  const scatter = nativeTooltipSpec('scatter');
  const spec: VegaLiteSpec = {
    ...scatter,
    encoding: { ...scatter.encoding, tooltip: [{ field: 'y', title: 'Amount', type: 'quantitative' }] },
  };

  it('accepts a valid numeric default without changing the input', () => {
    const input = { ...spec, config: { numberFormat: ',.2f' } };
    const before = JSON.stringify(input);
    expect(validateVegaLiteSpec(input)).toEqual([]);
    expect(validateVegaLiteSpec(input, strict)).toEqual([]);
    expect(buildVegaTooltip(input, { y: 1234.5 }, strict).fields).toEqual([{ title: 'Amount', value: '1,234.50' }]);
    expect(JSON.stringify(input)).toBe(before);
  });

  it.each([123, null, false, {}, []].map(numberFormat => ({ numberFormat })))(
    'retains invalid-field for non-string defaults: $numberFormat',
    ({ numberFormat }) => {
      const input = { ...spec, config: { numberFormat } };
      expect(validateVegaLiteSpec(input)).toEqual([
        expect.objectContaining({ code: 'invalid-field', path: '$.config.numberFormat', severity: 'error' }),
      ]);
      expect(validateVegaLiteSpec(input, strict)).toEqual(validateVegaLiteSpec(input));
    },
  );
});

describe.each(['line', 'bar'] as const)('public %s legacy tooltip exceptions', kind => {
  describe.each([
    {
      exception: { formatType: 'myFormatter', format: '.2f' },
      config: undefined,
      diagnosticPath: '$.encoding.tooltip[0].formatType',
    },
    { exception: { format: 'zz' }, config: undefined, diagnosticPath: '$.encoding.tooltip[0].format' },
    {
      exception: { condition: { param: 'brush', value: 'PRIVATE_CONDITIONAL_VALUE' } },
      config: undefined,
      diagnosticPath: '$.encoding.tooltip[0].condition',
    },
    { exception: {}, config: { numberFormat: 'zz' }, diagnosticPath: '$.config.numberFormat' },
  ])('$diagnosticPath', ({ exception, config, diagnosticPath }) => {
    it.each(['focus', 'hover'] as const)('keeps every raw datum and warns on %s', async interaction => {
      const onDiagnostics = jest.fn();
      const spec = {
        mark: kind === 'line' ? { type: 'line', point: true } : 'bar',
        ...(config ? { config } : {}),
        data: {
          values: [
            { x: 1, amount: 1234.5, secret: 'PRIVATE_CORPUS_VALUE' },
            { x: 2, amount: 9876.5, secret: 'PRIVATE_CORPUS_VALUE' },
          ],
        },
        encoding: {
          x: { field: 'x', type: kind === 'line' ? 'quantitative' : 'nominal', tooltip: false },
          y: { field: 'amount', type: 'quantitative', tooltip: false },
          tooltip: [
            { field: 'amount', title: 'Amount', type: 'quantitative', ...exception },
            { field: 'secret', tooltip: false },
            { field: 'amount', title: 'Filtered', ...exception, filter: { lt: 0 } },
          ],
        },
      } as unknown as VegaLiteSpec;
      const before = JSON.stringify(spec);
      const { container, baseElement } = render(
        <VegaDeclarativeChart
          chartSchema={{ vegaLiteSpec: spec }}
          semanticMode={interaction === 'focus' ? undefined : 'legacy'}
          onDiagnostics={onDiagnostics}
        />,
      );
      const labels = ['Amount: 1234.5', 'Amount: 9876.5'];
      await waitFor(() => {
        labels.forEach(label => expect(container.querySelectorAll(`svg [aria-label="${label}"]`)).toHaveLength(1));
      });
      for (const label of labels) {
        const mark = container.querySelector(`svg [aria-label="${label}"]`)!;
        expect(mark.outerHTML).not.toMatch(/NaN|Infinity/);
        showMark(mark, interaction);
        await waitFor(() => {
          const surface = baseElement.querySelector('.fui-PopoverSurface');
          const tooltip = surface?.querySelector('[role="tooltip"]');
          expect(tooltip).toHaveAttribute('aria-label', label);
          expect(Array.from(tooltip!.querySelectorAll('dt')).map(node => node.textContent)).toEqual(['Amount']);
          expect(Array.from(tooltip!.querySelectorAll('dd')).map(node => node.textContent)).toEqual([
            label.slice('Amount: '.length),
          ]);
          expect(surface!.textContent).toBe(tooltip!.textContent);
          expect(surface!.textContent).not.toMatch(/PRIVATE|Filtered|secret/);
        });
      }
      expect(onDiagnostics).toHaveBeenCalledTimes(1);
      onDiagnostics.mock.calls.forEach(([diagnostics]) => {
        expect(diagnostics).toEqual(
          expect.arrayContaining([expect.objectContaining({ path: diagnosticPath, severity: 'warning' })]),
        );
        expect(diagnostics.every((entry: { severity: string }) => entry.severity === 'warning')).toBe(true);
      });
      expect(JSON.stringify(spec)).toBe(before);
    });

    it('rejects the same declaration in strict preflight', () => {
      const spec = {
        mark: kind,
        ...(config ? { config } : {}),
        data: { values: [{ x: 1, amount: 1234.5 }] },
        encoding: {
          x: { field: 'x', type: 'quantitative' },
          y: { field: 'amount', type: 'quantitative' },
          tooltip: [{ field: 'amount', type: 'quantitative', ...exception }],
        },
      } as unknown as VegaLiteSpec;
      expect(validateVegaLiteSpec(spec, strict)).toEqual(
        expect.arrayContaining([expect.objectContaining({ path: diagnosticPath, severity: 'error' })]),
      );
      expect(() =>
        renderToStaticMarkup(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} semanticMode="strict" />),
      ).toThrow(diagnosticPath);
    });
  });
});

describe.each(['ranged bar', 'centered area'] as const)('public %s geometry legacy tooltip exceptions', kind => {
  describe.each([
    { exception: { formatType: 'myFormatter', format: '.2f' }, diagnostic: 'formatType' },
    { exception: { format: 'zz' }, diagnostic: 'format' },
    { exception: { condition: { param: 'brush', value: 'PRIVATE_CONDITIONAL_VALUE' } }, diagnostic: 'condition' },
  ])('$diagnostic', ({ exception, diagnostic }) => {
    const spec = {
      width: 400,
      height: 200,
      mark: kind === 'ranged bar' ? 'bar' : 'area',
      data: {
        values: [
          { x: 1, end: 2, task: 'First', amount: 1234.5, secret: 'PRIVATE_CORPUS_VALUE' },
          { x: 3, end: 4, task: 'Second', amount: 9876.5, secret: 'PRIVATE_CORPUS_VALUE' },
        ],
      },
      encoding: {
        x: { field: 'x', type: 'quantitative', tooltip: false },
        ...(kind === 'ranged bar'
          ? {
              x2: { field: 'end', tooltip: false },
              y: { field: 'task', type: 'nominal', tooltip: false },
            }
          : { y: { field: 'amount', type: 'quantitative', stack: 'center', tooltip: false } }),
        tooltip: [
          { field: 'amount', title: 'Amount', type: 'quantitative', ...exception },
          { field: 'secret', tooltip: false },
          { field: 'amount', title: 'Filtered', ...exception, filter: { lt: 0 } },
        ],
      },
    } as unknown as VegaLiteSpec;

    it.each(['focus', 'hover'] as const)('retains raw callout and mark ARIA on %s', async interaction => {
      const onDiagnostics = jest.fn();
      const before = JSON.stringify(spec);
      const { container, baseElement } = render(
        <VegaDeclarativeChart
          chartSchema={{ vegaLiteSpec: spec }}
          semanticMode={interaction === 'focus' ? undefined : 'legacy'}
          onDiagnostics={onDiagnostics}
        />,
      );
      const selector =
        kind === 'ranged bar'
          ? 'svg path[data-ranged-mark][role="img"][tabindex="0"]'
          : 'svg circle[data-centered-point][role="img"][tabindex="0"]';
      const labels = ['Amount: 1234.5', 'Amount: 9876.5'];
      await waitFor(() => expect(container.querySelectorAll(selector)).toHaveLength(2));
      const marks = Array.from(container.querySelectorAll(selector));
      expect(marks.map(mark => mark.getAttribute('aria-label'))).toEqual(labels);
      if (kind === 'centered area') {
        expect(container.querySelectorAll('svg path[data-centered-series]')).toHaveLength(1);
      }
      for (const [index, mark] of marks.entries()) {
        expect(mark.getAttribute('aria-hidden')).not.toBe('true');
        expect(mark.outerHTML).not.toMatch(/NaN|Infinity|PRIVATE|Filtered|secret/);
        if (kind === 'ranged bar') {
          expect(mark.getAttribute('d')).toMatch(/^M.+Z$/);
        } else {
          expect(Number(mark.getAttribute('r'))).toBeGreaterThan(0);
          ['cx', 'cy'].forEach(attribute => expect(Number.isFinite(Number(mark.getAttribute(attribute)))).toBe(true));
        }
        showMark(mark, interaction);
        await waitFor(() => {
          const surface = baseElement.querySelector('.fui-PopoverSurface');
          const tooltip = surface?.querySelector('[role="tooltip"]');
          expect(tooltip).toHaveAttribute('aria-label', labels[index]);
          expect(Array.from(tooltip!.querySelectorAll('dt')).map(node => node.textContent)).toEqual(['Amount']);
          expect(Array.from(tooltip!.querySelectorAll('dd')).map(node => node.textContent)).toEqual([
            labels[index].slice('Amount: '.length),
          ]);
          expect(surface!.textContent).toBe(tooltip!.textContent);
          expect(surface!.textContent).not.toMatch(/PRIVATE|Filtered|secret/);
        });
      }
      expect(onDiagnostics).toHaveBeenCalled();
      onDiagnostics.mock.calls.forEach(([items]) => {
        expect(items).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ path: `$.encoding.tooltip[0].${diagnostic}`, severity: 'warning' }),
          ]),
        );
        expect(items.every((item: { severity: string }) => item.severity === 'warning')).toBe(true);
      });
      expect(JSON.stringify(spec)).toBe(before);
    });

    it('rejects the identical geometry declaration in strict public preflight', () => {
      expect(validateVegaLiteSpec(spec, strict)).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ path: `$.encoding.tooltip[0].${diagnostic}`, severity: 'error' }),
        ]),
      );
      expect(() =>
        renderToStaticMarkup(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} semanticMode="strict" />),
      ).toThrow(`$.encoding.tooltip[0].${diagnostic}`);
      const helperError =
        diagnostic === 'formatType'
          ? 'unsupported formatType'
          : diagnostic === 'format'
          ? 'invalid numeric format'
          : 'conditional tooltip requires a supported test predicate';
      for (const row of spec.data!.values!) {
        expect(() => buildVegaTooltip(spec, row)).toThrow(helperError);
        expect(() => buildVegaTooltip(spec, row, strict)).toThrow(helperError);
      }
    });
  });
});

describe('source-backed tooltip-array filter public integration', () => {
  it.each(['focus', 'hover'] as const)(
    'uses actual scatter tuple identity, even for duplicate coordinates on %s',
    async interaction => {
      const spec = nativeTooltipSpec('scatter');
      spec.data!.values = [
        { x: 1, y: 4, note: 'first same-coordinate row' },
        { x: 1, y: 8, note: 'other y row' },
        { x: 1, y: 4, note: 'second same-coordinate row' },
      ];
      spec.encoding!.tooltip = [{ field: 'note', title: 'Note' }];
      expect(validateVegaLiteSpec(spec, strict)).toEqual([]);
      const { container, baseElement } = render(
        <VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} semanticMode="strict" />,
      );
      await waitFor(() => expect(container.querySelectorAll('circle[role="option"]')).toHaveLength(3));
      const marks = Array.from(container.querySelectorAll('circle[role="option"]'));
      expect(marks.map(mark => mark.getAttribute('aria-label'))).toEqual([
        'Note: first same-coordinate row',
        'Note: other y row',
        'Note: second same-coordinate row',
      ]);
      for (const mark of marks) {
        const label = mark.getAttribute('aria-label')!;
        showMark(mark, interaction);
        await waitFor(() => {
          const surface = baseElement.querySelector('.fui-PopoverSurface');
          const tooltips = surface?.querySelectorAll('[role="tooltip"]');
          expect(tooltips).toHaveLength(1);
          expect(tooltips![0]).toHaveAttribute('aria-label', label);
          expect(surface!.textContent).toBe(tooltips![0].textContent);
        });
      }
    },
  );

  describe.each(nativeKinds)('%s native callout suppression', kind => {
    it.each(['focus', 'hover'] as const)(
      'closes filtered-out content and opens the next actual row on %s',
      async interaction => {
        const spec = nativeTooltipSpec(kind);
        expect(validateVegaLiteSpec(spec, strict)).toEqual([]);
        const { container, baseElement } = renderNativeTooltipChart(spec, kind);
        await waitFor(() => expect(container.querySelector('[aria-label="Note: shown"]')).not.toBeNull());
        const hidden = container.querySelector('svg [aria-label="Data point"]')!;
        const shown = container.querySelector('svg [aria-label="Note: shown"]')!;
        expect(hidden).not.toBeNull();
        // Test a transition from a visible callout too, not only the initially closed state.
        showMark(shown, interaction);
        await waitFor(() => expect(baseElement.querySelector('.fui-PopoverSurface')).toHaveTextContent('Noteshown'));
        showMark(hidden, interaction);
        await waitFor(() => expect(baseElement.querySelector('.fui-PopoverSurface')).toBeNull());
        showMark(shown, interaction);
        await waitFor(() => expect(baseElement.querySelector('.fui-PopoverSurface')).toHaveTextContent(/^Noteshown$/));
        expect(baseElement.querySelector('.fui-PopoverSurface')).not.toHaveTextContent('PRIVATE_CORPUS_VALUE');
      },
    );

    it.each(['focus', 'hover'] as const)('does not open a surface with mark tooltip:false on %s', async interaction => {
      const spec = nativeTooltipSpec(kind);
      // The permissive runtime supports mark tooltip declarations beyond the minimal local mark type.
      spec.mark = Object.assign({ type: spec.mark as 'point' | 'bar' | 'rect' }, { tooltip: false });
      delete spec.encoding!.tooltip;
      expect(validateVegaLiteSpec(spec, strict)).toEqual([]);
      const { container, baseElement } = renderNativeTooltipChart(spec, kind);
      const selector =
        kind === 'heatmap' ? 'g[role="option"]' : kind === 'polar' ? 'circle[role="img"]' : '[role="option"]';
      await waitFor(() =>
        expect(container.querySelectorAll(`svg ${selector}`)).toHaveLength(kind === 'heatmap' ? 4 : 2),
      );
      for (const mark of Array.from(container.querySelectorAll(`svg ${selector}`))) {
        showMark(mark, interaction);
        expect(baseElement.querySelector('.fui-PopoverSurface')).toBeNull();
      }
    });
  });

  it.each(['focus', 'hover'] as const)(
    'retains No data available for sparse generated heatmap cells on %s',
    async interaction => {
      const spec = nativeTooltipSpec('heatmap');
      spec.encoding!.tooltip = [{ field: 'note', title: 'Note' }];
      const props = transformVegaLiteToHeatMapChartProps(spec, { current: new Map() }, false, strict);
      // The adapter keeps a complete zero-filled grid for compatibility. Remove
      // only its synthetic points to exercise cells generated by HeatMapChart
      // itself, keeping original bound point identities and adapter callbacks.
      const sparseData = props.data.map(group => ({
        ...group,
        data: group.data.filter(point => point.value === 10 || point.value === 20),
      }));
      const { container, baseElement } = render(<HeatMapChart {...props} data={sparseData} />);
      await waitFor(() => expect(container.querySelectorAll('g[role="option"]')).toHaveLength(4));
      const missing = Array.from(container.querySelectorAll('g[role="option"]')).filter(mark =>
        mark.getAttribute('aria-label')?.includes('No data available'),
      );
      expect(missing).toHaveLength(2);
      showMark(container.querySelector('[aria-label="Note: shown"]')!, interaction);
      await waitFor(() => expect(baseElement.querySelector('.fui-PopoverSurface')).toHaveTextContent(/^Noteshown$/));
      for (const mark of missing) {
        showMark(mark, interaction);
        await waitFor(() =>
          expect(baseElement.querySelector('.fui-PopoverSurface')).toHaveTextContent('No data available'),
        );
        expect(baseElement.querySelector('.fui-PopoverSurface [role="tooltip"]')).toBeNull();
      }
    },
  );

  it.each(['focus', 'hover'] as const)(
    'preserves the public adapter zero-fill default for cells without a source binding on %s',
    async interaction => {
      const spec = nativeTooltipSpec('heatmap');
      spec.encoding!.tooltip = [{ field: 'note', title: 'Note' }];
      const { container, baseElement } = renderNativeTooltipChart(spec, 'heatmap');
      await waitFor(() => expect(container.querySelectorAll('g[role="option"]')).toHaveLength(4));
      const unbound = Array.from(container.querySelectorAll('g[role="option"]')).filter(
        mark => !mark.getAttribute('aria-label')?.startsWith('Note:'),
      );
      expect(unbound).toHaveLength(2);
      for (const mark of unbound) {
        showMark(mark, interaction);
        await waitFor(() => expect(baseElement.querySelector('.fui-PopoverSurface')).toHaveTextContent(/^0$/));
        expect(baseElement.querySelector('.fui-PopoverSurface [role="tooltip"]')).toBeNull();
      }
    },
  );

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
