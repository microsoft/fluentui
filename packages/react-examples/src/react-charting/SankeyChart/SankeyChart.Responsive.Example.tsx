import * as React from 'react';
import { IChartProps, ResponsiveContainer, SankeyChart } from '@fluentui/react-charting';
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
        color: '#00758F',
        borderColor: '#002E39',
      },
      {
        nodeId: 1,
        name: 'node1',
        color: '#77004D',
        borderColor: '#43002C',
      },
      {
        nodeId: 2,
        name: 'node2',
        color: '#4F6BED',
        borderColor: '#3B52B4',
      },
      {
        nodeId: 3,
        name: 'node3',
        color: '#937600',
        borderColor: '#6D5700',
      },
      {
        nodeId: 4,
        name: 'node4',
        color: '#286EA8',
        borderColor: '#00457E',
      },
      {
        nodeId: 5,
        name: 'node5',
        color: '#A43FB1',
        borderColor: '#7C158A',
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
