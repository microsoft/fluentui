import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { render, act } from '@testing-library/react';
import { Sparkline } from './index';
import { IChartProps } from '../../index';
import { resetIds } from '@fluentui/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

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

  it('No empty chart aria label div rendered for non-empty data', () => {
    const wrapper = render(<Sparkline data={sparkline1Points} />);
    const renderedDOM = wrapper!.container.querySelectorAll('[aria-label="Graph has no data to display"]');
    expect(renderedDOM!.length).toBe(0);
  });

  it('Empty chart aria label div rendered for empty data', () => {
    const component = renderer.create(<Sparkline data={emptySparklinePoints} />);
    const tree = component.toJSON();
    if (tree && !Array.isArray(tree)) {
      expect(tree.props['aria-label']).toBe('Graph has no data to display');
    } else {
      // This should not happen, but TypeScript needs this check
      fail('Tree should be a single element, not an array or null');
    }
  });
});

describe('Sparkline Chart - axe-core', () => {
  beforeEach(sharedBeforeEach);

  test('Should pass accessibility tests', async () => {
    const { container } = render(<Sparkline data={sparkline1Points} />);
    let axeResults;
    await act(async () => {
      axeResults = await axe(container);
    });
    expect(axeResults).toHaveNoViolations();
  });
});
