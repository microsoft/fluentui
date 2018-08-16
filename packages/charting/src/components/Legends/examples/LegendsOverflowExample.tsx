import * as React from 'react';
import { Legends } from '../Legends';

export class LegendOverflowExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const legends = [
      {
        title: 'Legend 1',
        color: 'blue',
        action: () => {
          console.log('click from LegendsPage');
          alert('Legend1 clicked');
        }
      },
      {
        title: 'Legend 2',
        color: 'red',
        action: () => {
          alert('Legend2 clicked');
        }
      },
      {
        title: 'Legend 3',
        color: 'green',
        action: () => {
          alert('Legend3 clicked');
        }
      },
      {
        title: 'Legend 4',
        color: 'blue',
        action: () => {
          alert('Legend4 clicked');
        }
      },
      {
        title: 'Legend 5',
        color: 'red',
        action: () => {
          alert('Legend5 clicked');
        }
      },
      {
        title: 'Legend 6',
        color: 'green',
        action: () => {
          alert('Legend6 clicked');
        }
      },
      {
        title: 'Legend 7',
        color: 'blue',
        action: () => {
          alert('Legend7 clicked');
        }
      },
      {
        title: 'Legend 8',
        color: 'red',
        action: () => {
          alert('Legend8 clicked');
        }
      },
      {
        title: 'Legend 9',
        color: 'green',
        action: () => {
          alert('Legend9 clicked');
        }
      },
      {
        title: 'Legend 10',
        color: 'blue',
        action: () => {
          alert('Legend10 clicked');
        }
      },
      {
        title: 'Legend 11',
        color: 'red',
        action: () => {
          alert('Legend11 clicked');
        }
      },
      {
        title: 'Legend 12',
        color: 'green',
        action: () => {
          alert('Legend12 clicked');
        }
      },
      {
        title: 'Legend 13',
        color: 'blue',
        action: () => {
          alert('Legend13 clicked');
        }
      },
      {
        title: 'Legend 14',
        color: 'red',
        action: () => {
          alert('Legend14 clicked');
        }
      },
      {
        title: 'Legend 15',
        color: 'green',
        action: () => {
          alert('Legend15 clicked');
        }
      },
      {
        title: 'Legend 16',
        color: 'blue',
        action: () => {
          alert('Legend16 clicked');
        }
      },
      {
        title: 'Legend 17',
        color: 'red',
        action: () => {
          alert('Legend17 clicked');
        }
      }
    ];

    return <Legends legends={legends} />;
  }
}
