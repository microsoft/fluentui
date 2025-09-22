import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { ChartProps, SankeyChart, DataVizPalette, getColorFromToken } from '@fluentui/react-charts';

const data: ChartProps = {
  chartTitle: 'Sankey Chart',
  SankeyChartData: {
    nodes: [
      {
        nodeId: 0,
        name: '192.168.42.72',
        color: getColorFromToken(DataVizPalette.color4),
        borderColor: getColorFromToken(DataVizPalette.color24),
      },
      {
        nodeId: 1,
        name: '172.152.48.13',
        color: getColorFromToken(DataVizPalette.color4),
        borderColor: getColorFromToken(DataVizPalette.color24),
      },
      {
        nodeId: 2,
        name: '124.360.55.1',
        color: getColorFromToken(DataVizPalette.color4),
        borderColor: getColorFromToken(DataVizPalette.color24),
      },
      {
        nodeId: 3,
        name: '192.564.10.2',
        color: getColorFromToken(DataVizPalette.color4),
        borderColor: getColorFromToken(DataVizPalette.color24),
      },
      {
        nodeId: 4,
        name: '124.124.50.1',
        color: getColorFromToken(DataVizPalette.color4),
        borderColor: getColorFromToken(DataVizPalette.color24),
      },
      {
        nodeId: 5,
        name: '172.630.89.4',
        color: getColorFromToken(DataVizPalette.color4),
        borderColor: getColorFromToken(DataVizPalette.color24),
      },
      {
        nodeId: 6,
        name: 'inbox',
        color: getColorFromToken(DataVizPalette.color3),
        borderColor: getColorFromToken(DataVizPalette.color23),
      },
      {
        nodeId: 7,
        name: 'Junk Folder',
        color: getColorFromToken(DataVizPalette.color3),
        borderColor: getColorFromToken(DataVizPalette.color23),
      },
      {
        nodeId: 8,
        name: 'Deleted Folder',
        color: getColorFromToken(DataVizPalette.color3),
        borderColor: getColorFromToken(DataVizPalette.color23),
      },
      {
        nodeId: 9,
        name: 'Clicked',
        color: getColorFromToken(DataVizPalette.color1),
        borderColor: getColorFromToken(DataVizPalette.color21),
      },
      {
        nodeId: 10,
        name: 'Opened',
        color: getColorFromToken(DataVizPalette.color1),
        borderColor: getColorFromToken(DataVizPalette.color21),
      },
      {
        nodeId: 11,
        name: ' No further action  required',
        color: getColorFromToken(DataVizPalette.color1),
        borderColor: getColorFromToken(DataVizPalette.color21),
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

export const SankeyChartInbox: React.FunctionComponent<{}> = (): JSXElement => {
  const [width, setWidth] = React.useState(820);
  const [height, setHeight] = React.useState(400);

  const _onWidthChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(parseInt(e.target.value, 10));
  }, []);
  const _onHeightChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(parseInt(e.target.value, 10));
  }, []);

  const rootStyle = { width: `${width}px`, height: `${height}px` };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <label>change Width:</label>
        <input type="range" id="changeWidth_Inbox" value={width} min={400} max={1600} onChange={_onWidthChange} />
        <label>change Height:</label>
        <input type="range" id="changeHeight_Inbox" value={height} min={312} max={400} onChange={_onHeightChange} />
      </div>
      <div style={rootStyle}>
        <SankeyChart
          data={data}
          height={height}
          width={width}
          shouldResize={width + height}
          strings={{
            linkFrom: 'from category {0}',
          }}
          accessibility={{
            emptyAriaLabel: 'Graph has no data to display',
            nodeAriaLabel: 'Category {0} with email count {1}',
            linkAriaLabel: '{2} items moved from category {0} to {1}',
          }}
          reflowProps={{ mode: 'min-width' }}
        />
      </div>
    </div>
  );
};
