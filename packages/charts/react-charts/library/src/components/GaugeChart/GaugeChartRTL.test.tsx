import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import * as React from 'react';
import { FluentProvider } from '@fluentui/react-provider';
import { GaugeChart } from './GaugeChart';
import { getByClass, testWithoutWait, testScreenResolutionChanges } from '../../utilities/TestUtility.test';
import { axe, toHaveNoViolations } from 'jest-axe';
import { DataVizPalette } from '../../utilities/colors';

expect.extend(toHaveNoViolations);

const segments = [
  { size: 33, color: DataVizPalette.success, legend: 'Low Risk' },
  { size: 34, color: DataVizPalette.warning, legend: 'Medium Risk' },
  { size: 33, color: DataVizPalette.error, legend: 'High Risk' },
];
const originalRAF = window.requestAnimationFrame;

function sharedAfterEach() {
  jest.useRealTimers();
  window.requestAnimationFrame = originalRAF;
}

beforeAll(() => {
  // https://github.com/jsdom/jsdom/issues/3368
  global.ResizeObserver = class ResizeObserver {
    public observe() {
      // do nothing
    }
    public unobserve() {
      // do nothing
    }
    public disconnect() {
      // do nothing
    }
  };
});

describe('Gauge chart rendering - ', () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.1);
  });

  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
    sharedAfterEach();
  });

  const mockGetComputedTextLength = jest.fn().mockReturnValue(100);
  // Replace the original method with the mock implementation
  Object.defineProperty(
    Object.getPrototypeOf(document.createElementNS('http://www.w3.org/2000/svg', 'tspan')),
    'getComputedTextLength',
    {
      value: mockGetComputedTextLength,
    },
  );
  testWithoutWait('Should render properly without chart value', GaugeChart, { segments: segments }, container => {
    // Assert
    expect(container).toMatchSnapshot();
  });

  testWithoutWait(
    'Should render properly with chart value',
    GaugeChart,
    { segments: segments, chartValue: 30 },
    container => {
      // Assert
      expect(container).toMatchSnapshot();
    },
  );

  testWithoutWait(
    'Should render properly with chart title',
    GaugeChart,
    { segments: segments, chartValue: 30, chartTitle: 'Gauge Chart with title' },
    container => {
      // Assert
      expect(container).toMatchSnapshot();
    },
  );

  testWithoutWait(
    'Should render properly with roundCorners',
    GaugeChart,
    { segments: segments, chartValue: 30, roundCorners: true },
    container => {
      // Assert
      expect(container).toMatchSnapshot();
    },
  );
});

describe('Gauge chart interactions', () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.1);
  });
  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
    sharedAfterEach();
  });

  testWithoutWait(
    'Should show callout on mouse over',
    GaugeChart,
    { segments: segments, chartValue: 30 },
    container => {
      const segments = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'path');
      fireEvent.mouseOver(segments[0]);
      // Assert
      expect(container).toMatchSnapshot();
    },
  );

  testWithoutWait(
    'Should not show callout on mouse over when hideTooltip is true',
    GaugeChart,
    { segments: segments, chartValue: 30, hideTooltip: true },
    container => {
      const segments = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'path');
      fireEvent.mouseOver(segments[0]);
      // Assert
      expect(container).toMatchSnapshot();
    },
  );

  testWithoutWait(
    'Should hide callout on mouse leave',
    GaugeChart,
    { segments: segments, chartValue: 30 },
    container => {
      const segments = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'path');
      fireEvent.mouseOver(segments[0]);
      // Assert
      expect(container).toMatchSnapshot();
      fireEvent.mouseLeave(segments[0]);
      expect(container).toMatchSnapshot();
    },
  );

  testWithoutWait('Should show callout on focus', GaugeChart, { segments: segments, chartValue: 30 }, container => {
    const segments = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'path');
    fireEvent.focus(segments[0]);
    // Assert
    expect(container).toMatchSnapshot();
  });
});

describe('Gauge chart - Subcomponent Legend', () => {
  afterEach(sharedAfterEach);
  testWithoutWait(
    'Should render chart with legends properly',
    GaugeChart,
    { segments: segments, chartValue: 30 },
    container => {
      expect(getByClass(container, /rect/i)).toHaveLength(3);
    },
  );

  testWithoutWait(
    'Should not show legends when hideLegend is true',
    GaugeChart,
    { segments: segments, chartValue: 30, hideLegend: true },
    container => {
      expect(getByClass(container, /rect/i)).toHaveLength(0);
    },
  );

  testWithoutWait(
    'Should reduce the opacity of the other segments and legends on mouse over a legend',
    GaugeChart,
    { segments: segments, chartValue: 30 },
    container => {
      const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      expect(legends).toHaveLength(3);
      fireEvent.mouseOver(legends[0]);
      expect(container).toMatchSnapshot();
      const legendsAfterMouseOver = getByClass(container, /legend__text/i);
      expect(legendsAfterMouseOver).toHaveLength(3);
      expect(legendsAfterMouseOver[1]).toHaveStyle('opacity: 0.67');
      expect(legendsAfterMouseOver[2]).toHaveStyle('opacity: 0.67');
      const segments = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'path');
      expect(segments[0]).toHaveAttribute('opacity', '1');
      expect(segments[1]).toHaveAttribute('opacity', '0.1');
      expect(segments[2]).toHaveAttribute('opacity', '0.1');
    },
  );

  testWithoutWait(
    'Should reduce the opacity of the other segments and legends on mouse click on a legend',
    GaugeChart,
    { segments: segments, chartValue: 30 },
    container => {
      const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      expect(legends).toHaveLength(3);
      fireEvent.click(legends[0]);
      expect(container).toMatchSnapshot();
      const legendsAfterMouseOver = getByClass(container, /legend__text/i);
      expect(legendsAfterMouseOver).toHaveLength(3);
      expect(legendsAfterMouseOver[1]).toHaveStyle('opacity: 0.67');
      expect(legendsAfterMouseOver[2]).toHaveStyle('opacity: 0.67');
      const segments = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'path');
      expect(segments[0]).toHaveAttribute('opacity', '1');
      expect(segments[1]).toHaveAttribute('opacity', '0.1');
      expect(segments[2]).toHaveAttribute('opacity', '0.1');
    },
  );

  testWithoutWait(
    'Should update the opacity of the other segments and legends on double mouse click on a legend',
    GaugeChart,
    { segments: segments, chartValue: 30 },
    container => {
      const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      expect(legends).toHaveLength(3);
      fireEvent.click(legends[0]);
      const legendsAfterMouseOver = getByClass(container, /legend__text/i);
      expect(legendsAfterMouseOver).toHaveLength(3);
      expect(legendsAfterMouseOver[1]).toHaveStyle('opacity: 0.67');
      expect(legendsAfterMouseOver[2]).toHaveStyle('opacity: 0.67');
      const segments = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'path');
      expect(segments[0]).toHaveAttribute('opacity', '1');
      expect(segments[1]).toHaveAttribute('opacity', '0.1');
      expect(segments[2]).toHaveAttribute('opacity', '0.1');
      fireEvent.click(legends[0]);
      expect(segments[0]).toHaveAttribute('opacity', '1');
      expect(segments[1]).toHaveAttribute('opacity', '1');
      expect(segments[2]).toHaveAttribute('opacity', '1');
    },
  );

  testWithoutWait(
    'Should select legend when mouse click on legend',
    GaugeChart,
    { segments: segments, chartValue: 30 },
    container => {
      const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      expect(legends).toHaveLength(3);
      fireEvent.click(legends[0]);
      expect(legends[0]).toHaveAttribute('aria-selected', 'true');
      expect(legends[1]).toHaveAttribute('aria-selected', 'false');
      expect(legends[2]).toHaveAttribute('aria-selected', 'false');
    },
  );

  testWithoutWait(
    'Should deselect legend when mouse double click on legend',
    GaugeChart,
    { segments: segments, chartValue: 30 },
    container => {
      const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      expect(legends).toHaveLength(3);
      fireEvent.click(legends[0]);
      expect(legends[0]).toHaveAttribute('aria-selected', 'true');
      expect(legends[1]).toHaveAttribute('aria-selected', 'false');
      expect(legends[2]).toHaveAttribute('aria-selected', 'false');
      fireEvent.click(legends[0]);
      expect(legends[0]).toHaveAttribute('aria-selected', 'false');
      expect(legends[1]).toHaveAttribute('aria-selected', 'false');
      expect(legends[2]).toHaveAttribute('aria-selected', 'false');
    },
  );

  testWithoutWait(
    'Should select multiple legends when mouse click on different legends when canSelectMultipleLegends is true',
    GaugeChart,
    { segments: segments, chartValue: 30, legendProps: { canSelectMultipleLegends: true } },
    container => {
      const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      expect(legends).toHaveLength(3);
      fireEvent.click(legends[0]);
      expect(legends[0]).toHaveAttribute('aria-selected', 'true');
      expect(legends[1]).toHaveAttribute('aria-selected', 'false');
      expect(legends[2]).toHaveAttribute('aria-selected', 'false');
      fireEvent.click(legends[1]);
      expect(legends[0]).toHaveAttribute('aria-selected', 'true');
      expect(legends[1]).toHaveAttribute('aria-selected', 'true');
      expect(legends[2]).toHaveAttribute('aria-selected', 'false');
    },
  );

  testWithoutWait(
    'Should not select multiple legends when mouse click on different legends when canSelectMultipleLegends is false',
    GaugeChart,
    { segments: segments, chartValue: 30, legendProps: { canSelectMultipleLegends: false } },
    container => {
      const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      expect(legends).toHaveLength(3);
      fireEvent.click(legends[0]);
      expect(legends[0]).toHaveAttribute('aria-selected', 'true');
      expect(legends[1]).toHaveAttribute('aria-selected', 'false');
      expect(legends[2]).toHaveAttribute('aria-selected', 'false');
      fireEvent.click(legends[1]);
      expect(legends[0]).toHaveAttribute('aria-selected', 'false');
      expect(legends[1]).toHaveAttribute('aria-selected', 'true');
      expect(legends[2]).toHaveAttribute('aria-selected', 'false');
    },
  );
});

describe('Screen resolution', () => {
  afterEach(sharedAfterEach);
  testScreenResolutionChanges(() => {
    const { container } = render(<GaugeChart segments={segments} chartValue={30} width={300} height={300} />);
    // Assert
    expect(container).toMatchSnapshot();
  });
});

describe('Gauge bar chart re-rendering', () => {
  afterEach(sharedAfterEach);
  test('Should re-render the Gauge chart with data', async () => {
    // Arrange
    const { container, rerender } = render(<GaugeChart segments={[]} chartValue={0} />);
    // Assert
    expect(getByClass(container, /rect/i)).toHaveLength(0);
    // Act
    rerender(<GaugeChart segments={segments} chartValue={30} />);
    await waitFor(() => {
      // Assert
      const legends = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'button');
      expect(legends).toMatchSnapshot();
    });
  });
});

describe('Gauge Chart - Theme Change', () => {
  afterEach(sharedAfterEach);
  test('Should reflect theme change', () => {
    // Arrange
    const { container } = render(
      <FluentProvider theme={{ colorNeutralBackground1: '#ccc' }}>
        <GaugeChart culture={window.navigator.language} segments={segments} chartValue={30} />
      </FluentProvider>,
    );
    // Assert
    expect(container).toMatchSnapshot();
  });
});

describe('Gauge Chart - axe-core', () => {
  afterEach(sharedAfterEach);
  test('Should pass accessibility tests', async () => {
    const { container } = render(<GaugeChart segments={segments} chartValue={30} />);
    let axeResults;
    await act(async () => {
      axeResults = await axe(container);
    });
    expect(axeResults).toHaveNoViolations();
  });
});
