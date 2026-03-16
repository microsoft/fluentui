import { render } from '@testing-library/react';
import { DeclarativeChart } from './index';
import * as React from 'react';
import { resetIds } from '../../Utilities';

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
