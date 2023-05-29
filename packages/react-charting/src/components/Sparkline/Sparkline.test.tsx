jest.mock('react-dom');
import * as React from 'react';
import { Sparkline } from './index';
import { IChartProps } from '../../index';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

const sparkline1Points: IChartProps = {
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

describe('Sparkline snapShot testing', () => {
  it('renders Sparkline correctly', () => {
    const wrapper = mount(<Sparkline data={sparkline1Points} showLegend={true} />);
    const tree = toJson(wrapper, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders Sparkline correctly with no legend', () => {
    const wrapper = mount(<Sparkline data={sparkline2Points} showLegend={false} />);
    const tree = toJson(wrapper, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
    wrapper.unmount();
  });
});
