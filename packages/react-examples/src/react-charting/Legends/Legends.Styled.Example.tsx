import * as React from 'react';
import { ILegend, Legends } from '@fluentui/react-charting';
import { DefaultPalette, FontWeights } from '@fluentui/react/lib/Styling';

export class LegendStyledExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const legends: ILegend[] = [
      {
        title: 'Legend 1',
        color: DefaultPalette.red,
      },
      {
        title: 'Legend 2',
        color: DefaultPalette.green,
      },
      {
        title: 'Legend 3',
        color: DefaultPalette.yellow,
      },
      {
        title: 'Legend 4',
        color: DefaultPalette.blue,
      },
      {
        title: 'Legend 5',
        color: DefaultPalette.purpleLight,
      },
      {
        title: 'Legend 6',
        color: DefaultPalette.orange,
      },
      {
        title: 'Legend 7',
        color: DefaultPalette.magenta,
      },
      {
        title: 'Legend 8',
        color: DefaultPalette.themeDark,
      },
      {
        title: 'Legend 9',
        color: DefaultPalette.redDark,
      },
      {
        title: 'Legend 10',
        color: DefaultPalette.blueMid,
      },
      {
        title: 'Legend 11',
        color: DefaultPalette.blackTranslucent40,
      },
      {
        title: 'Legend 12',
        color: DefaultPalette.greenDark,
      },
      {
        title: 'Legend 13',
        color: DefaultPalette.yellowLight,
      },
      {
        title: 'Legend 14',
        color: DefaultPalette.magentaLight,
      },
      {
        title: 'Legend 15',
        color: DefaultPalette.purpleDark,
      },
      {
        title: 'Legend 16',
        color: DefaultPalette.blueMid,
      },
      {
        title: 'Legend 17',
        color: DefaultPalette.accent,
      },
    ];

    return (
      <Legends
        legends={legends}
        overflowText={'Overflow Items'}
        allowFocusOnLegends={true}
        canSelectMultipleLegends={false}
        overflowProps={{
          styles: {
            item: { border: `1px dotted ${DefaultPalette.green}` },
            root: {},
            overflowButton: { backgroundColor: DefaultPalette.neutralLight },
          },
        }}
        styles={{
          text: { fontWeight: FontWeights.bold },
          legend: {},
        }}
      />
    );
  }
}
