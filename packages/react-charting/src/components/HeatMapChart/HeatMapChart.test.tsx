jest.mock('react-dom');
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount, ReactWrapper } from 'enzyme';

import { resetIds } from '../../Utilities';
import { IHeatMapChartProps, HeatMapChart } from './index';
import { IHeatMapChartState, HeatMapChartBase } from './HeatMapChart.base';

// Wrapper of the HeatMapChart to be tested.
let wrapper: ReactWrapper<IHeatMapChartProps, IHeatMapChartState, HeatMapChartBase> | undefined;

function sharedBeforeEach() {
  resetIds();
}

function sharedAfterEach() {
  if (wrapper) {
    wrapper.unmount();
    wrapper = undefined;
  }

  // Do this after unmounting the wrapper to make sure if any timers cleaned up on unmount are
  // cleaned up in fake timers world
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((global.setTimeout as any).mock) {
    jest.useRealTimers();
  }
}
const yPoint: string[] = ['p1', 'p2'];

const xPoint: Date[] = [new Date('2020-03-03'), new Date('2020-03-04')];
const HeatMapData: IHeatMapChartProps['data'] = [
  {
    value: 100,
    legend: 'Execllent (0-200)',
    data: [
      {
        x: xPoint[0],
        y: yPoint[0],
        value: 50,
        rectText: 50,
        ratio: [50, 2391],
        descriptionMessage: 'a good day to start with in Texas with best air quality',
      },
      {
        x: xPoint[1],
        y: yPoint[1],
        value: 25,
        rectText: 25,
        ratio: [25, 2479],
        descriptionMessage: `Due to unexpected heavy rain, all the pollutants are washed
        off and people of alaska are hoping for more of this days`,
      },
    ],
  },
];

const HeatMapData2: IHeatMapChartProps['data'] = [
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
        x: xPoint[0],
        y: yPoint[0],
        value: 50,
        rectText: 50,
        ratio: [50, 2391],
        descriptionMessage: 'a good day to start with in Texas with best air quality',
      },
      {
        x: xPoint[1],
        y: yPoint[1],
        value: 25,
        rectText: 25,
        ratio: [25, 2479],
        descriptionMessage: `Due to unexpected heavy rain, all the pollutants are washed
      off and people of alaska are hoping for more of this days`,
      },
    ],
  },
];

describe('HeatMapChart snapShot testing', () => {
  it('renders HeatMapChart correctly', () => {
    const component = renderer.create(
      <HeatMapChart
        data={HeatMapData}
        domainValuesForColorScale={[0, 600]}
        rangeValuesForColorScale={['lightblue', 'darkblue']}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders corretly even when data is not present for some group', () => {
    const component = renderer.create(
      <HeatMapChart
        data={HeatMapData2} // first group has no data in it
        domainValuesForColorScale={[0, 600]}
        rangeValuesForColorScale={['pink', 'yellow']}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders hideLegend correctly', () => {
    const component = renderer.create(
      <HeatMapChart
        data={HeatMapData}
        hideLegend={true}
        domainValuesForColorScale={[0, 600]}
        rangeValuesForColorScale={['lightblue', 'darkblue']}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders hideTooltip correctly', () => {
    const component = renderer.create(
      <HeatMapChart
        data={HeatMapData}
        hideTooltip={true}
        domainValuesForColorScale={[0, 600]}
        rangeValuesForColorScale={['lightblue', 'darkblue']}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders yAxisTickFormat correctly', () => {
    const component = renderer.create(
      <HeatMapChart
        data={HeatMapData}
        yAxisTickFormat={'/%d'}
        domainValuesForColorScale={[0, 600]}
        rangeValuesForColorScale={['lightblue', 'darkblue']}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('HeatMapChart - basic props', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('Should not mount legend when hideLegend true ', () => {
    wrapper = mount(
      <HeatMapChart
        data={HeatMapData}
        hideLegend={true}
        domainValuesForColorScale={[0, 600]}
        rangeValuesForColorScale={['lightblue', 'darkblue']}
      />,
    );
    const hideLegendDOM = wrapper.getDOMNode().querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM!.length).toBe(0);
  });

  it('Should mount legend when hideLegend false ', () => {
    wrapper = mount(
      <HeatMapChart
        data={HeatMapData}
        domainValuesForColorScale={[0, 600]}
        rangeValuesForColorScale={['lightblue', 'darkblue']}
      />,
    );
    const hideLegendDOM = wrapper.getDOMNode().querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM).toBeDefined();
  });

  it('Should mount callout when hideTootip false ', () => {
    wrapper = mount(
      <HeatMapChart
        data={HeatMapData}
        domainValuesForColorScale={[0, 600]}
        rangeValuesForColorScale={['lightblue', 'darkblue']}
      />,
    );
    const hideLegendDOM = wrapper.getDOMNode().querySelectorAll('[class^="ms-Layer"]');
    expect(hideLegendDOM).toBeDefined();
  });

  it('Should not mount callout when hideTootip true ', () => {
    wrapper = mount(
      <HeatMapChart
        data={HeatMapData}
        domainValuesForColorScale={[0, 600]}
        rangeValuesForColorScale={['lightblue', 'darkblue']}
        hideTooltip={true}
      />,
    );
    const hideLegendDOM = wrapper.getDOMNode().querySelectorAll('[class^="ms-Layer"]');
    expect(hideLegendDOM.length).toBe(0);
  });
});

describe('Render calling with respective to props', () => {
  it('No prop changes', () => {
    const renderMock = jest.spyOn(HeatMapChartBase.prototype, 'render');
    const props = {
      data: HeatMapData,
      domainValuesForColorScale: [0, 600],
      rangeValuesForColorScale: ['lightblue', 'darkblue'],
      width: 600,
    };
    const component = mount(<HeatMapChart {...props} />);
    component.setProps({ ...props });
    expect(renderMock).toHaveBeenCalledTimes(2);
    renderMock.mockRestore();
  });

  it('prop changes', () => {
    const renderMock = jest.spyOn(HeatMapChartBase.prototype, 'render');
    const props = {
      data: HeatMapData,
      height: 300,
      domainValuesForColorScale: [0, 600],
      rangeValuesForColorScale: ['lightblue', 'darkblue'],
    };
    const component = mount(<HeatMapChart {...props} />);
    component.setProps({ ...props, width: 600 });
    expect(renderMock).toHaveBeenCalledTimes(2);
    renderMock.mockRestore();
  });
});
