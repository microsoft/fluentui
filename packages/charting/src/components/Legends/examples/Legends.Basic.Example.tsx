import * as React from 'react';
import { Legends, ILegend } from '@uifabric/charting/lib/Legends';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class LegendBasicExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const legends: ILegend[] = [
      {
        title: 'fsd 1',
        color: DefaultPalette.blue,
        action: () => {
          console.log('click from LegendsPage');
          alert('Legend1 clicked');
        },
        onMouseOutAction: () => {
          console.log('On mouse out action');
        },
        hoverAction: () => {
          console.log('hover action');
        }
      },
      {
        title: 'Legend 2',
        color: DefaultPalette.red,
        action: () => {
          alert('Legend2 clicked');
        },
        hoverAction: () => {
          console.log('hover action');
        }
      },
      {
        title: 'Legend 3',
        color: DefaultPalette.green,
        action: () => {
          alert('Legend3 clicked');
        },
        hoverAction: () => {
          console.log('hover action');
        }
      },
      {
        title: 'Legend 4',
        color: DefaultPalette.yellow,
        shape: 'triangle',
        action: () => {
          alert('Legend4 clicked');
        },
        hoverAction: () => {
          console.log('hover action');
        }
      }
    ];

    return <Legends legends={legends} />;
  }
}
