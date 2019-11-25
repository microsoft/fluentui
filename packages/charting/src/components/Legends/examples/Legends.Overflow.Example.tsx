import * as React from 'react';
import { Legends } from '@uifabric/charting/lib/Legends';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class LegendOverflowExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const legends = [
      {
        title: 'Legend 1',
        color: DefaultPalette.red,
        action: () => {
          alert('Legend1 clicked');
        },
        hoverAction: () => {
          console.log('Hover action for legend1');
        }
      },
      {
        title: 'Legend 2',
        color: DefaultPalette.green,
        action: () => {
          alert('Legend2 clicked');
        },
        hoverAction: () => {
          console.log('Hover action for legend2');
        }
      },
      {
        title: 'Legend 3',
        color: DefaultPalette.yellow,
        action: () => {
          alert('Legend3 clicked');
        },
        hoverAction: () => {
          console.log('Hover action for legend3');
        }
      },
      {
        title: 'Legend 4',
        color: DefaultPalette.blue,
        action: () => {
          alert('Legend4 clicked');
        },
        hoverAction: () => {
          console.log('Hover action for legend4');
        }
      },
      {
        title: 'Legend 5',
        color: DefaultPalette.purpleLight,
        action: () => {
          alert('Legend5 clicked');
        },
        hoverAction: () => {
          console.log('Hover action for legend5');
        }
      },
      {
        title: 'Legend 6',
        color: DefaultPalette.orange,
        action: () => {
          alert('Legend6 clicked');
        },
        hoverAction: () => {
          console.log('Hover action for legend6');
        }
      },
      {
        title: 'Legend 7',
        color: DefaultPalette.magenta,
        action: () => {
          alert('Legend7 clicked');
        },
        hoverAction: () => {
          console.log('Hover action for legend7');
        }
      },
      {
        title: 'Legend 8',
        color: DefaultPalette.themeDark,
        action: () => {
          alert('Legend8 clicked');
        },
        hoverAction: () => {
          console.log('Hover action for legend8');
        }
      },
      {
        title: 'Legend 9',
        color: DefaultPalette.redDark,
        action: () => {
          alert('Legend9 clicked');
        },
        hoverAction: () => {
          console.log('Hover action for legend9');
        }
      },
      {
        title: 'Legend 10',
        color: DefaultPalette.blueMid,
        action: () => {
          alert('Legend10 clicked');
        },
        hoverAction: () => {
          console.log('Hover action for legend10');
        }
      },
      {
        title: 'Legend 11',
        color: DefaultPalette.blackTranslucent40,
        action: () => {
          alert('Legend11 clicked');
        },
        hoverAction: () => {
          console.log('Hover action for legend11');
        }
      },
      {
        title: 'Legend 12',
        color: DefaultPalette.greenDark,
        action: () => {
          alert('Legend12 clicked');
        },
        hoverAction: () => {
          console.log('Hover action for legend12');
        }
      },
      {
        title: 'Legend 13',
        color: DefaultPalette.yellowLight,
        action: () => {
          alert('Legend13 clicked');
        },
        hoverAction: () => {
          console.log('Hover action for legend13');
        }
      },
      {
        title: 'Legend 14',
        color: DefaultPalette.magentaLight,
        action: () => {
          alert('Legend14 clicked');
        },
        hoverAction: () => {
          console.log('Hover action for legend14');
        }
      },
      {
        title: 'Legend 15',
        color: DefaultPalette.purpleDark,
        action: () => {
          alert('Legend15 clicked');
        },
        hoverAction: () => {
          console.log('Hover action for legend15');
        }
      },
      {
        title: 'Legend 16',
        color: DefaultPalette.blueMid,
        action: () => {
          alert('Legend16 clicked');
        },
        hoverAction: () => {
          console.log('Hover action for legend16');
        }
      },
      {
        title: 'Legend 17',
        color: DefaultPalette.accent,
        action: () => {
          alert('Legend17 clicked');
        },
        hoverAction: () => {
          console.log('Hover action for legend17');
        }
      }
    ];

    return <Legends legends={legends} />;
  }
}
