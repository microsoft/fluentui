jest.mock('react-dom');
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount, ReactWrapper } from 'enzyme';
import { ITreeChartDataPoint, ITreeProps, TreeChart } from './index';
import { TreeChartBase } from './TreeChart.base';
import { resetIds } from '@fluentui/react/lib/Utilities';
import { act, render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

const twoLayerChart: ITreeChartDataPoint = {
  name: 'Root Node',
  subname: 'subtext',
  fill: '#0099BC',
  children: [
    { name: 'Child 1', subname: 'Subtext val is subtext', fill: '#4F6BED' },
    { name: 'Child 2', subname: 'Subtext val is subtext', fill: '#881798' },
    { name: 'Child 3', subname: 'Subtext val is subtext', fill: '#AE8C00' },
    { name: 'Child 4', subname: 'Subtext val is subtext', fill: '#FF00FF' },
  ],
};

const threeLayerChart: ITreeChartDataPoint = {
  name: 'Root Node',
  subname: 'subtext',
  fill: '#0099BC',
  children: [
    {
      name: 'Child 1',
      subname: 'subtext',
      metric: '100%',
      fill: '#4F6BED',
      children: [
        {
          name: 'leaf1',
          subname: 'sub',
          fill: '#4F6BED',
        },
        {
          name: 'leaf2',
          fill: '#4F6BED',
        },
        {
          name: 'leaf3',
          subname: 'The subtext is as follows: sub',
          fill: '#4F6BED',
        },
        {
          name: 'leaf4',
          subname: 'sub',
          fill: '#4F6BED',
        },
      ],
    },
    {
      name: 'Child 2 is the child name',
      fill: '#881798',
      children: [
        {
          name: 'leaf5',
          subname: 'sub',
          fill: '#881798',
        },
        {
          name: 'leaf6',
          subname: 'sub',
          fill: '#881798',
        },
      ],
    },
    {
      name: 'Child 3',
      subname: 'The subtext is as follows: subtext',
      fill: '#AE8C00',
      children: [
        {
          name: 'leaf7',
          subname: 'sub',
          fill: '#AE8C00',
        },
        {
          name: 'leaf8',
          subname: 'sub',
          fill: '#AE8C00',
        },
        {
          name: 'leaf9',
          subname: 'sub',
          fill: '#AE8C00',
        },
      ],
    },
    {
      name: 'Child 4',
      subname: 'subtext',
      metric: '90%',
      fill: '#FF00FF',
      children: [
        {
          name: 'leaf10',
          subname: 'sub',
          fill: '#FF00FF',
        },
      ],
    },
  ],
};

// Wrapper of the TreeChart to be tested.
let wrapper: ReactWrapper<ITreeProps, TreeChartBase> | undefined;

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

describe('TreeChart snapshot testing', () => {
  beforeEach(sharedBeforeEach);

  it('renders treechart two layer correctly', () => {
    const component = renderer.create(<TreeChart treeData={twoLayerChart} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders treechart three layer long composition correctly', () => {
    const component = renderer.create(<TreeChart treeData={threeLayerChart} composition={1} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders treechart three layer compact composition correctly', () => {
    const component = renderer.create(<TreeChart treeData={threeLayerChart} composition={0} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders treechart three layer without composition correctly', () => {
    const component = renderer.create(<TreeChart treeData={threeLayerChart} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('TreeChart - basic props', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);
  it('svgNode innerHTML should not be null ', () => {
    wrapper = mount(<TreeChart treeData={threeLayerChart} composition={0} />);
    const svgObject = wrapper.getDOMNode().querySelector('[class="svgNode"]');
    expect(svgObject?.innerHTML).toBeDefined();
  });

  it('svgLink innerHTML should not be null ', () => {
    wrapper = mount(<TreeChart treeData={twoLayerChart} />);
    const svgObject = wrapper.getDOMNode().querySelector('[class="svgLink"]');
    expect(svgObject?.innerHTML).toBeDefined();
  });
});

describe('Render calling with respective to props', () => {
  beforeEach(sharedBeforeEach);

  it('No prop changes', () => {
    const renderMock = jest.spyOn(TreeChartBase.prototype, 'render');
    const props = {
      treeData: twoLayerChart,
      width: 1000,
      height: 700,
      margin: { top: 30, right: 20, bottom: 30, left: 50 },
    };

    const component = mount(<TreeChart {...props} />);
    component.setProps({ ...props });
    expect(renderMock).toHaveBeenCalledTimes(3);
    renderMock.mockRestore();
  });
  it('prop changes', () => {
    const renderMock = jest.spyOn(TreeChartBase.prototype, 'render');
    const props = {
      treeData: threeLayerChart,
      composition: 0,
      height: 700,
      margin: { top: 30, right: 20, bottom: 30, left: 50 },
    };

    const component = mount(<TreeChart {...props} />);
    component.setProps({ ...props, width: 800 });
    expect(renderMock).toHaveBeenCalledTimes(3);
    renderMock.mockRestore();
  });
});

describe('Tree Chart - axe-core', () => {
  beforeEach(sharedBeforeEach);

  test('Should pass accessibility tests', async () => {
    const { container } = render(<TreeChart treeData={threeLayerChart} />);
    let axeResults;
    await act(async () => {
      axeResults = await axe(container);
    });
    expect(axeResults).toHaveNoViolations();
  });
});
