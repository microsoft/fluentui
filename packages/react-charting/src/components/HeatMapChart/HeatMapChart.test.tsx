jest.mock('react-dom');
import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';

import { resetIds } from '../../Utilities';
import { IHeatMapChartProps, HeatMapChart } from './index';
import { IHeatMapChartState, HeatMapChartBase } from './HeatMapChart.base';

// Wrapper of the HeatMapChart to be tested.
let wrapper: ReactWrapper<IHeatMapChartProps, IHeatMapChartState, HeatMapChartBase> | undefined;
const originalRAF = window.requestAnimationFrame;

function sharedBeforeEach() {
  resetIds();
  Object.defineProperty(window, 'requestAnimationFrame', {
    writable: true,
    value: (callback: FrameRequestCallback) => callback(0),
  });
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
  window.requestAnimationFrame = originalRAF;
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
  beforeEach(() => {
    resetIds();
  });
  afterEach(() => {
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
  });
  it('renders HeatMapChart correctly', async () => {
    wrapper = mount(
      <HeatMapChart
        data={HeatMapData}
        domainValuesForColorScale={[0, 600]}
        rangeValuesForColorScale={['lightblue', 'darkblue']}
      />,
    );
    await new Promise(resolve => setTimeout(resolve));
    wrapper.update();
    const tree = toJson(wrapper, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });

  it('renders corretly even when data is not present for some group', async () => {
    wrapper = mount(
      <HeatMapChart
        data={HeatMapData2} // first group has no data in it
        domainValuesForColorScale={[0, 600]}
        rangeValuesForColorScale={['pink', 'yellow']}
      />,
    );
    await new Promise(resolve => setTimeout(resolve));
    wrapper.update();
    const tree = toJson(wrapper, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });

  it('renders hideLegend correctly', async () => {
    wrapper = mount(
      <HeatMapChart
        data={HeatMapData}
        hideLegend={true}
        domainValuesForColorScale={[0, 600]}
        rangeValuesForColorScale={['lightblue', 'darkblue']}
      />,
    );
    await new Promise(resolve => setTimeout(resolve));
    wrapper.update();
    const tree = toJson(wrapper, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });

  it('renders hideTooltip correctly', async () => {
    wrapper = mount(
      <HeatMapChart
        data={HeatMapData}
        hideTooltip={true}
        domainValuesForColorScale={[0, 600]}
        rangeValuesForColorScale={['lightblue', 'darkblue']}
      />,
    );
    await new Promise(resolve => setTimeout(resolve));
    wrapper.update();
    const tree = toJson(wrapper, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });

  it('renders yAxisTickFormat correctly', async () => {
    wrapper = mount(
      <HeatMapChart
        data={HeatMapData}
        yAxisTickFormat={'/%d'}
        domainValuesForColorScale={[0, 600]}
        rangeValuesForColorScale={['lightblue', 'darkblue']}
      />,
    );
    await new Promise(resolve => setTimeout(resolve));
    wrapper.update();
    const tree = toJson(wrapper, { mode: 'deep' });
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

describe('HeatMapChart - mouse events', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('Should render callout correctly on mouseover', async () => {
    wrapper = mount(
      <HeatMapChart
        data={HeatMapData}
        domainValuesForColorScale={[0, 600]}
        rangeValuesForColorScale={['lightblue', 'darkblue']}
        calloutProps={{ doNotLayer: true }}
      />,
    );
    await new Promise(resolve => setTimeout(resolve));
    wrapper.update();
    wrapper.find('rect').at(1).simulate('mouseover');
    await new Promise(resolve => setTimeout(resolve));
    wrapper.update();
    const tree = toJson(wrapper, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });
});

describe('Render empty chart aria label div when chart is empty', () => {
  it('No empty chart aria label div rendered', () => {
    wrapper = mount(
      <HeatMapChart
        data={HeatMapData}
        domainValuesForColorScale={[0, 600]}
        rangeValuesForColorScale={['lightblue', 'darkblue']}
      />,
    );
    const renderedDOM = wrapper.findWhere(node => node.prop('aria-label') === 'Graph has no data to display');
    expect(renderedDOM!.length).toBe(0);
  });

  it('Empty chart aria label div rendered', () => {
    wrapper = mount(
      <HeatMapChart
        data={[]}
        domainValuesForColorScale={[0, 600]}
        rangeValuesForColorScale={['lightblue', 'darkblue']}
      />,
    );
    const renderedDOM = wrapper.findWhere(node => node.prop('aria-label') === 'Graph has no data to display');
    expect(renderedDOM!.length).toBe(1);
  });
});
