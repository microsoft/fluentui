import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { ChartProps, SankeyChart, DataVizPalette, getColorFromToken } from '@fluentui/react-charts';

const data: ChartProps = {
  chartTitle: 'Sankey Chart',
  SankeyChartData: {
    nodes: [
      {
        nodeId: 0,
        name: 'node0',
        color: getColorFromToken(DataVizPalette.color3),
        borderColor: getColorFromToken(DataVizPalette.color23),
      },
      {
        nodeId: 1,
        name: 'node1',
        color: getColorFromToken(DataVizPalette.color22),
        borderColor: getColorFromToken(DataVizPalette.color2),
      },
      {
        nodeId: 2,
        name: 'node2',
        color: getColorFromToken(DataVizPalette.color1),
        borderColor: getColorFromToken(DataVizPalette.color21),
      },
      {
        nodeId: 3,
        name: 'node3',
        color: getColorFromToken(DataVizPalette.color27),
        borderColor: getColorFromToken(DataVizPalette.color7),
      },
      {
        nodeId: 4,
        name: 'node4',
        color: getColorFromToken(DataVizPalette.color28),
        borderColor: getColorFromToken(DataVizPalette.color8),
      },
      {
        nodeId: 5,
        name: 'node5',
        color: getColorFromToken(DataVizPalette.color4),
        borderColor: getColorFromToken(DataVizPalette.color24),
      },
    ],
    links: [
      {
        source: 0,
        target: 2,
        value: 2,
      },
      {
        source: 1,
        target: 2,
        value: 2,
      },
      {
        source: 1,
        target: 3,
        value: 2,
      },
      {
        source: 0,
        target: 4,
        value: 2,
      },
      {
        source: 2,
        target: 3,
        value: 2,
      },
      {
        source: 2,
        target: 4,
        value: 2,
      },
      {
        source: 3,
        target: 4,
        value: 4,
      },
      {
        source: 3,
        target: 5,
        value: 4,
      },
    ],
  },
};

export const SankeyChartBasic: React.FunctionComponent<{}> = (): JSXElement => {
  const [width, setWidth] = React.useState(820);
  const [height, setHeight] = React.useState(412);

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
        <label htmlFor="changeWidth_Basic">Change Width:</label>
        <input
          type="range"
          value={width}
          min={400}
          max={1000}
          id="changeWidth_Basic"
          onChange={_onWidthChange}
          aria-valuetext={`ChangeWidthSlider${width}`}
        />
        <label htmlFor="changeHeight_Basic">Change Height:</label>
        <input
          type="range"
          value={height}
          min={312}
          max={400}
          id="changeHeight_Basic"
          onChange={_onHeightChange}
          aria-valuetext={`ChangeHeightslider${height}`}
        />
      </div>
      <div style={rootStyle}>
        <SankeyChart
          data={data}
          height={height}
          width={width}
          shouldResize={width + height}
          reflowProps={{ mode: 'min-width' }}
        />
      </div>
    </div>
  );
};
