import { render, screen, within } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import { format as d3Format } from 'd3-format';
import { timeFormat, utcFormat } from 'd3-time-format';
import { buildVegaTooltip, renderVegaTooltip } from './VegaLiteTooltip';
import { prepareVegaLiteSpec } from './VegaLiteDataTransforms';
import { aggregateTooltipSpec, projectedTooltipSpec, tooltipRow, tooltipSpec } from './testing/fixtures/tooltips';

const explicit = (tooltip: unknown, extra: Record<string, unknown> = {}) =>
  tooltipSpec({
    mark: 'point',
    ...extra,
    encoding: { tooltip },
  });
const fields = (tooltip: unknown, row = tooltipRow) => buildVegaTooltip(explicit(tooltip), row).fields;

describe('tooltip contract and precedence', () => {
  it.each([undefined, true, { content: 'encoding' }])(
    'projects encodings, not the entire row, for mark tooltip %j',
    tooltip => {
      const spec = tooltipSpec({ ...projectedTooltipSpec, mark: { type: 'point', tooltip } });
      expect(buildVegaTooltip(spec, tooltipRow)).toEqual({
        fields: [
          { title: 'Category', value: 'North' },
          { title: 'Amount', value: '1,234.5' },
          { title: 'Series', value: 'Retail' },
          { title: 'Angle', value: '0' },
          { title: 'Distance', value: '4' },
          { title: 'Weight', value: '2' },
        ],
        ariaLabel: 'Category: North; Amount: 1,234.5; Series: Retail; Angle: 0; Distance: 4; Weight: 2',
        disabled: false,
      });
    },
  );

  it('defaults config.mark.tooltip true to the encoding projection', () => {
    const result = buildVegaTooltip(
      tooltipSpec({ ...projectedTooltipSpec, config: { mark: { tooltip: true } } }),
      tooltipRow,
    );
    expect(result).toEqual(buildVegaTooltip(projectedTooltipSpec, tooltipRow));
    expect(result.ariaLabel).not.toContain('secret');
  });

  it.each([
    { encoding: { ...projectedTooltipSpec.encoding, tooltip: null } },
    { mark: { type: 'point', tooltip: null } },
    { mark: { type: 'point', tooltip: false } },
    { config: { mark: { tooltip: null } } },
  ])('disables the visual tooltip but retains safe coordinate accessibility %#', override => {
    const spec = tooltipSpec({ ...projectedTooltipSpec, ...override });
    expect(buildVegaTooltip(spec, tooltipRow)).toEqual({
      fields: [],
      ariaLabel: 'Category: North; Amount: 1,234.5',
      disabled: true,
    });
    expect(renderVegaTooltip(spec, tooltipRow)).toBeNull();
  });

  it('gives explicit encoding precedence over a disabled mark/config and mark precedence over config', () => {
    expect(
      buildVegaTooltip(
        explicit(
          { field: 'zero' },
          {
            mark: { type: 'point', tooltip: null },
            config: { mark: { tooltip: null } },
          },
        ),
        tooltipRow,
      ).fields,
    ).toEqual([{ title: 'zero', value: '0' }]);
    expect(
      buildVegaTooltip(
        tooltipSpec({
          ...projectedTooltipSpec,
          mark: { type: 'point', tooltip: true },
          config: { mark: { tooltip: null } },
        }),
        tooltipRow,
      ).disabled,
    ).toBe(false);
    expect(
      buildVegaTooltip(
        tooltipSpec({
          ...projectedTooltipSpec,
          mark: { type: 'point', tooltip: null },
          config: { mark: { tooltip: true } },
        }),
        tooltipRow,
      ).disabled,
    ).toBe(true);
  });

  it('uses mark-specific config before generic mark config, retaining null', () => {
    const spec = tooltipSpec({
      ...projectedTooltipSpec,
      config: { point: { tooltip: null }, mark: { tooltip: true } },
    });
    expect(buildVegaTooltip(spec, tooltipRow).disabled).toBe(true);
  });

  it('serializes own scalar row fields only for explicit content:data', () => {
    const spec = tooltipSpec({ mark: { type: 'point', tooltip: { content: 'data' } } });
    expect(buildVegaTooltip(spec, { visible: 0, nil: null, secret: 'explicitly requested' })).toEqual({
      fields: [
        { title: 'visible', value: '0' },
        { title: 'nil', value: 'null' },
        { title: 'secret', value: 'explicitly requested' },
      ],
      ariaLabel: 'visible: 0; nil: null; secret: explicitly requested',
      disabled: false,
    });
  });

  it('omits tooltip:false fields from generated visual content and ARIA, even when disabled', () => {
    const spec = tooltipSpec({
      ...projectedTooltipSpec,
      encoding: {
        ...projectedTooltipSpec.encoding,
        y: { field: 'amount', tooltip: false },
        color: { field: 'secret', tooltip: false },
      },
    });
    const result = buildVegaTooltip(spec, tooltipRow);
    expect(result.fields.map(field => field.title)).toEqual(['Category', 'Angle', 'Distance', 'Weight']);
    expect(result.ariaLabel).not.toMatch(/amount|secret|1234/i);
    expect(
      buildVegaTooltip(tooltipSpec({ ...spec, mark: { type: 'point', tooltip: null } }), tooltipRow).ariaLabel,
    ).toBe('Category: North');
    expect(fields([{ field: 'secret', tooltip: false }, { field: 'zero' }])).toEqual([{ title: 'zero', value: '0' }]);
  });
});

describe('ordered fields and formatting', () => {
  it('preserves explicit order, titles, zeros, nulls, NaN and escaped/nested aliases', () => {
    expect(
      fields([
        { field: 'zero', title: 'Zero' },
        { field: 'nil', title: 'Null' },
        { field: 'invalid', title: 'NaN' },
        { field: 'nested.value', title: 'Nested' },
        { field: 'a\\.b', title: 'Dot' },
        { field: 'a\\[b\\]', title: 'Brackets' },
      ]),
    ).toEqual([
      { title: 'Zero', value: '0' },
      { title: 'Null', value: 'null' },
      { title: 'NaN', value: 'NaN' },
      { title: 'Nested', value: '7' },
      { title: 'Dot', value: '11' },
      { title: 'Brackets', value: '13' },
    ]);
  });

  it.each([
    [{ field: 'amount', type: 'quantitative', format: '$,.2f' }, '$1,234.50'],
    [{ field: 'amount', formatType: 'number', format: '.2f' }, '1234.50'],
    [{ field: 'amount', format: '.1f' }, '1234.5'],
    [{ field: 'amount', type: 'nominal' }, '1234.5'],
    [{ field: 'notes', type: 'nominal' }, 'first line\nsecond line'],
    [{ value: '<strong>constant</strong>', title: 'Message' }, '<strong>constant</strong>'],
    [{ value: 0 }, '0'],
    [{ datum: false }, 'false'],
  ])('formats %j without losing its scalar type', (definition, expected) => {
    expect(fields(definition)[0].value).toBe(expected);
  });

  it('uses formatType before the declared field type and supports safe config formatting', () => {
    expect(fields({ field: 'date', type: 'nominal', formatType: 'utc', format: '%Y-%m-%d %H:%M' })[0].value).toBe(
      '2024-02-29 12:34',
    );
    expect(
      buildVegaTooltip(
        explicit({ field: 'amount', type: 'quantitative' }, { config: { numberFormat: '.2f' } }),
        tooltipRow,
      ).fields[0].value,
    ).toBe('1234.50');
  });

  it('formats temporal numbers, Date instances, invalid dates and UTC without mutating the input', () => {
    const date = new Date('2024-02-29T12:34:56Z');
    const definition = { field: 'date', type: 'temporal', format: '%Y-%m-%d %H:%M', scale: { type: 'utc' } };
    for (const value of [date, date.getTime(), date.toISOString()]) {
      expect(fields(definition, { date: value })[0].value).toBe('2024-02-29 12:34');
    }
    expect(date.toISOString()).toBe('2024-02-29T12:34:56.000Z');
    expect(fields(definition, { date: 'not a date' })[0].value).toBe('Invalid Date');
    expect(fields({ field: 'date', type: 'temporal', format: '%Y-%m-%d' }, { date })[0].value).toBe(
      timeFormat('%Y-%m-%d')(date),
    );
  });

  it.each(['date', 'utc'])('parses declared input %s formats before output formatting', kind => {
    const spec = explicit(
      { field: 'date', type: 'temporal', formatType: kind === 'utc' ? 'utc' : 'time', format: '%Y-%m-%d' },
      {
        data: { format: { parse: { date: `${kind}:'%d/%m/%Y'` } } },
      },
    );
    expect(buildVegaTooltip(spec, { date: '29/02/2024' }).fields[0].value).toBe('2024-02-29');
  });

  it('does not change global d3 locales', () => {
    const beforeNumber = d3Format(',.2f')(1234.5);
    const beforeDate = utcFormat('%B')(new Date('2024-02-01Z'));
    fields({ field: 'amount', format: '.1f' });
    fields({ field: 'date', type: 'temporal', formatType: 'utc', format: '%B' });
    expect(d3Format(',.2f')(1234.5)).toBe(beforeNumber);
    expect(utcFormat('%B')(new Date('2024-02-01Z'))).toBe(beforeDate);
  });

  it('rejects invalid numeric formats even when the row value is null', () => {
    expect(() => fields({ field: 'nil', type: 'quantitative', format: 'invalid format' })).toThrow(/format/i);
  });
});

describe('Vega-Lite 6.5 bound tooltip array filters', () => {
  it('evaluates logical filters against each enclosing field, not an arbitrary row field', () => {
    const result = fields([
      {
        field: 'amount',
        title: 'Amount',
        filter: { and: [{ gte: 1000 }, { or: [{ lt: 2000 }, { equal: 0 }] }, { not: { equal: 1200 } }] },
      },
      { field: 'zero', filter: { gt: 0 } },
      { field: 'series', filter: { oneOf: ['Retail'] } },
    ]);
    expect(result).toEqual([
      { title: 'Amount', value: '1234.5' },
      { title: 'series', value: 'Retail' },
    ]);
  });

  it.each([
    ['', true],
    ['0', true],
    [0, true],
    [false, true],
    [null, false],
    [undefined, false],
    [NaN, false],
    [Infinity, false],
    ['not numeric', false],
  ])('uses Vega finite/coercible valid semantics for %j', (value, valid) => {
    expect(fields([{ field: 'v', filter: { valid: true } }], { v: value })).toHaveLength(valid ? 1 : 0);
    expect(fields([{ field: 'v', filter: { valid: false } }], { v: value })).toHaveLength(valid ? 0 : 1);
  });

  it('returns no element or ARIA for all-filtered fields, not a fallback leaking other data', () => {
    const spec = explicit([
      { field: 'amount', filter: { lt: 0 } },
      { field: 'zero', filter: { gt: 0 } },
    ]);
    expect(buildVegaTooltip(spec, tooltipRow)).toEqual({ fields: [], ariaLabel: '', disabled: false });
    expect(renderVegaTooltip(spec, tooltipRow)).toBeNull();
  });

  it('evaluates conditional test expressions through the shared safe predicate helper', () => {
    const spec = explicit({
      condition: [
        { test: 'datum.zero === 0', value: 'zero selected' },
        { test: 'datum.amount > 0', field: 'secret' },
      ],
      value: 'fallback',
    });
    expect(buildVegaTooltip(spec, tooltipRow).fields).toEqual([{ title: '', value: 'zero selected' }]);
    expect(fields({ condition: { test: { field: 'zero', equal: 1 }, value: 'yes' }, value: 'no' })[0].value).toBe('no');
  });

  it.each([
    { field: 'secret', equal: 0 },
    { timeUnit: 'year', equal: 0 },
    { selection: 'brush' },
    'datum.zero > 0',
    { and: [] },
    { or: 'invalid' },
    { and: [{ equal: 0 }, { unsupported: true }] },
  ])('rejects invalid/unsupported filter %j rather than silently returning true', filter => {
    expect(() => fields([{ field: 'zero', filter }])).toThrow(/tooltip.*filter/i);
  });
});

describe('derived and aggregated datum provenance', () => {
  it('uses whole-spec groups for raw encoding aggregates, never a hovered singleton', () => {
    expect(buildVegaTooltip(aggregateTooltipSpec, { category: 'A', amount: 999 }).fields).toEqual([
      { title: 'Category', value: 'A' },
      { title: 'Average amount', value: '4.0' },
    ]);
  });

  it('reads an already aggregated Vega datum alias without recomputing its source values', () => {
    expect(buildVegaTooltip(aggregateTooltipSpec, { category: 'A', mean_amount: 42 }).fields[1]).toEqual({
      title: 'Average amount',
      value: '42.0',
    });
    expect(fields({ aggregate: 'count', title: 'Count', filter: { gte: 3 } }, { __count: 4 })).toEqual([
      { title: 'Count', value: '4' },
    ]);
  });

  it('fails instead of manufacturing a singleton aggregate when no provenance is available', () => {
    expect(() => fields({ field: 'amount', aggregate: 'mean' })).toThrow(/aggregate.*prepared|aggregate.*source/i);
    expect(() => fields({ field: 'amount', aggregate: 'unsupported' })).toThrow(/aggregate/i);
  });

  it('preserves prepared aggregate and escaped-field aliases with retained semantic titles', () => {
    const prepared = prepareVegaLiteSpec(aggregateTooltipSpec, { mode: 'strict' });
    expect(buildVegaTooltip(prepared, prepared.data!.values![0]).fields).toEqual([
      { title: 'Category', value: 'A' },
      { title: 'Average amount', value: '4.0' },
    ]);
    const escaped = prepareVegaLiteSpec(
      explicit({ field: 'a\\.b', title: 'Original dot' }, { data: { values: [tooltipRow] } }),
    );
    expect(buildVegaTooltip(escaped, escaped.data!.values![0]).fields).toEqual([
      { title: 'Original dot', value: '11' },
    ]);
  });

  it('binds time-unit and aggregate filters to the derived alias, without reapplying the unit', () => {
    const spec = explicit([
      { field: 'amount', aggregate: 'mean', filter: { gte: 40 }, title: 'Average' },
      {
        field: 'date',
        type: 'temporal',
        timeUnit: 'utcmonth',
        formatType: 'utc',
        format: '%Y-%m-%d',
        filter: { range: [new Date('1972-02-01Z'), new Date('1972-02-29Z')] },
        title: 'Month',
      },
    ]);
    expect(buildVegaTooltip(spec, { mean_amount: 42, utcmonth_date: new Date('1972-02-14Z') }).fields).toEqual([
      { title: 'Average', value: '42' },
      { title: 'Month', value: '1972-02-14' },
    ]);
  });

  it('supports Vega datetime filter bounds on derived temporal numbers and parsed input dates', () => {
    expect(
      fields(
        [
          {
            field: 'date',
            timeUnit: 'utcmonth',
            type: 'temporal',
            formatType: 'utc',
            format: '%B',
            filter: { equal: { month: 2 } },
          },
        ],
        { utcmonth_date: Date.UTC(1972, 1, 1) },
      ),
    ).toEqual([{ title: 'date', value: 'February' }]);
    const spec = explicit(
      [
        {
          field: 'date',
          type: 'temporal',
          formatType: 'utc',
          format: '%Y-%m-%d',
          filter: {
            range: [
              { year: 2024, month: 2, date: 1, utc: true },
              { year: 2024, month: 3, date: 1, utc: true },
            ],
          },
        },
      ],
      {
        data: { format: { parse: { date: "utc:'%d/%m/%Y'" } } },
      },
    );
    expect(buildVegaTooltip(spec, { date: '29/02/2024' }).fields[0].value).toBe('2024-02-29');
  });
});

describe('safe React rendering and hardened field access', () => {
  it('renders semantic labels/values, exact multiline text and matching ARIA without hidden fields', () => {
    const spec = explicit([
      { field: 'notes', type: 'nominal', title: 'Notes' },
      { field: 'zero', title: 'Zero' },
      { field: 'secret', tooltip: false },
    ]);
    const result = buildVegaTooltip(spec, tooltipRow);
    const { container } = render(renderVegaTooltip(spec, tooltipRow)!);
    const tooltip = screen.getByRole('tooltip', { name: 'Notes: first line\nsecond line; Zero: 0' });
    expect(tooltip.getAttribute('aria-label')).toBe(result.ariaLabel);
    expect(
      within(tooltip)
        .getAllByRole('term')
        .map(node => node.textContent),
    ).toEqual(['Notes', 'Zero']);
    const definitions = within(tooltip).getAllByRole('definition');
    expect(definitions.map(node => node.textContent)).toEqual(['first line\nsecond line', '0']);
    expect(getComputedStyle(definitions[0]).whiteSpace).toBe('pre-wrap');
    expect(container.textContent).not.toContain('DO NOT DISCLOSE');
    expect(container.querySelector('[tabindex], button, a, img')).toBeNull();
  });

  it('escapes constant markup and renders image URLs as text, never fetching images', () => {
    const payload = '<img src="https://example.invalid/private" onerror="alert(1)">';
    const spec = explicit([
      { value: payload, title: '<script>Title</script>' },
      { field: 'imageURL', title: 'Image' },
    ]);
    const { container } = render(renderVegaTooltip(spec, { imageURL: 'https://example.invalid/private' })!);
    expect(container.querySelector('img, script, a')).toBeNull();
    expect(container.textContent).toContain(payload);
    expect(renderToStaticMarkup(renderVegaTooltip(explicit({ value: payload }), {})!)).toContain('&lt;img');
  });

  it('never invokes inherited/getter/callable fields or user coercion hooks', () => {
    const getter = jest.fn(() => 'SECRET');
    const hook = jest.fn(() => 'SECRET');
    const row = Object.create({ inherited: 'SECRET' }) as Record<string, unknown>;
    Object.defineProperty(row, 'getter', { get: getter, enumerable: true });
    row.object = { toString: hook, valueOf: hook };
    row.callable = hook;
    row.safe = 0;
    expect(
      fields(
        [
          { field: 'inherited' },
          { field: 'getter' },
          { field: 'callable' },
          { field: 'constructor.prototype' },
          { field: 'object' },
          { field: 'safe' },
        ],
        row,
      ),
    ).toEqual([
      { title: 'object', value: '[Object]' },
      { title: 'safe', value: '0' },
    ]);
    expect(getter).not.toHaveBeenCalled();
    expect(hook).not.toHaveBeenCalled();
    expect(() =>
      fields({ condition: { test: 'datum.constructor.constructor("return 1")()', value: 'unsafe' } }, row),
    ).toThrow(/predicate|expression/i);
  });

  it('handles dangerous own keys as text without prototype pollution', () => {
    const row = JSON.parse('{"__proto__":"own proto", "constructor":"own constructor", "prototype":"own prototype"}');
    expect(fields([{ field: '__proto__' }, { field: 'constructor' }, { field: 'prototype' }], row)).toEqual([
      { title: '__proto__', value: 'own proto' },
      { title: 'constructor', value: 'own constructor' },
      { title: 'prototype', value: 'own prototype' },
    ]);
    expect(Object.getPrototypeOf(row)).toBe(Object.prototype);
    expect(Object.prototype).not.toHaveProperty('polluted');
  });

  it('does not invoke spec/array accessors or Date overrides', () => {
    const getter = jest.fn(() => 'SECRET');
    const definition = { title: 'Safe', field: 'zero' };
    Object.defineProperty(definition, 'format', { get: getter });
    const entries = [definition];
    Object.defineProperty(entries, '1', { get: getter, enumerable: true });
    expect(fields(entries)).toEqual([{ title: 'Safe', value: '0' }]);
    const date = new Date('2024-02-29Z');
    Object.defineProperty(date, 'valueOf', { value: getter });
    Object.defineProperty(date, 'getTime', { value: getter });
    expect(fields({ field: 'date', type: 'temporal', formatType: 'utc', format: '%Y' }, { date })[0].value).toBe(
      '2024',
    );
    expect(getter).not.toHaveBeenCalled();
  });

  it('does not execute predicate array accessors or object coercion in filter bounds', () => {
    const getter = jest.fn(() => ({ field: 'zero', equal: 0 }));
    const predicates: unknown[] = [];
    Object.defineProperty(predicates, '0', { get: getter, enumerable: true });
    expect(() => fields({ condition: { test: { and: predicates }, value: 'unsafe' }, value: 'fallback' })).toThrow(
      /predicate/i,
    );
    const coercion = jest.fn(() => 0);
    expect(() => fields([{ field: 'zero', filter: { range: [{ valueOf: coercion }, 1] } }])).toThrow(/filter/i);
    expect(getter).not.toHaveBeenCalled();
    expect(coercion).not.toHaveBeenCalled();
  });

  it('does not mutate frozen specs or rows and rejects invalid definitions/format types', () => {
    const row = Object.freeze({ v: 2 });
    const spec = Object.freeze(explicit(Object.freeze({ field: 'v', title: 'Value' })));
    expect(buildVegaTooltip(spec, row).fields).toEqual([{ title: 'Value', value: '2' }]);
    expect(() => fields({ field: 12 })).toThrow(/tooltip/i);
    expect(() => fields({ field: 'zero', formatType: 'unsafeCustomFunction' })).toThrow(/format/i);
    expect(() => fields({ field: 'zero', format: 'not a number format' })).toThrow(/format/i);
  });
});
