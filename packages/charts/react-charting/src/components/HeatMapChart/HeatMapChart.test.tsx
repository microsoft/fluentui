import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { resetIds, setRTL } from '../../Utilities';
import { IHeatMapChartProps, HeatMapChart } from './index';
import { HeatMapChartBase } from './HeatMapChart.base';
import { ThemeProvider } from '@fluentui/react';
import { DarkTheme } from '@fluentui/theme-samples';
import { conditionalDescribe, conditionalTest, isTimezoneSet } from '../../utilities/TestUtility.test';
const { Timezone } = require('../../../scripts/constants');
const env = require('../../../config/tests');

const stringPoints: string[] = ['p1', 'p2'];
const datePoints: Date[] = [new Date('2020-03-03'), new Date('2020-03-04')];

const HeatMapDateStringData: IHeatMapChartProps['data'] = [
  {
    value: 100,
    legend: 'Execllent (0-200)',
    data: [
      {
        x: datePoints[0],
        y: stringPoints[0],
        value: 50,
        rectText: 50,
        ratio: [50, 2391],
        descriptionMessage: 'a good day to start with in Texas with best air quality',
      },
      {
        x: datePoints[1],
        y: stringPoints[1],
        value: 25,
        rectText: 25,
        ratio: [25, 2479],
        descriptionMessage: `Due to unexpected heavy rain, all the pollutants are washed
        off and people of alaska are hoping for more of this days`,
      },
    ],
  },
];

const HeatMapStringDateData: IHeatMapChartProps['data'] = [
  {
    value: 100,
    legend: 'Execllent (0-200)',
    data: [],
  },
  {
    value: 200,
    legend: 'Nasty',
    data: [
      {
        x: stringPoints[0],
        y: datePoints[0],
        value: 50,
        rectText: 50,
        ratio: [50, 2391],
        descriptionMessage: 'a good day to start with in Texas with best air quality',
      },
      {
        x: stringPoints[1],
        y: datePoints[1],
        value: 25,
        rectText: 25,
        ratio: [25, 2479],
        descriptionMessage: `Due to unexpected heavy rain, all the pollutants are washed
      off and people of alaska are hoping for more of this days`,
      },
    ],
  },
];

function sharedBeforeEach() {
  resetIds();
  Object.defineProperty(window, 'requestAnimationFrame', {
    writable: true,
    value: (callback: FrameRequestCallback) => callback(0),
  });
}

function sharedAfterEach() {
  jest.clearAllMocks();
  jest.useRealTimers();
}

conditionalDescribe(isTimezoneSet(Timezone.UTC) && env === 'TEST')('HeatMapChart snapShot testing', () => {
  beforeEach(() => {
    resetIds();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('renders HeatMapChart correctly', async () => {
    const { container } = render(
      <HeatMapChart
        data={HeatMapDateStringData}
        domainValuesForColorScale={[0, 600]}
        rangeValuesForColorScale={['lightblue', 'darkblue']}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders corretly even when data is not present for some group', async () => {
    const { container } = render(
      <HeatMapChart
        data={HeatMapStringDateData}
        domainValuesForColorScale={[0, 600]}
        rangeValuesForColorScale={['pink', 'yellow']}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders hideLegend correctly', async () => {
    const { container } = render(
      <HeatMapChart
        data={HeatMapDateStringData}
        hideLegend={true}
        domainValuesForColorScale={[0, 600]}
        rangeValuesForColorScale={['lightblue', 'darkblue']}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders hideTooltip correctly', async () => {
    const { container } = render(
      <HeatMapChart
        data={HeatMapDateStringData}
        hideTooltip={true}
        domainValuesForColorScale={[0, 600]}
        rangeValuesForColorScale={['lightblue', 'darkblue']}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders yAxisTickFormat correctly', async () => {
    const { container } = render(
      <HeatMapChart
        data={HeatMapDateStringData}
        yAxisTickFormat={'/%d'}
        domainValuesForColorScale={[0, 600]}
        rangeValuesForColorScale={['lightblue', 'darkblue']}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render HeatMapChart correctly when the layout direction is RTL', () => {
    setRTL(true);
    const { container } = render(
      <HeatMapChart
        data={HeatMapDateStringData}
        domainValuesForColorScale={[0, 600]}
        rangeValuesForColorScale={['lightblue', 'darkblue']}
      />,
    );
    expect(container).toMatchSnapshot();
    setRTL(false);
  });

  it('should render HeatMapChart correctly in dark theme', () => {
    const { container } = render(
      <ThemeProvider theme={DarkTheme}>
        <HeatMapChart
          data={HeatMapDateStringData}
          domainValuesForColorScale={[0, 600]}
          rangeValuesForColorScale={['lightblue', 'darkblue']}
        />
      </ThemeProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});

describe('HeatMapChart - basic props', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('Should not mount legend when hideLegend true ', () => {
    const { container } = render(
      <HeatMapChart
        data={HeatMapDateStringData}
        hideLegend={true}
        domainValuesForColorScale={[0, 600]}
        rangeValuesForColorScale={['lightblue', 'darkblue']}
      />,
    );
    expect(container.querySelectorAll('[class^="legendContainer"]').length).toBe(0);
  });

  it('Should mount legend when hideLegend false ', () => {
    const { container } = render(
      <HeatMapChart
        data={HeatMapDateStringData}
        domainValuesForColorScale={[0, 600]}
        rangeValuesForColorScale={['lightblue', 'darkblue']}
      />,
    );
    expect(container.querySelectorAll('[class^="legendContainer"]').length).toBeGreaterThan(0);
  });

  it('Should mount callout when hideTooltip false ', () => {
    const { container } = render(
      <HeatMapChart
        data={HeatMapDateStringData}
        domainValuesForColorScale={[0, 600]}
        rangeValuesForColorScale={['lightblue', 'darkblue']}
      />,
    );
    expect(container.querySelectorAll('[class^="ms-Layer"]').length).toBeGreaterThanOrEqual(0);
  });

  it('Should not mount callout when hideTooltip true ', () => {
    const { container } = render(
      <HeatMapChart
        data={HeatMapDateStringData}
        domainValuesForColorScale={[0, 600]}
        rangeValuesForColorScale={['lightblue', 'darkblue']}
        hideTooltip={true}
      />,
    );
    expect(container.querySelectorAll('[class^="ms-Layer"]').length).toBe(0);
  });
});

describe('Render calling with respective to props', () => {
  beforeEach(() => {
    resetIds();
  });

  it('No prop changes', () => {
    const renderMock = jest.spyOn(HeatMapChartBase.prototype, 'render');
    const props = {
      data: HeatMapDateStringData,
      domainValuesForColorScale: [0, 600],
      rangeValuesForColorScale: ['lightblue', 'darkblue'],
      width: 600,
    };
    const { rerender } = render(<HeatMapChart {...props} />);
    rerender(<HeatMapChart {...props} />);
    expect(renderMock).toHaveBeenCalledTimes(2);
    renderMock.mockRestore();
  });

  it('prop changes', () => {
    const renderMock = jest.spyOn(HeatMapChartBase.prototype, 'render');
    const props = {
      data: HeatMapDateStringData,
      height: 300,
      domainValuesForColorScale: [0, 600],
      rangeValuesForColorScale: ['lightblue', 'darkblue'],
    };
    const { rerender } = render(<HeatMapChart {...props} />);
    rerender(<HeatMapChart {...props} width={600} />);
    expect(renderMock).toHaveBeenCalledTimes(2);
    renderMock.mockRestore();
  });
});

describe('HeatMapChart - mouse events', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  conditionalTest(isTimezoneSet(Timezone.UTC) && env === 'TEST')(
    'Should render callout correctly on mouseover',
    async () => {
      const { container } = render(
        <HeatMapChart
          data={HeatMapDateStringData}
          domainValuesForColorScale={[0, 600]}
          rangeValuesForColorScale={['lightblue', 'darkblue']}
          calloutProps={{ doNotLayer: true }}
        />,
      );
      // Find the second rect and fire mouseover
      const rects = container.querySelectorAll('rect');
      if (rects.length > 1) {
        fireEvent.mouseOver(rects[1]);
      }
      expect(container).toMatchSnapshot();
    },
  );
});

describe('Render empty chart aria label div when chart is empty', () => {
  beforeEach(() => {
    resetIds();
  });
  it('No empty chart aria label div rendered', () => {
    const { container } = render(
      <HeatMapChart
        data={HeatMapDateStringData}
        domainValuesForColorScale={[0, 600]}
        rangeValuesForColorScale={['lightblue', 'darkblue']}
      />,
    );
    expect(Array.from(container.querySelectorAll('[aria-label="Graph has no data to display"]')).length).toBe(0);
  });

  it('Empty chart aria label div rendered', () => {
    const { container } = render(
      <HeatMapChart
        data={[]}
        domainValuesForColorScale={[0, 600]}
        rangeValuesForColorScale={['lightblue', 'darkblue']}
      />,
    );
    expect(Array.from(container.querySelectorAll('[aria-label="Graph has no data to display"]')).length).toBe(1);
  });
});
