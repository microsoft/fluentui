import * as React from 'react';
import { DataVizPalette, ILegend, Legends, getColorFromToken } from '@fluentui/react-charting';

export class LegendWrapLinesExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const legends: ILegend[] = [
      {
        title: 'Legend 1',
        color: getColorFromToken(DataVizPalette.color1),
        action: () => {
          alert('Legend1 clicked');
        },
        hoverAction: () => {
          console.log('Hover action for legend1');
        },
        onMouseOutAction: () => undefined,
      },
      {
        title: 'Legend 2',
        color: getColorFromToken(DataVizPalette.color2),
        action: () => {
          alert('Legend2 clicked');
        },
        hoverAction: () => {
          console.log('Hover action for legend2');
        },
        onMouseOutAction: () => undefined,
      },
      {
        title: 'Legend 3',
        color: getColorFromToken(DataVizPalette.color3),
        action: () => {
          alert('Legend3 clicked');
        },
        hoverAction: () => {
          console.log('Hover action for legend3');
        },
        onMouseOutAction: () => undefined,
      },
      {
        title: 'Legend 4',
        color: getColorFromToken(DataVizPalette.color4),
        action: () => {
          alert('Legend4 clicked');
        },
        hoverAction: () => {
          console.log('Hover action for legend4');
        },
        onMouseOutAction: () => undefined,
      },
      {
        title: 'Legend 5',
        color: getColorFromToken(DataVizPalette.color5),
        action: () => {
          alert('Legend5 clicked');
        },
        hoverAction: () => {
          console.log('Hover action for legend5');
        },
        onMouseOutAction: () => undefined,
      },
      {
        title: 'Legend 6',
        color: getColorFromToken(DataVizPalette.color6),
        action: () => {
          alert('Legend6 clicked');
        },
        hoverAction: () => {
          console.log('Hover action for legend6');
        },
        onMouseOutAction: () => undefined,
      },
      {
        title: 'Legend 7',
        color: getColorFromToken(DataVizPalette.color7),
        action: () => {
          alert('Legend7 clicked');
        },
        hoverAction: () => {
          console.log('Hover action for legend7');
        },
        onMouseOutAction: () => undefined,
      },
      {
        title: 'Legend 8',
        color: getColorFromToken(DataVizPalette.color8),
        action: () => {
          alert('Legend8 clicked');
        },
        hoverAction: () => {
          console.log('Hover action for legend8');
        },
        onMouseOutAction: () => undefined,
      },
      {
        title: 'Legend 9',
        color: getColorFromToken(DataVizPalette.color9),
        action: () => {
          alert('Legend9 clicked');
        },
        hoverAction: () => {
          console.log('Hover action for legend9');
        },
        onMouseOutAction: () => undefined,
      },
      {
        title: 'Legend 10',
        color: getColorFromToken(DataVizPalette.color10),
        action: () => {
          alert('Legend10 clicked');
        },
        hoverAction: () => {
          console.log('Hover action for legend10');
        },
        onMouseOutAction: () => undefined,
      },
      {
        title: 'Legend 11',
        color: getColorFromToken(DataVizPalette.color11),
        action: () => {
          alert('Legend11 clicked');
        },
        hoverAction: () => {
          console.log('Hover action for legend11');
        },
        onMouseOutAction: () => undefined,
      },
      {
        title: 'Legend 12',
        color: getColorFromToken(DataVizPalette.color12),
        action: () => {
          alert('Legend12 clicked');
        },
        hoverAction: () => {
          console.log('Hover action for legend12');
        },
        onMouseOutAction: () => undefined,
      },
      {
        title: 'Legend 13',
        color: getColorFromToken(DataVizPalette.color13),
        action: () => {
          alert('Legend13 clicked');
        },
        hoverAction: () => {
          console.log('Hover action for legend13');
        },
        onMouseOutAction: () => undefined,
      },
      {
        title: 'Legend 14',
        color: getColorFromToken(DataVizPalette.color14),
        action: () => {
          alert('Legend14 clicked');
        },
        hoverAction: () => {
          console.log('Hover action for legend14');
        },
        onMouseOutAction: () => undefined,
      },
      {
        title: 'Legend 15',
        color: getColorFromToken(DataVizPalette.color15),
        action: () => {
          alert('Legend15 clicked');
        },
        hoverAction: () => {
          console.log('Hover action for legend15');
        },
        onMouseOutAction: () => undefined,
      },
      {
        title: 'Legend 16',
        color: getColorFromToken(DataVizPalette.color16),
        action: () => {
          alert('Legend16 clicked');
        },
        hoverAction: () => {
          console.log('Hover action for legend16');
        },
        onMouseOutAction: () => undefined,
      },
      {
        title: 'Legend 17',
        color: getColorFromToken(DataVizPalette.color17),
        action: () => {
          alert('Legend17 clicked');
        },
        hoverAction: () => {
          console.log('Hover action for legend17');
        },
        onMouseOutAction: () => undefined,
      },
    ];

    return <Legends legends={legends} enabledWrapLines={true} />;
  }
}
