import * as React from 'react';
import { Legends, ILegend, DataVizPalette, getColorFromToken } from '@fluentui/react-charting';

export class LegendBasicExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const legends: ILegend[] = [
      {
        title: 'Legend 1',
        color: getColorFromToken(DataVizPalette.color1),
        action: () => {
          console.log('click from LegendsPage');
          alert('Legend1 clicked');
        },
        onMouseOutAction: () => {
          console.log('On mouse out action');
        },
        hoverAction: () => {
          console.log('hover action');
        },
      },
      {
        title: 'Legend 2',
        color: getColorFromToken(DataVizPalette.color2),
        action: () => {
          alert('Legend2 clicked');
        },
        hoverAction: () => {
          console.log('hover action');
        },
      },
      {
        title: 'Legend 3',
        color: getColorFromToken(DataVizPalette.color3),
        action: () => {
          alert('Legend3 clicked');
        },
        hoverAction: () => {
          console.log('hover action');
        },
        shape: 'diamond',
      },
      {
        title: 'Legend 4',
        color: getColorFromToken(DataVizPalette.color4),
        shape: 'triangle',
        action: () => {
          alert('Legend4 clicked');
        },
        hoverAction: () => {
          console.log('hover action');
        },
      },
    ];

    return <Legends legends={legends} />;
  }
}
