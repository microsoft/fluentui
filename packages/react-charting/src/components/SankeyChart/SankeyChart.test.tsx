jest.mock('react-dom');
import { mount, ReactWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { IChartProps } from '../../index';
import { resetIds } from '../../Utilities';
import { ISankeyChartAccessibilityProps, ISankeyChartProps, ISankeyChartStrings, SankeyChart } from './index';
import { ISankeyChartState, SankeyChartBase } from './SankeyChart.base';

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

const data: () => IChartProps = () => ({
  chartTitle: 'Sankey Chart',
  SankeyChartData: {
    nodes: [
      { nodeId: 0, name: '192.168.42.72', color: '#8764B8', borderColor: '#4B3867' },
      { nodeId: 1, name: '172.152.48.13', color: '#8764B8', borderColor: '#4B3867' },
      { nodeId: 2, name: '124.360.55.1', color: '#8764B8', borderColor: '#4B3867' },
      { nodeId: 3, name: '192.564.10.2', color: '#8764B8', borderColor: '#4B3867' },
      { nodeId: 4, name: '124.124.50.1', color: '#8764B8', borderColor: '#4B3867' },
      { nodeId: 5, name: '172.630.89.4', color: '#8764B8', borderColor: '#4B3867' },
      { nodeId: 6, name: 'inbox', color: '#0E7878', borderColor: '#004E4E' },
      { nodeId: 7, name: 'Junk Folder', color: '#0E7878', borderColor: '#004E4E' },
      { nodeId: 8, name: 'Deleted Folder', color: '#0E7878', borderColor: '#004E4E' },
      { nodeId: 9, name: 'Clicked', color: '#4F6BED', borderColor: '#3B52B4' },
      { nodeId: 10, name: 'Opened', color: '#4F6BED', borderColor: '#3B52B4' },
      { nodeId: 11, name: ' No further action  required', color: '#4F6BED', borderColor: '#3B52B4' },
    ],
    links: [
      { source: 0, target: 6, value: 80 },
      { source: 1, target: 6, value: 50 },
      { source: 1, target: 7, value: 28 },
      { source: 2, target: 7, value: 14 },
      { source: 3, target: 7, value: 7 },
      { source: 3, target: 8, value: 20 },
      { source: 4, target: 7, value: 10 },
      { source: 5, target: 7, value: 10 },

      { source: 6, target: 9, value: 30 },
      { source: 6, target: 10, value: 55 },
      { source: 7, target: 11, value: 60 },
      { source: 8, target: 11, value: 2 },
    ],
  },
});

const dataWithoutColors: () => IChartProps = () => ({
  chartTitle: 'Sankey Chart',
  SankeyChartData: {
    nodes: [
      { nodeId: 0, name: '192.168.42.72' },
      { nodeId: 1, name: '172.152.48.13' },
      { nodeId: 2, name: '124.360.55.1' },
      { nodeId: 3, name: '192.564.10.2' },
      { nodeId: 4, name: '124.124.50.1' },
      { nodeId: 5, name: '172.630.89.4' },
      { nodeId: 6, name: 'inbox' },
      { nodeId: 7, name: 'Junk Folder' },
      { nodeId: 8, name: 'Deleted Folder' },
      { nodeId: 9, name: 'Clicked' },
      { nodeId: 10, name: 'Opened' },
      { nodeId: 11, name: ' No further action  required' },
    ],
    links: [
      { source: 0, target: 6, value: 80 },
      { source: 1, target: 6, value: 50 },
      { source: 1, target: 7, value: 28 },
      { source: 2, target: 7, value: 14 },
      { source: 3, target: 7, value: 7 },
      { source: 3, target: 8, value: 20 },
      { source: 4, target: 7, value: 10 },
      { source: 5, target: 7, value: 10 },

      { source: 6, target: 9, value: 30 },
      { source: 6, target: 10, value: 55 },
      { source: 7, target: 11, value: 60 },
      { source: 8, target: 11, value: 2 },
    ],
  },
});

describe('Sankey Chart snapShot testing', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('renders Sankey correctly', () => {
    const component = renderer.create(<SankeyChart data={data()} height={500} width={800} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Sankey correctly on providing nodecolors and border colors ', () => {
    const nodeColors = ['#E3008C', '#00A2AD', '#022F22', '#00188F'];
    const borderColors = ['#002E39', '#43002C', '#3B52B4'];

    const component = renderer.create(
      <SankeyChart
        data={dataWithoutColors()}
        height={500}
        width={800}
        colorsForNodes={nodeColors}
        borderColorsForNodes={borderColors}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Sankey correctly with supplied resource strings', () => {
    // ARRANGE
    const data2 = {
      chartTitle: 'Sankey Chart',
      SankeyChartData: {
        nodes: [
          { nodeId: 0, name: 'First' },
          { nodeId: 1, name: 'Second' },
        ],
        links: [{ source: 0, target: 1, value: 10 }],
      },
    };
    const strings: ISankeyChartStrings = {
      linkFrom: 'source {0}',
    };
    const accessibilityStrings: ISankeyChartAccessibilityProps = {
      linkAriaLabel: '{2} items moved from {0} to {1}',
      nodeAriaLabel: 'element {0} with size {1}',
    };
    // ACT
    const component = renderer.create(
      <SankeyChart data={data2} height={500} width={800} strings={strings} accessibility={accessibilityStrings} />,
    );
    // ASSERT
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('number formatting', () => {
    it('renders Sankey correctly by formatting large numbers', () => {
      // ARRANGE
      const data2 = {
        chartTitle: 'Sankey Chart',
        SankeyChartData: {
          nodes: [
            { nodeId: 0, name: 'First' },
            { nodeId: 1, name: 'Second' },
            { nodeId: 2, name: 'Third' },
            { nodeId: 3, name: 'Fourth' },
            { nodeId: 4, name: 'Five' },
            { nodeId: 5, name: 'Six' },
            { nodeId: 6, name: 'Seven' },
          ],
          links: [
            { source: 0, target: 1, value: 1234567890 },
            { source: 0, target: 2, value: 100000000 },
            { source: 0, target: 5, value: 1234 },
            { source: 0, target: 6, value: 100 },
            { source: 1, target: 3, value: 1000000000 },
            { source: 1, target: 4, value: 234567890 },
            { source: 2, target: 3, value: 1000 },
            { source: 2, target: 4, value: 9999000 },
          ],
        },
      };
      const strings: ISankeyChartStrings = {
        linkFrom: 'source {0}',
      };
      const accessibilityStrings: ISankeyChartAccessibilityProps = {
        linkAriaLabel: '{2} items moved from {0} to {1}',
        nodeAriaLabel: 'element {0} with size {1}',
      };
      // ACT
      const component = renderer.create(
        <SankeyChart
          data={data2}
          height={500}
          width={800}
          strings={strings}
          accessibility={accessibilityStrings}
          formatNumberOptions={{
            maximumFractionDigits: 2,
            notation: 'compact',
            compactDisplay: 'short',
          }}
        />,
      );
      // ASSERT
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('renders Sankey correctly by styling numbers as percentages', () => {
      // ARRANGE
      const data2 = {
        chartTitle: 'Sankey Chart',
        SankeyChartData: {
          nodes: [
            { nodeId: 0, name: 'First' },
            { nodeId: 1, name: 'Second' },
            { nodeId: 2, name: 'Third' },
            { nodeId: 3, name: 'Fourth' },
            { nodeId: 4, name: 'Five' },
          ],
          links: [
            { source: 0, target: 1, value: 0.6 },
            { source: 0, target: 2, value: 0.4 },
            { source: 1, target: 3, value: 0.25 },
            { source: 1, target: 4, value: 0.35 },
            { source: 2, target: 3, value: 0.15 },
            { source: 2, target: 4, value: 0.25 },
          ],
        },
      };
      const strings: ISankeyChartStrings = {
        linkFrom: 'source {0}',
      };
      const accessibilityStrings: ISankeyChartAccessibilityProps = {
        linkAriaLabel: '{2} items moved from {0} to {1}',
        nodeAriaLabel: 'element {0} with size {1}',
      };
      // ACT
      const component = renderer.create(
        <SankeyChart
          data={data2}
          height={500}
          width={800}
          strings={strings}
          accessibility={accessibilityStrings}
          formatNumberOptions={{
            style: 'percent',
          }}
        />,
      );
      // ASSERT
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});

describe('Render calling with respective to props', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('No prop changes', () => {
    const renderMock = jest.spyOn(SankeyChartBase.prototype, 'render');
    const props: ISankeyChartProps = {
      data: data(),
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
      data: data(),
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
    wrapper = mount(<SankeyChart data={data()} height={500} width={800} />);
    wrapper.find('rect').at(1).simulate('mouseover');
    const tree = toJson(wrapper, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });

  it('Should render correctly on link mouseover', () => {
    wrapper = mount(<SankeyChart data={data()} height={500} width={800} />);
    wrapper.find('path').at(1).simulate('mouseover');
    const tree = toJson(wrapper, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });

  it('Should render callout correctly on mouseover when height of node is less than 24px', () => {
    wrapper = mount(<SankeyChart data={data()} height={500} width={800} />);
    wrapper.find('rect[aria-label="node 124.360.55.1 with weight 14"]').at(0).simulate('mouseover');
    const tree = toJson(wrapper, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });

  it('Should render tooltip correctly on mouseover when node description is large', () => {
    wrapper = mount(<SankeyChart data={data()} height={500} width={800} />);
    wrapper.find('text[x=739]').at(0).simulate('mouseover');
    const tree = toJson(wrapper, { mode: 'deep' });
    expect(tree).toMatchSnapshot();
  });

  it('Should not add elements to the diagram when moving inside a "link" element and then back out', () => {
    // ARRANGE
    wrapper = mount(<SankeyChart data={data()} height={500} width={800} />);
    let addedCount = 0;
    let removedCount = 0;
    const observer = new MutationObserver(mutations => {
      mutations.forEach((mutation: MutationRecord) => {
        addedCount += mutation.addedNodes.length;
        removedCount += mutation.removedNodes.length;
      });
    });
    observer.observe(wrapper.getDOMNode().ownerDocument.body, {
      childList: true,
      attributes: true,
      characterData: true,
      subtree: true,
    });
    const originalHtml = wrapper.html();
    // ACT
    // The following finds the second "path" within the diagram, which happens to be within the "links" collection.
    const firstElement = wrapper.find('path').at(1);
    firstElement.simulate('mouseenter');
    firstElement.simulate('mousemove');
    firstElement.simulate('mouseleave');
    // ASSERT
    const finalHtml = wrapper.html();
    expect(finalHtml).toBe(originalHtml);
    observer.disconnect();
    expect(addedCount).toBe(0);
    expect(removedCount).toBe(0);
  });

  it('Should not add elements to the diagram when moving inside a "node" element and then back out', () => {
    // ARRANGE
    wrapper = mount(<SankeyChart data={data()} height={500} width={800} />);
    let addedCount = 0;
    let removedCount = 0;
    const observer = new MutationObserver(mutations => {
      mutations.forEach((mutation: MutationRecord) => {
        addedCount += mutation.addedNodes.length;
        removedCount += mutation.removedNodes.length;
      });
    });
    observer.observe(wrapper.getDOMNode().ownerDocument.body, {
      childList: true,
      attributes: true,
      characterData: true,
      subtree: true,
    });
    const originalHtml = wrapper.html();
    // ACT
    // The following finds the second "rect" within the diagram, which happens to be within the "nodes" collection.
    const firstElement = wrapper.find('rect').at(1);
    firstElement.simulate('mouseenter');
    firstElement.simulate('mousemove');
    firstElement.simulate('mouseleave');
    // ASSERT
    const finalHtml = wrapper.html();
    expect(finalHtml).toBe(originalHtml);
    observer.disconnect();
    expect(addedCount).toBe(0);
    expect(removedCount).toBe(0);
  });
});

describe('SankeyChart - Min Height of Node Test', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('renders Sankey correctly on providing height less than onepercent of total height', () => {
    const onepercentheightdata: IChartProps = {
      chartTitle: 'Sankey Chart',
      SankeyChartData: {
        nodes: [
          { nodeId: 0, name: 'node0', color: '#0078D4' },
          { nodeId: 1, name: 'node1', color: '#0078D4' },
          { nodeId: 2, name: 'node2', color: '#0078D4' },
          { nodeId: 3, name: 'node3', color: '#0078D4' },
          { nodeId: 4, name: 'node4', color: '#0078D4' },
          { nodeId: 5, name: 'node5', color: '#0078D4' },
          { nodeId: 6, name: 'node6', color: '#E3008C' },
          { nodeId: 7, name: 'node7', color: '#E3008C' },
        ],
        links: [
          { source: 0, target: 6, value: 5 },
          { source: 1, target: 6, value: 5 },
          { source: 2, target: 6, value: 5 },
          { source: 3, target: 6, value: 5 },
          { source: 4, target: 7, value: 900 },
          { source: 5, target: 7, value: 80 },
        ],
      },
    };
    const component = renderer.create(<SankeyChart data={onepercentheightdata} height={400} width={912} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Sankey correctly on providing height less than onepercent of total height for two columns', () => {
    // ARRANGE
    // This chart has 4 nodes: 2 in each of 2 columns.
    // In each column, there is a large node and a tiny node.
    // The tiny node is valued at 1, and the large node is valued at 10000.
    // This creates a huge disparity in the height of the nodes in each column.
    // The final appearance should show a small node, and should render values for the nodes
    // which match the original values.
    const onepercentheightdata: IChartProps = {
      chartTitle: 'Sankey Chart',
      SankeyChartData: {
        nodes: [
          { nodeId: 0, name: 'Large Source' },
          { nodeId: 1, name: 'Tiny Source' },
          { nodeId: 2, name: 'Large Target' },
          { nodeId: 3, name: 'Tiny Target' },
        ],
        links: [
          { source: 0, target: 2, value: 10000 },
          { source: 1, target: 2, value: 1 },
          { source: 0, target: 3, value: 1 },
          { source: 1, target: 3, value: 1 },
        ],
      },
    };
    // ACT
    const component = renderer.create(<SankeyChart data={onepercentheightdata} height={400} width={912} />);
    const tree = component.toJSON();
    // ASSERT
    expect(tree).toMatchSnapshot();
    // TODO: Figure out how to check the rendered values of each node.
  });
});
