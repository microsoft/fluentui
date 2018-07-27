import * as React from 'react';
import {
  Fabric,
  PrimaryButton,
  Customizer,
  CommandBar,
  DetailsList,
  createTheme,
  ITheme,
  loadTheme
} from 'office-ui-fabric-react';

const theme1: ITheme = createTheme({
  palette: {
    themePrimary: '#5cc20c',
    themeLighterAlt: '#f7fdf3',
    themeLighter: '#e0f5d0',
    themeLight: '#c7edaa',
    themeTertiary: '#95da5f',
    themeSecondary: '#6bc923',
    themeDarkAlt: '#52ae0a',
    themeDark: '#459309',
    themeDarker: '#336d07',
    neutralLighterAlt: '#f8f8f8',
    neutralLighter: '#f4f4f4',
    neutralLight: '#eaeaea',
    neutralQuaternaryAlt: '#dadada',
    neutralQuaternary: '#d0d0d0',
    neutralTertiaryAlt: '#c8c8c8',
    neutralTertiary: '#c2c2c2',
    neutralSecondary: '#858585',
    neutralPrimaryAlt: '#4b4b4b',
    neutralPrimary: '#333',
    neutralDark: '#272727',
    black: '#1d1d1d',
    white: '#fff',
    bodyBackground: '#fff',
    bodyText: '#333'
  }
});

const theme2 = createTheme({
  palette: {
    themePrimary: '#f005b1',
    themeLighterAlt: '#fef4fc',
    themeLighter: '#fdd5f2',
    themeLight: '#fab1e7',
    themeTertiary: '#f665cf',
    themeSecondary: '#f221ba',
    themeDarkAlt: '#d8049f',
    themeDark: '#b60487',
    themeDarker: '#860363',
    neutralLighterAlt: '#f8f8f8',
    neutralLighter: '#f4f4f4',
    neutralLight: '#eaeaea',
    neutralQuaternaryAlt: '#dadada',
    neutralQuaternary: '#d0d0d0',
    neutralTertiaryAlt: '#c8c8c8',
    neutralTertiary: '#c2c2c2',
    neutralSecondary: '#858585',
    neutralPrimaryAlt: '#4b4b4b',
    neutralPrimary: '#333',
    neutralDark: '#272727',
    black: '#1d1d1d',
    white: '#fff',
    bodyBackground: '#fff',
    bodyText: '#333'
  }
});

const items = [
  {
    key: '1',
    text: 'Command 1',
    iconProps: { iconName: 'delete' },
    onClick: () => console.log('command 1')
  },
  {
    key: '2',
    text: 'Command 2',
    iconProps: { iconName: 'add' },
    onClick: () => console.log('command 2')
  },
  {
    key: '3',
    name: 'Command 3',
    iconProps: { iconName: 'upload' },
    onClick: () => console.log('command 3')
  },
  {
    key: '4',
    text: 'Command 4',
    title: 'command 4 title',
    iconProps: { iconName: 'refresh' },
    subMenuProps: {
      items: [
        {
          key: 'a',
          text: 'Hi',
          title: 'Tooltip for a',
          subMenuProps: {
            items: [
              {
                key: 'asdf',
                text: 'I am a sublink',
                title: 'I am the title of the sublink'
              }
            ]
          }
        }
      ]
    }
  }
];

const listItems: { key: string; text: string; age: string }[] = [];

for (let i = 0; i < 30; i++) {
  listItems.push({
    key: '1',
    text: '1',
    age: '1'
  });
}

// Render out!
export class DetailsListBasicExample extends React.Component<{}, { useTheme1: boolean }> {
  constructor(props: {}) {
    super(props);

    this.state = {
      useTheme1: true
    };
  }
  public render() {
    return (
      <Fabric>
        <Customizer
          settings={{
            theme: this.state.useTheme1 ? theme1 : theme2
          }}
        >
          <div>
            <CommandBar items={items} />
            <PrimaryButton text="hi" />
            <DetailsList items={listItems} />
          </div>
        </Customizer>
        <PrimaryButton text="hi" />
      </Fabric>
    );
  }
  public componentDidMount() {
    setInterval(() => {
      const useTheme1 = !this.state.useTheme1;

      this.setState({
        useTheme1
      });

      loadTheme(useTheme1 ? theme1 : theme2);
    }, 1000);
  }
}
