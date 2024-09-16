/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThemeProvider } from '@fluentui/react';
import { DarkTheme } from '@fluentui/theme-samples';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import * as React from 'react';
import { resetIds } from '../../Utilities';
import { getByClass, getById, testWithWait, testWithoutWait } from '../../utilities/TestUtility.test';
import { SankeyChartBase } from './SankeyChart.base';
import { IChartProps, SankeyChart } from './index';

expect.extend(toHaveNoViolations);

function chartPointsWithStringNodeId(): IChartProps {
  return {
    chartTitle: 'Sankey Chart',
    SankeyChartData: {
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
    },
  };
}

const emptyChartPoints: IChartProps = {
  chartData: [],
};

function sharedBeforeEach() {
  resetIds();
}

describe('Sankey bar chart rendering', () => {
  beforeEach(sharedBeforeEach);

  testWithoutWait(
    'Should render the Sankey chart with string node data',
    SankeyChart,
    { data: chartPointsWithStringNodeId() },
    container => {
      // Assert
      expect(container).toMatchSnapshot();
    },
  );
});

describe('Sankey chart - Theme', () => {
  beforeEach(sharedBeforeEach);

  test('Should reflect theme change', () => {
    // Arrange
    const { container } = render(
      <ThemeProvider theme={DarkTheme}>
        <SankeyChart data={chartPointsWithStringNodeId()} />
      </ThemeProvider>,
    );
    // Assert
    expect(container).toMatchSnapshot();
  });
});

describe('Sankey chart - Subcomponent Node', () => {
  beforeEach(sharedBeforeEach);

  // Replace the original method with the mock implementation
  const mockGetComputedTextLength = jest.fn().mockReturnValue(100);
  Object.defineProperty(
    Object.getPrototypeOf(document.createElementNS('http://www.w3.org/2000/svg', 'tspan')),
    'getComputedTextLength',
    {
      value: mockGetComputedTextLength,
    },
  );
  testWithWait(
    'Should update path color same as node color when we clck on node',
    SankeyChart,
    { data: chartPointsWithStringNodeId() },
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
  beforeEach(sharedBeforeEach);

  testWithoutWait(
    'Should render sankey chart with node labels',
    SankeyChart,
    { data: chartPointsWithStringNodeId() },
    async container => {
      const nodes = getByClass(container, /nodeName/i);
      expect(nodes).toHaveLength(4);
      expect(screen.queryByText('192.168.42.72')).not.toBeNull();
    },
  );
});

describe('Sankey chart - Mouse events', () => {
  beforeEach(sharedBeforeEach);

  testWithoutWait(
    'Should reset path on mouse leave from path',
    SankeyChart,
    { data: chartPointsWithStringNodeId() },
    async container => {
      const handleMouseOver = jest.spyOn(SankeyChartBase.prototype as any, '_onStreamLeave');
      const paths = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'path');
      fireEvent.mouseOver(paths[0]);
      fireEvent.mouseOut(paths[0]);
      expect(handleMouseOver).toHaveBeenCalled();
    },
  );

  testWithoutWait(
    'Should reset node on mouse leave from node',
    SankeyChart,
    { data: chartPointsWithStringNodeId() },
    async _container => {
      const handleMouseOver = jest.spyOn(SankeyChartBase.prototype as any, '_onLeave');
      const nodes = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      fireEvent.mouseOver(nodes[0]);
      fireEvent.mouseOut(nodes[0]);
      expect(handleMouseOver).toHaveBeenCalled();
    },
  );
});

describe('Sankey chart rendering', () => {
  beforeEach(sharedBeforeEach);
  test('Should re-render the Sankey chart with data', async () => {
    // Arrange
    const { container, rerender } = render(<SankeyChart data={emptyChartPoints} />);
    // Assert
    expect(container).toMatchSnapshot();
    expect(getById(container, /_SankeyChart_empty/i)).toHaveLength(1);
    // Act
    rerender(<SankeyChart data={chartPointsWithStringNodeId()} />);
    await waitFor(() => {
      // Assert
      expect(container).toMatchSnapshot();
      expect(getById(container, /_SankeyChart_empty/i)).toHaveLength(0);
    });
  });
});

describe('Sankey Chart - axe-core', () => {
  beforeEach(sharedBeforeEach);

  test('Should pass accessibility tests', async () => {
    const { container } = render(<SankeyChart data={chartPointsWithStringNodeId()} />);
    let axeResults;
    await act(async () => {
      axeResults = await axe(container);
    });
    expect(axeResults).toHaveNoViolations();
  });
});
