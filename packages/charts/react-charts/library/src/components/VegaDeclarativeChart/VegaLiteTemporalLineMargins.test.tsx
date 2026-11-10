import { renderToStaticMarkup } from 'react-dom/server';
import { transformVegaLiteToLineChartProps } from './VegaLiteSchemaAdapter';
import { resolveVegaLiteResources } from './VegaLiteResourceLoader';
import type { VegaLiteSpec } from './VegaLiteTypes';
import { specificationCorpus } from './testing/specs/manifest';

const cases = [
  {
    file: 'yearmonthdate-transform.vl.json',
    points: [
      { date: '2024-02-29T00:00:00.000Z', y: 4, tooltip: '2024-03-01' },
      { date: '2024-03-01T00:00:00.000Z', y: 2, tooltip: '2024-02-29' },
    ],
  },
  {
    file: 'managed-resource.vl.json',
    points: [
      { date: '2024-01-02T00:00:00.000Z', y: 6, tooltip: '6.0' },
      { date: '2024-01-03T00:00:00.000Z', y: 12, tooltip: '12.0' },
    ],
  },
];

describe.each(cases)('temporal LineChart endpoint gutter: $file', fixture => {
  let spec: VegaLiteSpec;

  beforeEach(async () => {
    const entry = specificationCorpus.find(candidate => candidate.file === fixture.file)!;
    spec = entry.resource
      ? await resolveVegaLiteResources(entry.spec, {
          resolveData: async () => entry.resource!.rows.map(row => ({ ...row })),
          signal: new AbortController().signal,
          allowedOrigins: ['https://fixtures.example.test'],
        })
      : entry.spec;
  });

  it.each(['legacy', 'strict'] as const)('reserves an ISO-day gutter without changing %s data or tooltips', mode => {
    const original = JSON.stringify(spec);
    const props = transformVegaLiteToLineChartProps(spec, { current: new Map() }, false, { mode });
    expect(props).toMatchObject({ width: 640, height: 400, margins: { right: 40 }, tickFormat: '%Y-%m-%d' });
    expect(props.xMinValue).toBeUndefined();
    expect(props.xMaxValue).toBeUndefined();
    expect(props.tickValues).toBeUndefined();
    const series = props.data.lineChartData![0];
    const points = [...series.data].sort((a, b) => Number(a.x) - Number(b.x));
    expect(points).toHaveLength(2);
    points.forEach((point, index) => {
      const expected = fixture.points[index];
      expect(point.x).toEqual(new Date(expected.date));
      expect(point.y).toBe(expected.y);
      const callout = props.onRenderCalloutPerDataPoint!({
        x: point.x,
        values: [{ legend: series.legend, y: point.y, color: series.color! }],
      });
      expect(callout).toBeTruthy();
      expect(renderToStaticMarkup(callout!)).toContain(`>${expected.tooltip}<`);
    });
    expect(JSON.stringify(spec)).toBe(original);
  });

  it('retains explicit temporal bounds and the last real point instead of extending the data domain', () => {
    const domain = fixture.points.map(point => point.date);
    const bounded: VegaLiteSpec = {
      ...spec,
      encoding: {
        ...spec.encoding,
        x: { ...spec.encoding!.x!, scale: { ...spec.encoding!.x!.scale, domain } },
      },
    };
    const original = JSON.stringify(bounded);
    const props = transformVegaLiteToLineChartProps(bounded, { current: new Map() }, false, { mode: 'strict' });
    expect(props.margins).toEqual({ right: 40 });
    expect(props.xMinValue).toBe(Date.parse(domain[0]));
    expect(props.xMaxValue).toBe(Date.parse(domain[1]));
    expect(props.tickValues).toEqual(domain.map(date => new Date(date)));
    expect(props.data.lineChartData![0].data).toEqual(
      expect.arrayContaining(
        fixture.points.map(point => expect.objectContaining({ x: new Date(point.date), y: point.y })),
      ),
    );
    expect(JSON.stringify(bounded)).toBe(original);
  });

  it.each([undefined, '%B %d, %Y'])('does not assume the same gutter fits another date format: %s', format => {
    const otherFormat: VegaLiteSpec = {
      ...spec,
      encoding: { ...spec.encoding, x: { ...spec.encoding!.x!, axis: { format } } },
    };
    expect(transformVegaLiteToLineChartProps(otherFormat, { current: new Map() }).margins).toBeUndefined();
  });
});

it('retains the native margins for quantitative LineCharts', () => {
  const spec: VegaLiteSpec = {
    mark: 'line',
    data: {
      values: [
        { x: 1, y: 2 },
        { x: 2, y: 3 },
      ],
    },
    encoding: { x: { field: 'x', type: 'quantitative' }, y: { field: 'y', type: 'quantitative' } },
  };
  expect(transformVegaLiteToLineChartProps(spec, { current: new Map() }).margins).toBeUndefined();
});
