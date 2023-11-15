/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { queryAllByAttribute, render, waitFor, screen, fireEvent } from '@testing-library/react';
import { data } from './SankeyChart.test';
import { IChartProps, SankeyChart } from './index';
import { resetIds } from '../../Utilities';
// import { SankeyChartBase } from './SankeyChart.base';
import { getByClass, testWithWait, testWithoutWait } from '../../utilities/TestUtility.test';
import { DarkTheme } from '@fluentui/theme-samples';
import { ThemeProvider } from '@fluentui/react';

const chartPointsWithStringNodeId: IChartProps = {
  chartTitle: 'Sankey Chart',
  SankeyChartData: {
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
  },
};

const emptyChartPoints: IChartProps = {
  chartData: [],
};

function sharedBeforeEach() {
  resetIds();
}

describe('Sankey bar chart rendering', () => {
  testWithoutWait(
    'Should render the Sankey chart with string node data',
    SankeyChart,
    { data: chartPointsWithStringNodeId },
    container => {
      // Assert
      expect(container).toMatchSnapshot();
    },
  );
});

describe('Sankey chart - Subcomponent Node', () => {
  testWithWait(
    'Should update path color same as node color when we clck on node',
    SankeyChart,
    { data: chartPointsWithStringNodeId },
    async container => {
      const nodes = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      fireEvent.click(nodes[0]);
      const pathsAfterMouseOver = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'path');
      // Assert
      expect(pathsAfterMouseOver).toBeDefined();
      expect(pathsAfterMouseOver[0].getAttribute('stroke')).toEqual('#757575');
      expect(nodes[0].getAttribute('fill')).toEqual('#757575');
      expect(nodes[2].getAttribute('fill')).toEqual('#757575');
    },
  );
});

describe('Sankey chart - Subcomponent Label', () => {
  testWithoutWait(
    'Should render sankey chart with node labels',
    SankeyChart,
    { data: chartPointsWithStringNodeId },
    async container => {
      const nodes = getByClass(container, /nodeName/i);
      expect(nodes).toHaveLength(4);
      expect(screen.queryByText('192.168.42.72')).not.toBeNull();
    },
  );
});

describe('Sankey chart - Theme', () => {
  test('Should reflect theme change', () => {
    // Arrange
    const { container } = render(
      <ThemeProvider theme={DarkTheme}>
        <SankeyChart data={chartPointsWithStringNodeId} />
      </ThemeProvider>,
    );
    // Assert
    expect(container).toMatchSnapshot();
  });
});

describe('Sankey chart rendering', () => {
  beforeEach(sharedBeforeEach);
  test('Should re-render the Sankey chart with data', async () => {
    // Replace the original method with the mock implementation
    const mockGetComputedTextLength = jest.fn().mockReturnValue(100);
    Object.defineProperty(
      Object.getPrototypeOf(document.createElementNS('http://www.w3.org/2000/svg', 'tspan')),
      'getComputedTextLength',
      {
        value: mockGetComputedTextLength,
      },
    );

    // jest.spyOn(SankeyChartBase.prototype as any, '_truncateText').mockImplementation(() => 'test');
    // jest.spyOn(SankeyChartBase.prototype as any, '_createNodes').mockImplementation(() => []);
    // Arrange
    const { container, rerender } = render(<SankeyChart data={emptyChartPoints} />);
    const getById = queryAllByAttribute.bind(null, 'id');
    // Assert
    expect(container).toMatchSnapshot();
    expect(getById(container, /_SankeyChart_empty/i)).toHaveLength(1);
    // Act
    rerender(<SankeyChart data={data} />);
    await waitFor(() => {
      // Assert
      expect(container).toMatchSnapshot();
      expect(getById(container, /_SankeyChart_empty/i)).toHaveLength(0);
    });
  });
});
