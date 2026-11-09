import { render } from '@testing-library/react';
import { DeclarativeChart } from './index';
import * as React from 'react';
import { resetIds } from '../../Utilities';
import { renderToString } from 'react-dom/server';
import { InjectionMode, Stylesheet } from '@fluentui/react/lib/Styling';
import type { PlotlySchema } from '@fluentui/chart-utilities';

describe('DeclarativeChart', () => {
  const mockGetComputedTextLength = jest.fn().mockReturnValue(100);
  // Replace the original method with the mock implementation
  Object.defineProperty(
    Object.getPrototypeOf(document.createElementNS('http://www.w3.org/2000/svg', 'tspan')),
    'getComputedTextLength',
    {
      value: mockGetComputedTextLength,
    },
  );

  const originalRAF = window.requestAnimationFrame;

  beforeEach(() => {
    resetIds();

    jest.useFakeTimers();
    Object.defineProperty(window, 'requestAnimationFrame', {
      writable: true,
      value: (callback: FrameRequestCallback) => callback(0),
    });

    window.HTMLElement.prototype.getBoundingClientRect = jest.fn().mockReturnValue({ width: 600, height: 350 });
  });

  afterEach(() => {
    jest.useRealTimers();
    window.requestAnimationFrame = originalRAF;
  });

  test('Should render areachart in DeclarativeChart', () => {
    // Arrange
    const plotlySchema = require('./tests/schema/fluent_area_test.json');
    const { container } = render(<DeclarativeChart key={'areachart'} chartSchema={{ plotlySchema }} />);
    expect(container).toMatchSnapshot();
  });

  test('Should render donutchart in DeclarativeChart', () => {
    // Arrange
    const plotlySchema = require('./tests/schema/fluent_donut_test.json');
    const { container } = render(<DeclarativeChart key={'donutchart'} chartSchema={{ plotlySchema }} />);
    expect(container).toMatchSnapshot();
  });

  test('Should render gaugechart in DeclarativeChart', () => {
    // Arrange
    const plotlySchema = require('./tests/schema/fluent_gauge_test.json');
    const { container } = render(<DeclarativeChart key={'gaugechart'} chartSchema={{ plotlySchema }} />);
    expect(container).toMatchSnapshot();
  });

  test('Should render heatmapchart in DeclarativeChart', () => {
    // Arrange
    const plotlySchema = require('./tests/schema/fluent_heatmap_test.json');
    const { container } = render(<DeclarativeChart key={'heatmapchart'} chartSchema={{ plotlySchema }} />);
    expect(container).toMatchSnapshot();
  });

  test.skip('Should render linechart in DeclarativeChart', () => {
    // Arrange
    const plotlySchema = require('./tests/schema/fluent_line_test.json');
    const { container } = render(<DeclarativeChart key={'linechart'} chartSchema={{ plotlySchema }} />);
    expect(container).toMatchSnapshot();
  });

  test('Should render piechart in DeclarativeChart', () => {
    // Arrange
    const plotlySchema = require('./tests/schema/fluent_pie_test.json');
    const { container } = render(<DeclarativeChart key={'piechart'} chartSchema={{ plotlySchema }} />);
    expect(container).toMatchSnapshot();
  });

  test('Should render sankeychart in DeclarativeChart', () => {
    // Arrange
    const plotlySchema = require('./tests/schema/fluent_sankey_test.json');
    const { container } = render(<DeclarativeChart key={'sankeychart'} chartSchema={{ plotlySchema }} />);
    expect(container).toMatchSnapshot();
  });

  test.skip('Should render verticalbarchart in DeclarativeChart', () => {
    // Arrange
    const plotlySchema = require('./tests/schema/fluent_verticalbar_test.json');
    const { container } = render(<DeclarativeChart key={'verticalbarchart'} chartSchema={{ plotlySchema }} />);
    expect(container).toMatchSnapshot();
  });

  test.skip('Should render histogram chart in DeclarativeChart', () => {
    // Arrange
    const plotlySchema = require('./tests/schema/fluent_verticalbar_histogram_test.json');
    const { container } = render(<DeclarativeChart key={'histogram'} chartSchema={{ plotlySchema }} />);
    expect(container).toMatchSnapshot();
  });

  test.skip('Should render horizontalbar chart in DeclarativeChart', () => {
    // Arrange
    const plotlySchema = require('./tests/schema/fluent_horizontalbar_test.json');
    const { container } = render(<DeclarativeChart key={'histogram'} chartSchema={{ plotlySchema }} />);
    expect(container).toMatchSnapshot();
  });
});

describe('DeclarativeChart SSR colors', () => {
  const stylesheet = Stylesheet.getInstance();

  beforeEach(() => {
    stylesheet.reset();
    stylesheet.setConfig({ injectionMode: InjectionMode.none });
  });

  afterEach(() => {
    stylesheet.reset();
    stylesheet.setConfig({ injectionMode: InjectionMode.insertNode });
  });

  test.each(['marker', 'piecolorway'] as const)('rejects CSS rules injected through %s colors', source => {
    const payload = 'red;} .css-injection-sentinel { --injected: 731; } .resume { color:red';
    const plotlySchema: PlotlySchema = {
      data: [
        {
          type: 'pie',
          labels: ['A'],
          values: [1],
          marker: { colors: source === 'marker' ? [payload] : undefined },
        },
      ],
      layout: { piecolorway: source === 'piecolorway' ? [payload] : undefined },
    };

    const html = renderToString(<DeclarativeChart chartSchema={{ plotlySchema }} />);
    const css = stylesheet.getRules(true);

    expect(html).toContain('A');
    expect(css).toContain('background-color:');
    expect(css).not.toContain('css-injection-sentinel');
    expect(css).not.toContain('--injected');
  });

  test('preserves valid marker colors in serialized legend styles', () => {
    const plotlySchema: PlotlySchema = {
      data: [{ type: 'pie', labels: ['A'], values: [1], marker: { colors: ['rebeccapurple'] } }],
      layout: {},
    };

    renderToString(<DeclarativeChart chartSchema={{ plotlySchema }} />);

    expect(stylesheet.getRules(true)).toContain('background-color:rebeccapurple');
  });
});
