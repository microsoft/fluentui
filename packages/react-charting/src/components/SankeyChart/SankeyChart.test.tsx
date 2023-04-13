jest.mock('react-dom');
import * as React from 'react';
import { resetIds } from '../../Utilities';
import * as renderer from 'react-test-renderer';
import { mount, ReactWrapper } from 'enzyme';
import { ISankeyChartProps, SankeyChart } from './index';
import { SankeyChartBase, ISankeyChartState } from './SankeyChart.base';
import { IChartProps } from '../../index';
import toJson from 'enzyme-to-json';

// Wrapper of the SankeyChart to be tested.
let wrapper: ReactWrapper<ISankeyChartProps, ISankeyChartState, SankeyChartBase> | undefined;

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

const data: IChartProps = {
  chartTitle: 'Sankey Chart',
  SankeyChartData: {
    nodes: [
      {
        nodeId: 0,
        name: '192.168.42.72',
        color: '#8764B8',
        borderColor: '#4B3867',
      },
      {
        nodeId: 1,
        name: '172.152.48.13',
        color: '#8764B8',
        borderColor: '#4B3867',
      },
      {
        nodeId: 2,
        name: '124.360.55.1',
        color: '#8764B8',
        borderColor: '#4B3867',
      },
      {
        nodeId: 3,
        name: '192.564.10.2',
        color: '#8764B8',
        borderColor: '#4B3867',
      },
      {
        nodeId: 4,
        name: '124.124.50.1',
        color: '#8764B8',
        borderColor: '#4B3867',
      },
      {
        nodeId: 5,
        name: '172.630.89.4',
        color: '#8764B8',
        borderColor: '#4B3867',
      },
      {
        nodeId: 6,
        name: 'inbox',
        color: '#0E7878',
        borderColor: '#004E4E',
      },
      {
        nodeId: 7,
        name: 'Junk Folder',
        color: '#0E7878',
        borderColor: '#004E4E',
      },
      {
        nodeId: 8,
        name: 'Deleted Folder',
        color: '#0E7878',
        borderColor: '#004E4E',
      },
      {
        nodeId: 9,
        name: 'Clicked',
        color: '#4F6BED',
        borderColor: '#3B52B4',
      },
      {
        nodeId: 10,
        name: 'Opened',
        color: '#4F6BED',
        borderColor: '#3B52B4',
      },
      {
        nodeId: 11,
        name: ' No further action  required',
        color: '#4F6BED',
        borderColor: '#3B52B4',
      },
    ],
    links: [
      {
        source: 0,
        target: 6,
        value: 80,
      },
      {
        source: 1,
        target: 6,
        value: 50,
      },
      {
        source: 1,
        target: 7,
        value: 28,
      },
      {
        source: 2,
        target: 7,
        value: 14,
      },
      {
        source: 3,
        target: 7,
        value: 7,
      },
      {
        source: 3,
        target: 8,
        value: 20,
      },
      {
        source: 4,
        target: 7,
        value: 10,
      },
      {
        source: 5,
        target: 7,
        value: 10,
      },

      {
        source: 6,
        target: 9,
        value: 30,
      },
      {
        source: 6,
        target: 10,
        value: 55,
      },
      {
        source: 7,
        target: 11,
        value: 60,
      },
      {
        source: 8,
        target: 11,
        value: 2,
      },
    ],
  },
};

const dataWithoutColors: IChartProps = {
  chartTitle: 'Sankey Chart',
  SankeyChartData: {
    nodes: [
      {
        nodeId: 0,
        name: '192.168.42.72',
      },
      {
        nodeId: 1,
        name: '172.152.48.13',
      },
      {
        nodeId: 2,
        name: '124.360.55.1',
      },
      {
        nodeId: 3,
        name: '192.564.10.2',
      },
      {
        nodeId: 4,
        name: '124.124.50.1',
      },
      {
        nodeId: 5,
        name: '172.630.89.4',
      },
      {
        nodeId: 6,
        name: 'inbox',
      },
      {
        nodeId: 7,
        name: 'Junk Folder',
      },
      {
        nodeId: 8,
        name: 'Deleted Folder',
      },
      {
        nodeId: 9,
        name: 'Clicked',
      },
      {
        nodeId: 10,
        name: 'Opened',
      },
      {
        nodeId: 11,
        name: ' No further action  required',
      },
    ],
    links: [
      {
        source: 0,
        target: 6,
        value: 80,
      },
      {
        source: 1,
        target: 6,
        value: 50,
      },
      {
        source: 1,
        target: 7,
        value: 28,
      },
      {
        source: 2,
        target: 7,
        value: 14,
      },
      {
        source: 3,
        target: 7,
        value: 7,
      },
      {
        source: 3,
        target: 8,
        value: 20,
      },
      {
        source: 4,
        target: 7,
        value: 10,
      },
      {
        source: 5,
        target: 7,
        value: 10,
      },

      {
        source: 6,
        target: 9,
        value: 30,
      },
      {
        source: 6,
        target: 10,
        value: 55,
      },
      {
        source: 7,
        target: 11,
        value: 60,
      },
      {
        source: 8,
        target: 11,
        value: 2,
      },
    ],
  },
};

describe('Sankey Chart snapShot testing', () => {
  it('renders Sankey correctly', () => {
    const component = renderer.create(<SankeyChart data={data} height={500} width={800} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Sankey correctly on providing nodecolors and border colors ', () => {
    const nodeColors = ['#E3008C', '#00A2AD', '#022F22', '#00188F'];
    const borderColors = ['#002E39', '#43002C', '#3B52B4'];

    const component = renderer.create(
      <SankeyChart
        data={dataWithoutColors}
        height={500}
        width={800}
        colorsForNodes={nodeColors}
        borderColorsForNodes={borderColors}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Render calling with respective to props', () => {
  it('No prop changes', () => {
    const renderMock = jest.spyOn(SankeyChartBase.prototype, 'render');
    const props = {
      data,
      height: 500,
      width: 800,
    };
    mount(<SankeyChart {...props} />);
    expect(renderMock).toHaveBeenCalledTimes(1);
    renderMock.mockRestore();
  });

  it('prop changes', () => {
    const renderMock = jest.spyOn(SankeyChartBase.prototype, 'render');
    const props = {
      data,
      height: 700,
      width: 1100,
    };
    const component = mount(<SankeyChart {...props} />);
    component.setProps({ ...props, height: 1000 });
    expect(renderMock).toHaveBeenCalledTimes(2);
    renderMock.mockRestore();
  });
});

describe('SankeyChart - mouse events', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('Should render correctly on node mouseover', () => {
    wrapper = mount(<SankeyChart data={data} height={500} width={800} />);
    wrapper.find('rect').at(1).simulate('mouseover');
    const tree = toJson(wrapper, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });

  it('Should render correctly on link mouseover', () => {
    wrapper = mount(<SankeyChart data={data} height={500} width={800} />);
    wrapper.find('path').at(1).simulate('mouseover');
    const tree = toJson(wrapper, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });
  it('Should render callout correctly on mouseover when height of node is less than 24px', () => {
    wrapper = mount(<SankeyChart data={data} height={500} width={800} />);
    wrapper.find('rect[aria-label="node124.360.55.1with weight14"]').at(0).simulate('mouseover');
    const tree = toJson(wrapper, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });

  it('Should render tooltip correctly on mouseover when node description is large', () => {
    wrapper = mount(<SankeyChart data={data} height={500} width={800} />);
    wrapper.find('text[x=739]').at(0).simulate('mouseover');
    const tree = toJson(wrapper, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });
});

describe('SankeyChart - Min Height of Node Test', () => {
  it('renders Sankey correctly on providing height less than onepercent of total height', () => {
    const onepercentheightdata: IChartProps = {
      chartTitle: 'Sankey Chart',
      SankeyChartData: {
        nodes: [
          {
            nodeId: 0,
            name: 'node0',
            color: '#0078D4',
          },
          {
            nodeId: 1,
            name: 'node1',
            color: '#0078D4',
          },
          {
            nodeId: 2,
            name: 'node2',
            color: '#0078D4',
          },
          {
            nodeId: 3,
            name: 'node3',
            color: '#0078D4',
          },
          {
            nodeId: 4,
            name: 'node4',
            color: '#0078D4',
          },
          {
            nodeId: 5,
            name: 'node5',
            color: '#0078D4',
          },
          {
            nodeId: 6,
            name: 'node6',
            color: '#E3008C',
          },
          {
            nodeId: 7,
            name: 'node7',
            color: '#E3008C',
          },
        ],
        links: [
          {
            source: 0,
            target: 6,
            value: 5,
          },
          {
            source: 1,
            target: 6,
            value: 5,
          },
          {
            source: 2,
            target: 6,
            value: 5,
          },
          {
            source: 3,
            target: 6,
            value: 5,
          },
          {
            source: 4,
            target: 7,
            value: 900,
          },
          {
            source: 5,
            target: 7,
            value: 80,
          },
        ],
      },
    };
    const component = renderer.create(<SankeyChart data={onepercentheightdata} height={400} width={912} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
