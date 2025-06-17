import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { ITreeChartDataPoint, TreeChart } from './index';
import { resetIds } from '@fluentui/react/lib/Utilities';
import { act, render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const global: any;

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

function findNodesWithClassName(
  node: renderer.ReactTestRendererJSON | renderer.ReactTestRendererJSON[] | null,
  className: string,
): renderer.ReactTestRendererJSON[] {
  let result: renderer.ReactTestRendererJSON[] = [];
  if (!node) {
    return result;
  }
  if (Array.isArray(node)) {
    node.forEach(child => {
      result = result.concat(findNodesWithClassName(child, className));
    });
  } else {
    if (node.props && typeof node.props.className === 'string' && node.props.className.split(' ').includes(className)) {
      result.push(node);
    }
    if (node.children) {
      node.children.forEach(child => {
        if (typeof child === 'object' && child !== null) {
          result = result.concat(findNodesWithClassName(child as renderer.ReactTestRendererJSON, className));
        }
      });
    }
  }
  return result;
}

function sharedBeforeEach() {
  resetIds();
}

function sharedAfterEach() {
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
    const component = renderer.create(<TreeChart treeData={threeLayerChart} composition={0} />);
    const tree = component.toJSON();
    const svgNode = findNodesWithClassName(tree, 'svgNode');
    expect(svgNode.length).toBe(1);
  });

  it('svgLink innerHTML should not be null ', () => {
    const component = renderer.create(<TreeChart treeData={twoLayerChart} />);
    const tree = component.toJSON();
    const svgNode = findNodesWithClassName(tree, 'svgLink');
    expect(svgNode.length).toBe(1);
  });
});

describe('Render calling with respective to props', () => {
  beforeEach(sharedBeforeEach);

  it('No prop changes', () => {
    const props = {
      treeData: twoLayerChart,
      width: 1000,
      height: 700,
      margin: { top: 30, right: 20, bottom: 30, left: 50 },
    };
    const component = renderer.create(<TreeChart {...props} />);
    const htmlBefore = component!.toJSON();
    component.update(<TreeChart {...props} />);
    const htmlAfter = component!.toJSON();
    expect(htmlAfter).not.toBe(htmlBefore);
  });
  it('prop changes', () => {
    const props = {
      treeData: threeLayerChart,
      composition: 0,
      height: 700,
      margin: { top: 30, right: 20, bottom: 30, left: 50 },
    };
    const component = renderer.create(<TreeChart {...props} />);
    const htmlBefore = component!.toJSON();
    component.update(<TreeChart {...props} width={600} />);
    const htmlAfter = component!.toJSON();
    expect(htmlAfter).not.toBe(htmlBefore);
  });
});

describe('Tree Chart - axe-core', () => {
  beforeEach(sharedBeforeEach);
  const mockGetComputedTextLength = jest.fn().mockReturnValue(100);

  // Replace the original method with the mock implementation
  Object.defineProperty(
    Object.getPrototypeOf(document.createElementNS('http://www.w3.org/2000/svg', 'tspan')),
    'getComputedTextLength',
    {
      value: mockGetComputedTextLength,
    },
  );

  test('Should pass accessibility tests', async () => {
    const { container } = render(<TreeChart treeData={threeLayerChart} />);
    let axeResults;
    await act(async () => {
      axeResults = await axe(container);
    });
    expect(axeResults).toHaveNoViolations();
  });
});
