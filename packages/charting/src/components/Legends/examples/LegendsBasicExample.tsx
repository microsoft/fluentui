import * as React from 'react';
import { Legends } from '../Legends';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class LegendBasicExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const legends = [
      {
        title: 'Legend 1',
        color: DefaultPalette.blue,
        action: () => {
          console.log('click from LegendsPage');
          alert('Legend1 clicked');
        }
      },
      {
        title: 'Legend 2',
        color: DefaultPalette.red,
        action: () => {
          alert('Legend2 clicked');
        }
      },
      {
        title: 'Legend 3',
        color: DefaultPalette.green,
        action: () => {
          alert('Legend3 clicked');
        }
      },
      {
        title: 'Legend 4',
        color: DefaultPalette.yellow,
        action: () => {
          alert('Legend4 clicked');
        }
      }
    ];

    return <Legends legends={legends} />;
  }
}
