import { IChartProps, SankeyChart, DataVizPalette, getColorFromToken } from '@fluentui/react-charting';
import * as React from 'react';

export class SankeyChartReflowExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return <div>{this._reflowExample()}</div>;
  }

  private _reflowExample(): JSX.Element {
    const data: IChartProps = {
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

    return <SankeyChart data={data} />;
  }
}
