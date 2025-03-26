import * as React from 'react';
import {
  IChartProps,
  ResponsiveContainer,
  SankeyChart,
  DataVizPalette,
  getColorFromToken,
} from '@fluentui/react-charting';
import { classNamesFunction, DefaultPalette, IStyle } from '@fluentui/react';

interface IExampleStyles {
  resizableArea: IStyle;
}

const getStyles = (): IExampleStyles => {
  return {
    resizableArea: {
      display: 'flex',
      flexWrap: 'nowrap',
      overflow: 'hidden',

      minWidth: '200px',
      maxWidth: '800px',
      border: `2px solid ${DefaultPalette.blue}`,
      padding: '20px 10px 10px 10px',
      position: 'relative',
      resize: 'horizontal',
      '::after': {
        content: `'Resizable Area'`,
        position: 'absolute',
        padding: '1px 4px 1px',
        top: '-2px',
        left: '-2px',
        fontFamily: 'monospace',
        fontSize: '15px',
        fontWeight: 900,
        letterSpacing: '1px',
        color: DefaultPalette.white,
        backgroundColor: DefaultPalette.blue,
      },
    },
  };
};

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

const getClassNames = classNamesFunction<{}, IExampleStyles>();

export class SankeyChartResponsiveExample extends React.Component {
  private _classNames = getClassNames(getStyles());

  public render(): JSX.Element {
    return (
      <div className={this._classNames.resizableArea}>
        <ResponsiveContainer>
          <SankeyChart data={data} />
        </ResponsiveContainer>
      </div>
    );
  }
}
