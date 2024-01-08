import { render } from '@testing-library/react';
import * as React from 'react';
import { DarkTheme } from '@fluentui/theme-samples';
import { SankeyChart } from '../src/components/SankeyChart/SankeyChart';
import {
  IChartProps,
  ISankeyChartData,
  ISankeyChartStyleProps,
  ISankeyChartStyles,
} from '../src/components/SankeyChart/index';
import { SankeyChartBase } from '../src/components/SankeyChart/SankeyChart.base';
import { classNamesFunction } from '@fluentui/react';

const env = require('../config/tests');
const runTest = env === 'TEST' ? describe : describe.skip;
const sankeyChartDataStringNodeId = {
  nodes: [
    {
      nodeId: 'zero',
      name: '192.168.42.72',
      color: '#757575',
      borderColor: '#4B3867',
    },
    {
      nodeId: 'one',
      name: '172.152.48.13',
      color: '#8764B8',
      borderColor: '#4B3867',
    },
    {
      nodeId: 'two',
      name: '124.360.55.1',
      color: '#757575',
      borderColor: '#4B3867',
    },
    {
      nodeId: 'three',
      name: '192.564.10.2',
      color: '#8764B8',
      borderColor: '#4B3867',
    },
  ],
  links: [
    {
      source: 0,
      target: 2,
      value: 80,
    },
    {
      source: 1,
      target: 3,
      value: 50,
    },
  ],
};

const sankeyChartDataNumericNodeId = {
  nodes: [
    {
      nodeId: 0,
      name: '192.168.42.72',
      color: '#757575',
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
      color: '#757575',
      borderColor: '#4B3867',
    },
    {
      nodeId: 3,
      name: '192.564.10.2',
      color: '#8764B8',
      borderColor: '#4B3867',
    },
  ],
  links: [
    {
      source: 0,
      target: 2,
      value: 80,
    },
    {
      source: 1,
      target: 3,
      value: 50,
    },
  ],
};

const emptySankeyChatPoints: ISankeyChartData = {
  nodes: [],
  links: [],
};

const chartPointsWithStringNodeId: IChartProps = {
  chartTitle: 'Sankey Chart',
  SankeyChartData: sankeyChartDataStringNodeId,
};

const chartPointsWithNumericNodeId: IChartProps = {
  chartTitle: 'Sankey Chart',
  SankeyChartData: sankeyChartDataNumericNodeId,
};

const chartPointsWithEmptyData: IChartProps = {
  chartTitle: 'Sankey Chart',
  SankeyChartData: emptySankeyChatPoints,
};
const emptyChartPoints: IChartProps = {};

runTest('_populateNodeInColumns', () => {
  test('Should return proper axis data without chartDataMode defined', () => {
    render(<SankeyChart data={chartPointsWithStringNodeId} />);
    const instance = new SankeyChartBase({
      data: chartPointsWithEmptyData,
    });
    expect(instance).toBeDefined();
    instance._preRenderLayout();
    const result = instance._populateNodeInColumns(sankeyChartDataStringNodeId, instance._sankey);
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

  test('Should return proper axis data without chartDataMode defined', () => {
    const instance = new SankeyChartBase({
      data: chartPointsWithEmptyData,
    });
    expect(instance).toBeDefined();
    instance._preRenderLayout();
    const result = instance._populateNodeInColumns(sankeyChartDataNumericNodeId, instance._sankey);
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
  test('Should return proper axis data without chartDataMode defined', () => {
    const instance = new SankeyChartBase({
      data: chartPointsWithEmptyData,
    });
    expect(instance).toBeDefined();
    instance._preRenderLayout();
    const nodesInColumn = instance._populateNodeInColumns(sankeyChartDataNumericNodeId, instance._sankey);
    const result = instance._adjustPadding(instance._sankey, 500, nodesInColumn);
    expect(result).toBeDefined();
    expect(result).toEqual(8);
  });
});

runTest('_createLinks', () => {
  test('Should return proper axis data without chartDataMode defined', () => {
    const instance = new SankeyChartBase({
      data: chartPointsWithStringNodeId,
    });
    expect(instance).toBeDefined();
    instance._preRenderLayout();
    const result = instance._createLinks();
    expect(result).toBeDefined();
    expect(result).toHaveLength(2);
    const link1 = result![0];
    const link2 = result![1];
    expect(link1!['props'].children).toBeDefined();
    expect(link1!['props'].children[0].props.children.type).toEqual('linearGradient');
    expect(link1!['props'].children[0].props.children.props.x1).toEqual('0%');
    expect(link1!['props'].children[0].props.children.props.x2).toEqual('100%');
    expect(link1!['props'].children[0].props.children.props.y1).toEqual('0%');
    expect(link1!['props'].children[0].props.children.props.y2).toEqual('0%');
    expect(link1!['props'].children[0].props.children.props.children[0].type).toEqual('stop');
    expect(link1!['props'].children[0].props.children.props.children[1].type).toEqual('stop');
    expect(link1!['props'].children[1].props['aria-label']).toEqual(
      'link from192.168.42.72to124.360.55.1with weight80',
    );
    expect(link1!['props'].children[1].props['d']).toEqual(
      'M172,36C455.5,36,455.5,36,739,36L739,273.538C455.5,273.538,455.5,273.538,172,273.538Z',
    );
    expect(link1!['props'].children[1].props['strokeWidth']).toEqual('2');
    expect(link1!['props'].children[1].props['data-is-focusable']).toEqual(true);
    expect(link2!['props'].children[0].props.children.type).toEqual('linearGradient');
    expect(link2!['props'].children[0].props.children.props.x1).toEqual('0%');
    expect(link2!['props'].children[0].props.children.props.x2).toEqual('100%');
    expect(link2!['props'].children[0].props.children.props.y1).toEqual('0%');
    expect(link2!['props'].children[0].props.children.props.y2).toEqual('0%');
    expect(link2!['props'].children[0].props.children.props.children[0].type).toEqual('stop');
    expect(link2!['props'].children[0].props.children.props.children[1].type).toEqual('stop');
    expect(link2!['props'].children[1].props['aria-label']).toEqual(
      'link from172.152.48.13to192.564.10.2with weight50',
    );
    expect(link2!['props'].children[1].props['d']).toEqual(
      'M172,281.538C455.5,281.538,455.5,281.538,739,281.538L739,430C455.5,430,455.5,430,172,430Z',
    );
    expect(link2!['props'].children[1].props['strokeWidth']).toEqual('2');
    expect(link2!['props'].children[1].props['data-is-focusable']).toEqual(true);
  });

  test('Should return proper axis data without chartDataMode defined', () => {
    const instance = new SankeyChartBase({
      data: chartPointsWithStringNodeId,
    });
    expect(instance).toBeDefined();
    instance._preRenderLayout();
    const result = instance._createLinks();
    expect(result).toBeDefined();
    expect(result).toHaveLength(2);
    const link1 = result![0];
    const link2 = result![1];
    expect(link1!['props'].children).toBeDefined();
    expect(link1!['props'].children[0].props.children.type).toEqual('linearGradient');
    expect(link1!['props'].children[0].props.children.props.x1).toEqual('0%');
    expect(link1!['props'].children[0].props.children.props.x2).toEqual('100%');
    expect(link1!['props'].children[0].props.children.props.y1).toEqual('0%');
    expect(link1!['props'].children[0].props.children.props.y2).toEqual('0%');
    expect(link1!['props'].children[0].props.children.props.children[0].type).toEqual('stop');
    expect(link1!['props'].children[0].props.children.props.children[1].type).toEqual('stop');
    expect(link1!['props'].children[1].props['aria-label']).toEqual(
      'link from192.168.42.72to124.360.55.1with weight80',
    );
    expect(link1!['props'].children[1].props['d']).toEqual(
      'M172,36C455.5,36,455.5,36,739,36L739,273.538C455.5,273.538,455.5,273.538,172,273.538Z',
    );
    expect(link1!['props'].children[1].props['strokeWidth']).toEqual('2');
    expect(link1!['props'].children[1].props['data-is-focusable']).toEqual(true);
    expect(link2!['props'].children[0].props.children.type).toEqual('linearGradient');
    expect(link2!['props'].children[0].props.children.props.x1).toEqual('0%');
    expect(link2!['props'].children[0].props.children.props.x2).toEqual('100%');
    expect(link2!['props'].children[0].props.children.props.y1).toEqual('0%');
    expect(link2!['props'].children[0].props.children.props.y2).toEqual('0%');
    expect(link2!['props'].children[0].props.children.props.children[0].type).toEqual('stop');
    expect(link2!['props'].children[0].props.children.props.children[1].type).toEqual('stop');
    expect(link2!['props'].children[1].props['aria-label']).toEqual(
      'link from172.152.48.13to192.564.10.2with weight50',
    );
    expect(link2!['props'].children[1].props['d']).toEqual(
      'M172,281.538C455.5,281.538,455.5,281.538,739,281.538L739,430C455.5,430,455.5,430,172,430Z',
    );
    expect(link2!['props'].children[1].props['strokeWidth']).toEqual('2');
    expect(link2!['props'].children[1].props['data-is-focusable']).toEqual(true);
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

  test('Should return proper axis data without chartDataMode defined', () => {
    const instance = new SankeyChartBase({
      data: chartPointsWithStringNodeId,
    });
    expect(instance).toBeDefined();
    instance._preRenderLayout();
    // const mergedValue: IStyle = "test"
    // instance._classNames.toolTip = "toolTip-112";

    const styles = 'concatenatedStyles';
    instance._classNames = getClassNames(undefined, {
      theme: DarkTheme,
      width: 500,
      height: 400,
      pathColor: '#4B3867',
      className: 'UT',
    });
    const result = instance._createNodes(500);
    expect(result).toBeDefined();
    expect(result).toHaveLength(4);
    const node1 = result![0];
    const node2 = result![1];
    const node3 = result![2];
    const node4 = result![3];
    expect(node1!['key']).toEqual('0');
    expect(node2!['key']).toEqual('1');
    expect(node3!['key']).toEqual('2');
    expect(node4!['key']).toEqual('3');
    expect(node1!['props'].children[0].type).toEqual('rect');
    expect(node2!['props'].children[0].type).toEqual('rect');
    expect(node3!['props'].children[0].type).toEqual('rect');
    expect(node4!['props'].children[0].type).toEqual('rect');
    expect(node1!['props'].children[0].props['aria-label']).toEqual('node192.168.42.72with weight80');
    expect(node2!['props'].children[0].props['aria-label']).toEqual('node172.152.48.13with weight50');
    expect(node3!['props'].children[0].props['aria-label']).toEqual('node124.360.55.1with weight80');
    expect(node4!['props'].children[0].props['aria-label']).toEqual('node192.564.10.2with weight50');
    expect(node1!['props'].children[1].props.children[0].props.className).toEqual('nodeName');
    expect(node1!['props'].children[1].props.children[0].props.children.props.children).toEqual('192.168.42.72');
    expect(node2!['props'].children[1].props.children[0].props.className).toEqual('nodeName');
    expect(node2!['props'].children[1].props.children[0].props.children.props.children).toEqual('172.152.48.13');
    expect(node3!['props'].children[1].props.children[0].props.className).toEqual('nodeName');
    expect(node3!['props'].children[1].props.children[0].props.children.props.children).toEqual('124.360.55.1');
    expect(node4!['props'].children[1].props.children[0].props.className).toEqual('nodeName');
    expect(node4!['props'].children[1].props.children[0].props.children.props.children).toEqual('192.564.10.2');
  });

  test('Should return proper axis data without chartDataMode defined', () => {
    const instance = new SankeyChartBase({
      data: chartPointsWithNumericNodeId,
    });
    expect(instance).toBeDefined();
    instance._preRenderLayout();
    // const mergedValue: IStyle = "test"
    // instance._classNames.toolTip = "toolTip-112";

    const styles = 'concatenatedStyles';
    instance._classNames = getClassNames(undefined, {
      theme: DarkTheme,
      width: 500,
      height: 400,
      pathColor: '#4B3867',
      className: 'UT',
    });
    const result = instance._createNodes(500);
    expect(result).toBeDefined();
    expect(result).toHaveLength(4);
    const node1 = result![0];
    const node2 = result![1];
    const node3 = result![2];
    const node4 = result![3];
    expect(node1!['key']).toEqual('0');
    expect(node2!['key']).toEqual('1');
    expect(node3!['key']).toEqual('2');
    expect(node4!['key']).toEqual('3');
    expect(node1!['props'].children[0].type).toEqual('rect');
    expect(node2!['props'].children[0].type).toEqual('rect');
    expect(node3!['props'].children[0].type).toEqual('rect');
    expect(node4!['props'].children[0].type).toEqual('rect');
    expect(node1!['props'].children[0].props['aria-label']).toEqual('node192.168.42.72with weightundefined');
    expect(node2!['props'].children[0].props['aria-label']).toEqual('node172.152.48.13with weightundefined');
    expect(node3!['props'].children[0].props['aria-label']).toEqual('node124.360.55.1with weightundefined');
    expect(node4!['props'].children[0].props['aria-label']).toEqual('node192.564.10.2with weightundefined');
    expect(node1!['props'].children[1].props.children[0].props.className).toEqual('nodeName');
    expect(node1!['props'].children[1].props.children[0].props.children.props.children).toEqual('192.168.42.72');
    expect(node2!['props'].children[1].props.children[0].props.className).toEqual('nodeName');
    expect(node2!['props'].children[1].props.children[0].props.children.props.children).toEqual('172.152.48.13');
    expect(node3!['props'].children[1].props.children[0].props.className).toEqual('nodeName');
    expect(node3!['props'].children[1].props.children[0].props.children.props.children).toEqual('124.360.55.1');
    expect(node4!['props'].children[1].props.children[0].props.className).toEqual('nodeName');
    expect(node4!['props'].children[1].props.children[0].props.children.props.children).toEqual('192.564.10.2');
  });
});

runTest('_fillNodeColors', () => {
  test('Should return proper axis data without chartDataMode defined', () => {
    const instance = new SankeyChartBase({
      data: chartPointsWithStringNodeId,
    });
    expect(instance).toBeDefined();
    const color = instance._fillNodeColors(sankeyChartDataStringNodeId.nodes[0]);
    expect(color).toEqual('#757575');
  });
});
