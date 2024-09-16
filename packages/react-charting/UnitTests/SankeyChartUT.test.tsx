import { classNamesFunction } from '@fluentui/react';
import { IProcessedStyleSet } from '@fluentui/react/lib/Styling';
import { DarkTheme } from '@fluentui/theme-samples';
import * as React from 'react';
import {
  SankeyChartBase,
  adjustPadding,
  groupNodesByColumn,
  preRenderLayout,
} from '../src/components/SankeyChart/SankeyChart.base';
import {
  IChartProps,
  ISankeyChartData,
  ISankeyChartStyleProps,
  ISankeyChartStyles,
} from '../src/components/SankeyChart/index';
import { SLink, SNode } from '../src/types/IDataPoint';
import { IMargins } from '../src/utilities/index';
import { resetIds } from '@fluentui/react';

const env = require('../config/tests');
const runTest = env === 'TEST' ? describe : describe.skip;

function sankeyChartDataStringNodeId(): ISankeyChartData {
  return {
    nodes: [
      { nodeId: 'zero', name: '192.168.42.72', color: '#757575', borderColor: '#4B3867' },
      { nodeId: 'one', name: '172.152.48.13', color: '#8764B8', borderColor: '#4B3867' },
      { nodeId: 'two', name: '124.360.55.1', color: '#757575', borderColor: '#4B3867' },
      { nodeId: 'three', name: '192.564.10.2', color: '#8764B8', borderColor: '#4B3867' },
    ],
    links: [
      { source: 0, target: 2, value: 80 },
      { source: 1, target: 3, value: 50 },
    ],
  };
}

function sankeyChartDataNumericNodeId(): ISankeyChartData {
  return {
    nodes: [
      { nodeId: 0, name: '192.168.42.72', color: '#757575', borderColor: '#4B3867' },
      { nodeId: 1, name: '172.152.48.13', color: '#8764B8', borderColor: '#4B3867' },
      { nodeId: 2, name: '124.360.55.1', color: '#757575', borderColor: '#4B3867' },
      { nodeId: 3, name: '192.564.10.2', color: '#8764B8', borderColor: '#4B3867' },
    ],
    links: [
      { source: 0, target: 2, value: 80 },
      { source: 1, target: 3, value: 50 },
    ],
  };
}

const emptySankeyChatPoints: ISankeyChartData = {
  nodes: [],
  links: [],
};

const chartPointsWithStringNodeId = (): IChartProps => ({
  chartTitle: 'Sankey Chart',
  SankeyChartData: sankeyChartDataStringNodeId(),
});

const chartPointsWithNumericNodeId = (): IChartProps => ({
  chartTitle: 'Sankey Chart',
  SankeyChartData: sankeyChartDataNumericNodeId(),
});

const chartPointsWithEmptyData = (): IChartProps => ({
  chartTitle: 'Sankey Chart',
  SankeyChartData: emptySankeyChatPoints,
});
const emptyChartPoints = (): IChartProps => ({});

const standardMargins: IMargins = { top: 36, right: 48, bottom: 32, left: 48 };

function sharedBeforeEach() {
  resetIds();
}

runTest('_populateNodeInColumns', () => {
  beforeEach(sharedBeforeEach);

  test('Should return proper colums data with string nodeId', () => {
    const preRenderData = preRenderLayout(standardMargins, 912, 468, false);
    const input: ISankeyChartData = sankeyChartDataStringNodeId();
    preRenderData.sankey(input);
    const result = groupNodesByColumn(input);
    expect(result).toBeDefined();
    expect(result[0][0].nodeId).toEqual('zero');
    expect(result[0][0].name).toEqual('192.168.42.72');
    expect(result[0][0].value).toEqual(80);
    expect(result[0][1].nodeId).toEqual('one');
    expect(result[0][1].name).toEqual('172.152.48.13');
    expect(result[0][1].value).toEqual(50);
    expect(result[1][0].nodeId).toEqual('two');
    expect(result[1][0].name).toEqual('124.360.55.1');
    expect(result[1][0].value).toEqual(80);
    expect(result[1][1].nodeId).toEqual('three');
    expect(result[1][1].name).toEqual('192.564.10.2');
    expect(result[1][1].value).toEqual(50);
  });

  test('Should return proper colums data with numeric nodeId', () => {
    const preRenderData = preRenderLayout(standardMargins, 912, 468, false);
    const input: ISankeyChartData = sankeyChartDataNumericNodeId();
    preRenderData.sankey(input);
    const result = groupNodesByColumn(input);
    expect(result).toBeDefined();
    expect(result[0][0].nodeId).toEqual(0);
    expect(result[0][0].name).toEqual('192.168.42.72');
    expect(result[0][0].value).toEqual(80);
    expect(result[0][1].nodeId).toEqual(1);
    expect(result[0][1].name).toEqual('172.152.48.13');
    expect(result[0][1].value).toEqual(50);
    expect(result[1][0].nodeId).toEqual(2);
    expect(result[1][0].name).toEqual('124.360.55.1');
    expect(result[1][0].value).toEqual(80);
    expect(result[1][1].nodeId).toEqual(3);
    expect(result[1][1].name).toEqual('192.564.10.2');
    expect(result[1][1].value).toEqual(50);
  });
});

runTest('_adjustPadding', () => {
  beforeEach(sharedBeforeEach);

  test('Should return proper padding value', () => {
    const preRenderData = preRenderLayout(standardMargins, 912, 468, false);
    const input: ISankeyChartData = sankeyChartDataNumericNodeId();
    preRenderData.sankey(input);
    const nodesInColumn = groupNodesByColumn(input);
    adjustPadding(preRenderData.sankey, 500, nodesInColumn);
    expect(preRenderData.sankey.nodePadding()).toBe(8);
  });
});

interface IPrivateMethodsOnClass {
  // We're by-passing _normalizeData so that we do not use memoized results.
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _normalizeSankeyData(
    data: ISankeyChartData,
    containerWidth: number,
    containerHeight: number,
  ): { width: number; height: number; data: ISankeyChartData };
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _createLinks(dataLinks: SLink[]): React.ReactNode[] | undefined;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _createNodes(classNames: IProcessedStyleSet<ISankeyChartStyles>, dataNodes: SNode[]): React.ReactNode[] | undefined;
}

runTest('_createLinks', () => {
  beforeEach(sharedBeforeEach);

  test('Should return proper links data with string nodeId', () => {
    const data = chartPointsWithStringNodeId();
    const instance = new SankeyChartBase({
      data,
    });
    expect(instance).toBeDefined();
    const privateInstance = instance as unknown as IPrivateMethodsOnClass;
    const normalizedData = privateInstance._normalizeSankeyData(data.SankeyChartData!, 912, 468);
    const _linkAttributes = instance._linkAttributes(
      normalizedData['links'],
      instance._strings.linkFrom,
      instance._accessibility.linkAriaLabel,
    );
    const result = instance._createLinks(normalizedData['links'], _linkAttributes);
    expect(result).toBeDefined();
    expect(result).toHaveLength(2);
    const link1 = result![0]! as React.ReactElement;
    const link2 = result![1]! as React.ReactElement;
    expect(link1.props.children).toBeDefined();
    expect(link1!.props.children[0].props.children.type).toEqual('linearGradient');
    expect(link1!.props.children[0].props.children.props.x1).toEqual('0%');
    expect(link1!.props.children[0].props.children.props.x2).toEqual('100%');
    expect(link1!.props.children[0].props.children.props.y1).toEqual('0%');
    expect(link1!.props.children[0].props.children.props.y2).toEqual('0%');
    expect(link1!.props.children[0].props.children.props.children[0].type).toEqual('stop');
    expect(link1!.props.children[0].props.children.props.children[1].type).toEqual('stop');
    expect(link1!.props.children[1].props['aria-label']).toEqual(
      'link from 192.168.42.72 to 124.360.55.1 with weight 80',
    );
    expect(link1!.props.children[1].props.d).toEqual(
      'M172,36C455.5,36,455.5,36,739,36L739,273.538C455.5,273.538,455.5,273.538,172,273.538Z',
    );
    expect(link1!.props.children[1].props.strokeWidth).toEqual('2');
    expect(link1!.props.children[1].props['data-is-focusable']).toEqual(true);
    expect(link2!.props.children[0].props.children.type).toEqual('linearGradient');
    expect(link2!.props.children[0].props.children.props.x1).toEqual('0%');
    expect(link2!.props.children[0].props.children.props.x2).toEqual('100%');
    expect(link2!.props.children[0].props.children.props.y1).toEqual('0%');
    expect(link2!.props.children[0].props.children.props.y2).toEqual('0%');
    expect(link2!.props.children[0].props.children.props.children[0].type).toEqual('stop');
    expect(link2!.props.children[0].props.children.props.children[1].type).toEqual('stop');
    expect(link2!.props.children[1].props['aria-label']).toEqual(
      'link from 172.152.48.13 to 192.564.10.2 with weight 50',
    );
    expect(link2!.props.children[1].props.d).toEqual(
      'M172,281.538C455.5,281.538,455.5,281.538,739,281.538L739,430C455.5,430,455.5,430,172,430Z',
    );
    expect(link2!.props.children[1].props.strokeWidth).toEqual('2');
    expect(link2!.props.children[1].props['data-is-focusable']).toEqual(true);
  });

  test('Should return proper links data with numeric nodeId', () => {
    const data = chartPointsWithNumericNodeId();
    const instance = new SankeyChartBase({
      data,
    });
    expect(instance).toBeDefined();
    const privateInstance = instance as unknown as IPrivateMethodsOnClass;
    const normalizedData = privateInstance._normalizeSankeyData(data.SankeyChartData!, 912, 468);
    const _linkAttributes = instance._linkAttributes(
      normalizedData['links'],
      instance._strings.linkFrom,
      instance._accessibility.linkAriaLabel,
    );
    const result = instance._createLinks(normalizedData['links'], _linkAttributes);
    expect(result).toBeDefined();
    expect(result).toHaveLength(2);
    const link1 = result![0]! as React.ReactElement;
    const link2 = result![1]! as React.ReactElement;
    expect(link1!.props.children).toBeDefined();
    expect(link1!.props.children[0].props.children.type).toEqual('linearGradient');
    expect(link1!.props.children[0].props.children.props.x1).toEqual('0%');
    expect(link1!.props.children[0].props.children.props.x2).toEqual('100%');
    expect(link1!.props.children[0].props.children.props.y1).toEqual('0%');
    expect(link1!.props.children[0].props.children.props.y2).toEqual('0%');
    expect(link1!.props.children[0].props.children.props.children[0].type).toEqual('stop');
    expect(link1!.props.children[0].props.children.props.children[1].type).toEqual('stop');
    expect(link1!.props.children[1].props['aria-label']).toEqual(
      'link from 192.168.42.72 to 124.360.55.1 with weight 80',
    );
    expect(link1!.props.children[1].props.d).toEqual(
      'M172,36C455.5,36,455.5,36,739,36L739,273.538C455.5,273.538,455.5,273.538,172,273.538Z',
    );
    expect(link1!.props.children[1].props.strokeWidth).toEqual('2');
    expect(link1!.props.children[1].props['data-is-focusable']).toEqual(true);
    expect(link2!.props.children[0].props.children.type).toEqual('linearGradient');
    expect(link2!.props.children[0].props.children.props.x1).toEqual('0%');
    expect(link2!.props.children[0].props.children.props.x2).toEqual('100%');
    expect(link2!.props.children[0].props.children.props.y1).toEqual('0%');
    expect(link2!.props.children[0].props.children.props.y2).toEqual('0%');
    expect(link2!.props.children[0].props.children.props.children[0].type).toEqual('stop');
    expect(link2!.props.children[0].props.children.props.children[1].type).toEqual('stop');
    expect(link2!.props.children[1].props['aria-label']).toEqual(
      'link from 172.152.48.13 to 192.564.10.2 with weight 50',
    );
    expect(link2!.props.children[1].props.d).toEqual(
      'M172,281.538C455.5,281.538,455.5,281.538,739,281.538L739,430C455.5,430,455.5,430,172,430Z',
    );
    expect(link2!.props.children[1].props.strokeWidth).toEqual('2');
    expect(link2!.props.children[1].props['data-is-focusable']).toEqual(true);
  });
});

const getClassNames = classNamesFunction<ISankeyChartStyleProps, ISankeyChartStyles>();

runTest('_createNodes', () => {
  const mockGetComputedTextLength = jest.fn().mockReturnValue(100);
  // Replace the original method with the mock implementation
  Object.defineProperty(
    Object.getPrototypeOf(document.createElementNS('http://www.w3.org/2000/svg', 'tspan')),
    'getComputedTextLength',
    {
      value: mockGetComputedTextLength,
    },
  );
  beforeEach(sharedBeforeEach);

  test('Should return proper nodes data with string nodeId', () => {
    const data = chartPointsWithStringNodeId();
    const instance = new SankeyChartBase({
      data,
    });
    expect(instance).toBeDefined();
    const privateInstance = instance as unknown as IPrivateMethodsOnClass;
    const normalizedData = privateInstance._normalizeSankeyData(data.SankeyChartData!, 912, 468);
    const _classNames = getClassNames(undefined, {
      theme: DarkTheme,
      width: 500,
      height: 400,
      pathColor: '#4B3867',
      className: 'UT',
    });
    const _nodeAttributes = instance._computeNodeAttributes(
      normalizedData['nodes'],
      instance._accessibility.nodeAriaLabel,
    );
    const tooltipDiv = instance._fetchTooltip(_classNames);
    const result = instance._createNodes(_classNames, normalizedData['nodes'], _nodeAttributes, tooltipDiv);
    expect(result).toBeDefined();
    expect(result).toHaveLength(4);
    const node1 = result![0]! as React.ReactElement;
    const node2 = result![1]! as React.ReactElement;
    const node3 = result![2]! as React.ReactElement;
    const node4 = result![3]! as React.ReactElement;
    expect(node1!.key).toEqual('0');
    expect(node2!.key).toEqual('1');
    expect(node3!.key).toEqual('2');
    expect(node4!.key).toEqual('3');
    expect(node1!.props.children[0].type).toEqual('rect');
    expect(node2!.props.children[0].type).toEqual('rect');
    expect(node3!.props.children[0].type).toEqual('rect');
    expect(node4!.props.children[0].type).toEqual('rect');
    expect(node1!.props.children[0].props['aria-label']).toEqual('node 192.168.42.72 with weight 80');
    expect(node2!.props.children[0].props['aria-label']).toEqual('node 172.152.48.13 with weight 50');
    expect(node3!.props.children[0].props['aria-label']).toEqual('node 124.360.55.1 with weight 80');
    expect(node4!.props.children[0].props['aria-label']).toEqual('node 192.564.10.2 with weight 50');
    expect(node1!.props.children[1].props.children[0].props.className).toEqual('nodeName');
    expect(node1!.props.children[1].props.children[0].props.children.props.children).toEqual('192.168.42.72');
    expect(node2!.props.children[1].props.children[0].props.className).toEqual('nodeName');
    expect(node2!.props.children[1].props.children[0].props.children.props.children).toEqual('172.152.48.13');
    expect(node3!.props.children[1].props.children[0].props.className).toEqual('nodeName');
    expect(node3!.props.children[1].props.children[0].props.children.props.children).toEqual('124.360.55.1');
    expect(node4!.props.children[1].props.children[0].props.className).toEqual('nodeName');
    expect(node4!.props.children[1].props.children[0].props.children.props.children).toEqual('192.564.10.2');
  });

  test('Should return proper nodes data with numeric nodeId', () => {
    const data = chartPointsWithNumericNodeId();
    const instance = new SankeyChartBase({
      data,
    });
    expect(instance).toBeDefined();
    const privateInstance = instance as unknown as IPrivateMethodsOnClass;
    const normalizedData = privateInstance._normalizeSankeyData(data.SankeyChartData!, 912, 468);
    const _classNames = getClassNames(undefined, {
      theme: DarkTheme,
      width: 500,
      height: 400,
      pathColor: '#4B3867',
      className: 'UT',
    });
    const _nodeAttributes = instance._computeNodeAttributes(
      normalizedData['nodes'],
      instance._accessibility.nodeAriaLabel,
    );
    const tooltipDiv = instance._fetchTooltip(_classNames);
    const result = instance._createNodes(_classNames, normalizedData['nodes'], _nodeAttributes, tooltipDiv);
    expect(result).toBeDefined();
    expect(result).toHaveLength(4);
    const node1 = result![0]! as React.ReactElement;
    const node2 = result![1]! as React.ReactElement;
    const node3 = result![2]! as React.ReactElement;
    const node4 = result![3]! as React.ReactElement;
    expect(node1!.key).toEqual('0');
    expect(node2!.key).toEqual('1');
    expect(node3!.key).toEqual('2');
    expect(node4!.key).toEqual('3');
    expect(node1!.props.children[0].type).toEqual('rect');
    expect(node2!.props.children[0].type).toEqual('rect');
    expect(node3!.props.children[0].type).toEqual('rect');
    expect(node4!.props.children[0].type).toEqual('rect');
    expect(node1!.props.children[0].props['aria-label']).toEqual('node 192.168.42.72 with weight 80');
    expect(node2!.props.children[0].props['aria-label']).toEqual('node 172.152.48.13 with weight 50');
    expect(node3!.props.children[0].props['aria-label']).toEqual('node 124.360.55.1 with weight 80');
    expect(node4!.props.children[0].props['aria-label']).toEqual('node 192.564.10.2 with weight 50');
    expect(node1!.props.children[1].props.children[0].props.className).toEqual('nodeName');
    expect(node1!.props.children[1].props.children[0].props.children.props.children).toEqual('192.168.42.72');
    expect(node2!.props.children[1].props.children[0].props.className).toEqual('nodeName');
    expect(node2!.props.children[1].props.children[0].props.children.props.children).toEqual('172.152.48.13');
    expect(node3!.props.children[1].props.children[0].props.className).toEqual('nodeName');
    expect(node3!.props.children[1].props.children[0].props.children.props.children).toEqual('124.360.55.1');
    expect(node4!.props.children[1].props.children[0].props.className).toEqual('nodeName');
    expect(node4!.props.children[1].props.children[0].props.children.props.children).toEqual('192.564.10.2');
  });
});
