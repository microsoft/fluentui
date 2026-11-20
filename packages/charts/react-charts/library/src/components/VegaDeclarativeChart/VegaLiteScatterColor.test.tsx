import * as React from 'react';
import { render } from '@testing-library/react';
import { VegaDeclarativeChart } from '@fluentui/react-charts';
import { transformVegaLiteToScatterChartProps } from './VegaLiteSchemaAdapter';
import { getSequentialSchemeColors, getVegaColor } from './VegaLiteColorAdapter';
import { validateVegaLiteSpec } from './VegaLiteDiagnostics';
import type { VegaLiteSpec } from './VegaLiteTypes';

// Authored data colors, not UI styling. These reproduce the semantic Facet/Repeat examples.
const teal = '#2aa0a4';
const purple = '#9373c0';
const pointSpec: VegaLiteSpec = {
  width: 300,
  height: 230,
  mark: 'point',
  data: {
    values: [
      { x: 1, y: 2, group: 'A' },
      { x: 2, y: 4, group: 'B' },
    ],
  },
  encoding: { x: { field: 'x', type: 'quantitative' }, y: { field: 'y', type: 'quantitative' } },
};

// The actual initially selected Default schema, including its unsupported size metadata.
const adCtrSpec: VegaLiteSpec = JSON.parse(
  JSON.stringify({
    mark: 'point',
    data: {
      values: [
        { impressions: 50000, clicks: 1250, campaign: 'Summer Sale', ctr: 2.5 },
        { impressions: 75000, clicks: 2625, campaign: 'Back to School', ctr: 3.5 },
        { impressions: 120000, clicks: 3600, campaign: 'Holiday Special', ctr: 3.0 },
        { impressions: 45000, clicks: 1800, campaign: 'Flash Deal', ctr: 4.0 },
        { impressions: 90000, clicks: 3150, campaign: 'Spring Collection', ctr: 3.5 },
        { impressions: 60000, clicks: 1440, campaign: 'Clearance', ctr: 2.4 },
        { impressions: 100000, clicks: 4500, campaign: 'Black Friday', ctr: 4.5 },
      ],
    },
    encoding: {
      x: { field: 'impressions', type: 'quantitative' },
      y: { field: 'ctr', type: 'quantitative' },
      color: { field: 'ctr', type: 'quantitative', scale: { scheme: 'blues' }, legend: null },
      size: { field: 'clicks', type: 'quantitative', scale: { range: [100, 1000] }, legend: { title: 'Total Clicks' } },
      tooltip: [
        { field: 'campaign', type: 'nominal' },
        { field: 'impressions', type: 'quantitative', format: ',.0f' },
        { field: 'clicks', type: 'quantitative', format: ',.0f' },
        { field: 'ctr', type: 'quantitative', format: '.1f', title: 'CTR %' },
      ],
    },
  }),
);

const adapt = (spec: VegaLiteSpec) => transformVegaLiteToScatterChartProps(spec, { current: new Map() });

describe('native scatter color regressions', () => {
  afterEach(() => jest.restoreAllMocks());

  it.each(['legacy', 'strict'] as const)('honors static color over mark color in %s mode', mode => {
    const spec: VegaLiteSpec = {
      ...pointSpec,
      mark: { type: 'point', color: purple },
      encoding: { ...pointSpec.encoding, color: { value: teal } },
    };
    const before = JSON.stringify(spec);
    const props = transformVegaLiteToScatterChartProps(spec, { current: new Map() }, false, { mode });
    expect(props.data.scatterChartData).toHaveLength(1);
    expect(props.data.scatterChartData![0].color).toBe(teal);
    expect(props.hideLegend).toBe(true);
    expect(JSON.stringify(spec)).toBe(before);
  });

  it('uses mark color only when no field or value color is authored', () => {
    expect(adapt({ ...pointSpec, mark: { type: 'point', color: purple } }).data.scatterChartData![0].color).toBe(
      purple,
    );
  });

  it('field colors override mark color and respect categorical domain/range order', () => {
    const props = adapt({
      ...pointSpec,
      mark: { type: 'point', color: teal },
      encoding: {
        ...pointSpec.encoding,
        color: { field: 'group', type: 'nominal', scale: { domain: ['B', 'A'], range: [purple, teal] } },
      },
    });
    expect(props.data.scatterChartData).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ legend: 'A', color: teal }),
        expect.objectContaining({ legend: 'B', color: purple }),
      ]),
    );
    expect(props.hideLegend).toBe(false);
  });

  it('uses a named categorical scheme instead of a mark color', () => {
    const props = adapt({
      ...pointSpec,
      mark: { type: 'point', color: teal },
      encoding: {
        ...pointSpec.encoding,
        color: { field: 'group', type: 'nominal', scale: { scheme: 'tableau10' } },
      },
    });
    expect(props.data.scatterChartData!.map(series => series.color)).toEqual([
      getVegaColor(0, 'tableau10', undefined),
      getVegaColor(1, 'tableau10', undefined),
    ]);
  });

  it.each([null, { disable: true }])('hides an explicitly suppressed categorical legend: %s', legend => {
    const props = adapt({
      ...pointSpec,
      encoding: { ...pointSpec.encoding, color: { field: 'group', type: 'nominal', legend } },
    });
    expect(props.hideLegend).toBe(true);
  });

  it('maps Default CTR by numeric value to the shared blues ramp, without a categorical legend', () => {
    const before = JSON.stringify(adCtrSpec);
    const props = adapt(adCtrSpec);
    const series = props.data.scatterChartData!;
    expect(props.hideLegend).toBe(true);
    expect(series.find(group => group.legend === '2.4')!.color).toBe('#deebf7');
    expect(series.find(group => group.legend === '4.5')!.color).toBe('#084594');
    expect(new Set(series.map(group => group.color)).size).toBe(6);
    expect(
      series
        .flatMap(group => group.data)
        .map(point => point.markerSize)
        .sort((a, b) => a! - b!),
    ).toEqual([1250, 1440, 1800, 2625, 3150, 3600, 4500]);
    expect(JSON.stringify(adCtrSpec)).toBe(before);
  });

  it('interpolates quantitative values, not their encounter indexes, including explicit domains', () => {
    const spec: VegaLiteSpec = {
      ...pointSpec,
      data: {
        values: [
          { x: 1, y: 75 },
          { x: 2, y: 0 },
          { x: 3, y: 50 },
          { x: 4, y: 100 },
        ],
      },
      encoding: {
        ...pointSpec.encoding,
        color: { field: 'y', type: 'quantitative', scale: { domain: [0, 100], scheme: 'blues' }, legend: null },
      },
    };
    const colors = new Map(adapt(spec).data.scatterChartData!.map(group => [group.legend, group.color]));
    const ramp = getSequentialSchemeColors('blues')!;
    expect(colors).toEqual(
      new Map([
        ['75', ramp[3]],
        ['0', ramp[0]],
        ['50', ramp[2]],
        ['100', ramp[4]],
      ]),
    );
  });

  it('interpolates custom continuous ranges rather than cycling them categorically', () => {
    const props = adapt({
      ...pointSpec,
      data: {
        values: [
          { x: 1, y: 0 },
          { x: 2, y: 50 },
          { x: 3, y: 100 },
        ],
      },
      encoding: {
        ...pointSpec.encoding,
        color: {
          field: 'y',
          type: 'quantitative',
          scale: { domain: [0, 100], range: ['#000000', '#ffffff'] },
          legend: null,
        },
      },
    });
    expect(props.data.scatterChartData!.map(group => group.color)).toEqual([
      'rgb(0, 0, 0)',
      'rgb(128, 128, 128)',
      'rgb(255, 255, 255)',
    ]);
  });

  it('does not let cached categorical colors override an authored continuous ramp', () => {
    const props = transformVegaLiteToScatterChartProps(adCtrSpec, {
      current: new Map([
        ['2.4', purple],
        ['4.5', teal],
      ]),
    });
    expect(props.data.scatterChartData!.find(group => group.legend === '2.4')!.color).toBe('#deebf7');
    expect(props.data.scatterChartData!.find(group => group.legend === '4.5')!.color).toBe('#084594');
  });

  it('uses the midpoint for a constant quantitative domain, not an encounter-index color', () => {
    const props = adapt({
      ...pointSpec,
      data: {
        values: [
          { x: 1, y: 2 },
          { x: 2, y: 2 },
        ],
      },
      encoding: {
        ...pointSpec.encoding,
        color: { field: 'y', type: 'quantitative', scale: { scheme: 'blues' }, legend: null },
      },
    });
    expect(props.data.scatterChartData![0].color).toBe('rgb(66, 146, 198)');
  });

  it('rejects an unknown continuous scheme instead of silently substituting categorical colors', () => {
    expect(() =>
      adapt({
        ...adCtrSpec,
        encoding: {
          ...adCtrSpec.encoding,
          color: { ...adCtrSpec.encoding!.color, scale: { scheme: 'not-a-ramp' } },
        },
      }),
    ).toThrow('unsupported continuous scatter color scheme');
  });

  it.each(['legacy', 'strict'] as const)(
    'keeps unsupported size scale/legend declarations visible in %s diagnostics',
    mode => {
      const diagnostics = validateVegaLiteSpec(adCtrSpec, { mode });
      expect(diagnostics).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ path: '$.encoding.size.scale', severity: mode === 'strict' ? 'error' : 'warning' }),
          expect.objectContaining({
            path: '$.encoding.size.legend',
            severity: mode === 'strict' ? 'error' : 'warning',
          }),
        ]),
      );
      expect(diagnostics.filter(diagnostic => diagnostic.path.startsWith('$.encoding.color'))).toHaveLength(0);
    },
  );

  it.each(['facet', 'repeat'] as const)('renders authored %s colors through the public chart import', composition => {
    mockNativeLayout();
    const { data, ...unit } = pointSpec;
    const color = composition === 'facet' ? teal : purple;
    const coloredUnit = { ...unit, encoding: { ...unit.encoding, color: { value: color } } };
    const spec: VegaLiteSpec =
      composition === 'facet'
        ? { data, facet: { field: 'group', type: 'nominal' }, spec: coloredUnit }
        : { data, repeat: ['x', 'y'], spec: coloredUnit };
    const { container } = render(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} semanticMode="strict" />);
    const marks = container.querySelectorAll('svg.fui-cart__chart circle[role="option"]');
    expect(marks).toHaveLength(composition === 'facet' ? 2 : 4);
    marks.forEach(mark => expect(mark).toHaveAttribute('stroke', color));
    expect(container.querySelectorAll('.fui-legend__root button.fui-legend__legend')).toHaveLength(0);
  });

  it('renders Default per-value blue marks, preserving raw clicks in accessible tooltips', () => {
    mockNativeLayout();
    const { container } = render(
      <VegaDeclarativeChart chartSchema={{ vegaLiteSpec: adCtrSpec }} semanticMode="legacy" />,
    );
    const marks = Array.from(container.querySelectorAll('svg.fui-cart__chart circle[role="option"]'));
    expect(marks).toHaveLength(7);
    expect(marks.find(mark => mark.getAttribute('aria-label')!.includes('Black Friday'))).toHaveAttribute(
      'stroke',
      '#084594',
    );
    expect(marks.find(mark => mark.getAttribute('aria-label')!.includes('Clearance'))).toHaveAttribute(
      'stroke',
      '#deebf7',
    );
    expect(
      marks.find(mark => mark.getAttribute('aria-label')!.includes('Black Friday'))!.getAttribute('aria-label'),
    ).toContain('4,500');
    expect(container.querySelectorAll('.fui-legend__root button.fui-legend__legend')).toHaveLength(0);
    // Native radius fitting is NOT Vega's authored area range [100, 1000].
    marks.forEach(mark => expect(Number(mark.getAttribute('r'))).toBeGreaterThanOrEqual(4));
  });
});

function mockNativeLayout(): void {
  jest.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({
    width: 640,
    height: 350,
    top: 0,
    left: 0,
    right: 640,
    bottom: 350,
    x: 0,
    y: 0,
    toJSON: () => ({}),
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
}
