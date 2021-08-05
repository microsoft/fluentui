import * as React from 'react';
import { ILegend, Legends } from '@fluentui/react-charting';
import { DefaultPalette } from '@fluentui/react/lib/Styling';

export class LegendWrapLinesExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const legends: ILegend[] = [
      {
        title: 'Legend 1',
        color: DefaultPalette.red,
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
        color: DefaultPalette.green,
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
        color: DefaultPalette.yellow,
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
        color: DefaultPalette.blue,
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
        color: DefaultPalette.purpleLight,
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
        color: DefaultPalette.orange,
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
        color: DefaultPalette.magenta,
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
        color: DefaultPalette.themeDark,
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
        color: DefaultPalette.redDark,
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
        color: DefaultPalette.blueMid,
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
        color: DefaultPalette.blackTranslucent40,
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
        color: DefaultPalette.greenDark,
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
        color: DefaultPalette.yellowLight,
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
        color: DefaultPalette.magentaLight,
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
        color: DefaultPalette.purpleDark,
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
        color: DefaultPalette.blueMid,
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
        color: DefaultPalette.accent,
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
