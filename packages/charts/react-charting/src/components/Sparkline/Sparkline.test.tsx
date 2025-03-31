jest.mock('react-dom');
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { ISparklineProps, Sparkline } from './index';
import { IChartProps } from '../../index';
import { mount, ReactWrapper } from 'enzyme';
import { ISparklineState, SparklineBase } from './Sparkline.base';
import { resetIds } from '@fluentui/react';

// Wrapper of the SparklineChart to be tested.
let wrapper: ReactWrapper<ISparklineProps, ISparklineState, SparklineBase> | undefined;

function sharedBeforeEach() {
  resetIds();
}

export const sparkline1Points: IChartProps = {
  chartTitle: '10.21',
  lineChartData: [
    {
      legend: '19.64',
      color: '#00AA00',
      data: [
        {
          x: 1,
          y: 58.13,
        },
        {
          x: 2,
          y: 140.98,
        },
        {
          x: 3,
          y: 20,
        },
        {
          x: 4,
          y: 89.7,
        },
        {
          x: 5,
          y: 99,
        },
        {
          x: 6,
          y: 13.28,
        },
        {
          x: 7,
          y: 31.32,
        },
        {
          x: 8,
          y: 10.21,
        },
      ],
    },
  ],
};

const sparkline2Points: IChartProps = {
  chartTitle: '49.44',
  lineChartData: [
    {
      legend: '131.33',
      color: '#E60000',
      data: [
        {
          x: 1,
          y: 29.13,
        },
        {
          x: 2,
          y: 70.98,
        },
        {
          x: 3,
          y: 60,
        },
        {
          x: 4,
          y: 89.7,
        },
        {
          x: 5,
          y: 19,
        },
        {
          x: 6,
          y: 49.44,
        },
      ],
    },
  ],
};

export const emptySparklinePoints: IChartProps = {
  chartTitle: 'Empty sparkline chart',
  lineChartData: [
    {
      legend: '19.64',
      color: '#00AA00',
      data: [],
    },
  ],
};

describe('Sparkline snapShot testing', () => {
  beforeEach(sharedBeforeEach);

  it('renders Sparkline correctly', () => {
    const component = renderer.create(<Sparkline data={sparkline1Points} showLegend={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Sparkline correctly with no legend', () => {
    const component = renderer.create(<Sparkline data={sparkline2Points} showLegend={false} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Render empty chart aria label div when chart is empty', () => {
  beforeEach(sharedBeforeEach);

  it('No empty chart aria label div rendered', () => {
    wrapper = mount(<Sparkline data={sparkline1Points} />);
    const renderedDOM = wrapper.findWhere(node => node.prop('aria-label') === 'Graph has no data to display');
    expect(renderedDOM!.length).toBe(0);
  });

  it('Empty chart aria label div rendered', () => {
    wrapper = mount(<Sparkline data={emptySparklinePoints} />);
    const renderedDOM = wrapper.findWhere(node => node.prop('aria-label') === 'Graph has no data to display');
    expect(renderedDOM!.length).toBe(1);
  });
});
