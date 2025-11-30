import * as React from 'react';
import { render } from '@testing-library/react';
import { VegaDeclarativeChart } from './VegaDeclarativeChart';
import type { IVegaDeclarativeChartProps } from './VegaDeclarativeChart.types';

// Suppress console warnings for cleaner test output
beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('VegaDeclarativeChart - Scatter Charts', () => {
  it('should render scatter chart with basic point encoding', () => {
    const scatterSpec = {
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      data: {
        values: [
          { x: 10, y: 20, category: 'A' },
          { x: 20, y: 30, category: 'B' },
          { x: 30, y: 25, category: 'A' },
          { x: 40, y: 35, category: 'B' },
          { x: 50, y: 40, category: 'C' },
        ],
      },
      mark: 'point',
      encoding: {
        x: { field: 'x', type: 'quantitative' },
        y: { field: 'y', type: 'quantitative' },
        color: { field: 'category', type: 'nominal' },
      },
    };

    const props: IVegaDeclarativeChartProps = {
      chartSchema: { vegaLiteSpec: scatterSpec },
    };

    const { container } = render(<VegaDeclarativeChart {...props} />);

    // Check that an SVG element is rendered
    expect(container.querySelector('svg')).toBeInTheDocument();
    
    // Check for scatter plot elements (circles or points)
    const circles = container.querySelectorAll('circle');
    expect(circles.length).toBeGreaterThan(0);

    // Snapshot test
    expect(container).toMatchSnapshot();
  });

  it('should render scatter chart with size encoding', () => {
    const scatterSpec = {
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      data: {
        values: [
          { height: 160, weight: 52, bmi: 20.3, category: 'Normal' },
          { height: 165, weight: 68, bmi: 25.0, category: 'Overweight' },
          { height: 170, weight: 75, bmi: 25.9, category: 'Overweight' },
          { height: 175, weight: 70, bmi: 22.9, category: 'Normal' },
          { height: 180, weight: 95, bmi: 29.3, category: 'Overweight' },
        ],
      },
      mark: 'point',
      encoding: {
        x: { field: 'height', type: 'quantitative' },
        y: { field: 'weight', type: 'quantitative' },
        color: { field: 'category', type: 'nominal' },
        size: { value: 100 },
      },
    };

    const props: IVegaDeclarativeChartProps = {
      chartSchema: { vegaLiteSpec: scatterSpec },
    };

    const { container } = render(<VegaDeclarativeChart {...props} />);

    expect(container.querySelector('svg')).toBeInTheDocument();
    const circles = container.querySelectorAll('circle');
    expect(circles.length).toBeGreaterThan(0);

    expect(container).toMatchSnapshot();
  });

  it('should render scatter chart from actual bmi_scatter.json schema', () => {
    const bmiScatterSpec = {
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      description: 'BMI distribution analysis',
      data: {
        values: [
          { height: 160, weight: 52, bmi: 20.3, category: 'Normal' },
          { height: 165, weight: 68, bmi: 25.0, category: 'Overweight' },
          { height: 170, weight: 75, bmi: 25.9, category: 'Overweight' },
          { height: 175, weight: 70, bmi: 22.9, category: 'Normal' },
          { height: 180, weight: 95, bmi: 29.3, category: 'Overweight' },
          { height: 158, weight: 45, bmi: 18.0, category: 'Underweight' },
          { height: 172, weight: 82, bmi: 27.7, category: 'Overweight' },
          { height: 168, weight: 58, bmi: 20.5, category: 'Normal' },
          { height: 177, weight: 88, bmi: 28.1, category: 'Overweight' },
          { height: 162, weight: 48, bmi: 18.3, category: 'Underweight' },
        ],
      },
      mark: 'point',
      encoding: {
        x: { field: 'height', type: 'quantitative', axis: { title: 'Height (cm)' } },
        y: { field: 'weight', type: 'quantitative', axis: { title: 'Weight (kg)' } },
        color: {
          field: 'category',
          type: 'nominal',
          scale: { domain: ['Underweight', 'Normal', 'Overweight'], range: ['#ff7f0e', '#2ca02c', '#d62728'] },
          legend: { title: 'BMI Category' },
        },
        size: { value: 100 },
        tooltip: [
          { field: 'height', type: 'quantitative', title: 'Height (cm)' },
          { field: 'weight', type: 'quantitative', title: 'Weight (kg)' },
          { field: 'bmi', type: 'quantitative', title: 'BMI', format: '.1f' },
          { field: 'category', type: 'nominal', title: 'Category' },
        ],
      },
      title: 'BMI Distribution Scatter',
    };

    const props: IVegaDeclarativeChartProps = {
      chartSchema: { vegaLiteSpec: bmiScatterSpec },
    };

    const { container } = render(<VegaDeclarativeChart {...props} />);

    // Verify SVG is rendered
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();

    // Verify scatter points are rendered
    const circles = container.querySelectorAll('circle');
    expect(circles.length).toBeGreaterThan(0);

    expect(container).toMatchSnapshot();
  });
});

describe('VegaDeclarativeChart - Heatmap Charts', () => {
  it('should render heatmap with rect marks and quantitative color', () => {
    const heatmapSpec = {
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      data: {
        values: [
          { x: 'A', y: 'Mon', value: 10 },
          { x: 'B', y: 'Mon', value: 20 },
          { x: 'A', y: 'Tue', value: 30 },
          { x: 'B', y: 'Tue', value: 40 },
        ],
      },
      mark: 'rect',
      encoding: {
        x: { field: 'x', type: 'ordinal' },
        y: { field: 'y', type: 'ordinal' },
        color: { field: 'value', type: 'quantitative' },
      },
    };

    const props: IVegaDeclarativeChartProps = {
      chartSchema: { vegaLiteSpec: heatmapSpec },
    };

    const { container } = render(<VegaDeclarativeChart {...props} />);

    // Check that an SVG element is rendered
    expect(container.querySelector('svg')).toBeInTheDocument();
    
    // Check for heatmap rectangles
    const rects = container.querySelectorAll('rect');
    expect(rects.length).toBeGreaterThan(0);

    expect(container).toMatchSnapshot();
  });

  it('should render heatmap from actual air_quality_heatmap.json schema', () => {
    const airQualitySpec = {
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      description: 'Air quality index by location',
      data: {
        values: [
          { city: 'New York', time: 'Morning', aqi: 45 },
          { city: 'New York', time: 'Afternoon', aqi: 62 },
          { city: 'New York', time: 'Evening', aqi: 58 },
          { city: 'Los Angeles', time: 'Morning', aqi: 85 },
          { city: 'Los Angeles', time: 'Afternoon', aqi: 95 },
          { city: 'Los Angeles', time: 'Evening', aqi: 78 },
          { city: 'Chicago', time: 'Morning', aqi: 52 },
          { city: 'Chicago', time: 'Afternoon', aqi: 68 },
          { city: 'Chicago', time: 'Evening', aqi: 61 },
          { city: 'Houston', time: 'Morning', aqi: 72 },
          { city: 'Houston', time: 'Afternoon', aqi: 88 },
          { city: 'Houston', time: 'Evening', aqi: 75 },
        ],
      },
      mark: 'rect',
      encoding: {
        x: { field: 'time', type: 'ordinal', axis: { title: 'Time of Day' } },
        y: { field: 'city', type: 'ordinal', axis: { title: 'City' } },
        color: {
          field: 'aqi',
          type: 'quantitative',
          scale: { scheme: 'redyellowgreen', domain: [0, 150], reverse: true },
          legend: { title: 'AQI' },
        },
        tooltip: [
          { field: 'city', type: 'ordinal' },
          { field: 'time', type: 'ordinal' },
          { field: 'aqi', type: 'quantitative', title: 'Air Quality Index' },
        ],
      },
      title: 'Air Quality Index Heatmap',
    };

    const props: IVegaDeclarativeChartProps = {
      chartSchema: { vegaLiteSpec: airQualitySpec },
    };

    const { container } = render(<VegaDeclarativeChart {...props} />);

    // Verify SVG is rendered
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();

    // Verify heatmap rectangles are rendered
    const rects = container.querySelectorAll('rect');
    expect(rects.length).toBeGreaterThan(0);

    expect(container).toMatchSnapshot();
  });

  it('should render heatmap from actual attendance_heatmap.json schema', () => {
    const attendanceSpec = {
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      description: 'Class attendance patterns',
      data: {
        values: [
          { day: 'Monday', period: 'Period 1', attendance: 92 },
          { day: 'Monday', period: 'Period 2', attendance: 89 },
          { day: 'Monday', period: 'Period 3', attendance: 87 },
          { day: 'Monday', period: 'Period 4', attendance: 85 },
          { day: 'Tuesday', period: 'Period 1', attendance: 90 },
          { day: 'Tuesday', period: 'Period 2', attendance: 88 },
          { day: 'Tuesday', period: 'Period 3', attendance: 91 },
          { day: 'Tuesday', period: 'Period 4', attendance: 86 },
          { day: 'Wednesday', period: 'Period 1', attendance: 94 },
          { day: 'Wednesday', period: 'Period 2', attendance: 92 },
          { day: 'Wednesday', period: 'Period 3', attendance: 90 },
          { day: 'Wednesday', period: 'Period 4', attendance: 88 },
        ],
      },
      mark: 'rect',
      encoding: {
        x: { field: 'day', type: 'ordinal', axis: { title: 'Day of Week' } },
        y: { field: 'period', type: 'ordinal', axis: { title: 'Class Period' } },
        color: {
          field: 'attendance',
          type: 'quantitative',
          scale: { scheme: 'blues' },
          legend: { title: 'Attendance %' },
        },
        tooltip: [
          { field: 'day', type: 'ordinal' },
          { field: 'period', type: 'ordinal' },
          { field: 'attendance', type: 'quantitative', title: 'Attendance %', format: '.0f' },
        ],
      },
      title: 'Weekly Attendance Patterns',
    };

    const props: IVegaDeclarativeChartProps = {
      chartSchema: { vegaLiteSpec: attendanceSpec },
    };

    const { container } = render(<VegaDeclarativeChart {...props} />);

    // Verify SVG is rendered
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();

    // Verify heatmap rectangles are rendered
    const rects = container.querySelectorAll('rect');
    expect(rects.length).toBeGreaterThan(0);

    expect(container).toMatchSnapshot();
  });
});

describe('VegaDeclarativeChart - Chart Type Detection', () => {
  it('should detect scatter chart type from point mark', () => {
    const scatterSpec = {
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      data: { values: [{ x: 1, y: 2 }] },
      mark: 'point',
      encoding: {
        x: { field: 'x', type: 'quantitative' },
        y: { field: 'y', type: 'quantitative' },
      },
    };

    const props: IVegaDeclarativeChartProps = {
      chartSchema: { vegaLiteSpec: scatterSpec },
    };

    const { container } = render(<VegaDeclarativeChart {...props} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('should detect heatmap chart type from rect mark with quantitative color', () => {
    const heatmapSpec = {
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      data: { values: [{ x: 'A', y: 'B', value: 10 }] },
      mark: 'rect',
      encoding: {
        x: { field: 'x', type: 'ordinal' },
        y: { field: 'y', type: 'ordinal' },
        color: { field: 'value', type: 'quantitative' },
      },
    };

    const props: IVegaDeclarativeChartProps = {
      chartSchema: { vegaLiteSpec: heatmapSpec },
    };

    const { container } = render(<VegaDeclarativeChart {...props} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
