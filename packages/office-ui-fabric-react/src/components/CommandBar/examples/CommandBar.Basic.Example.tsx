import * as React from 'react';
import { assign } from 'office-ui-fabric-react/lib/Utilities';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

export class CommandBarBasicExample extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      areNamesVisible: true,
      areIconsVisible: true
    };
  }

  public render() {
    let { items, overflowItems, farItems } = this.props;
    let { areIconsVisible: iconsVisible, areNamesVisible: namesVisible } = this.state;

    let filteredItems = items.map((item: any) => assign({}, item, {
      name: namesVisible ? item.name : '',
      icon: iconsVisible ? item.icon : ''
    }));

    let filteredOverflowItems = overflowItems.map((item: any) => assign({}, item, {
      name: namesVisible ? item.name : '',
      icon: iconsVisible ? item.icon : ''
    }));

    let filteredFarItems = farItems.map((item: any) => assign({}, item, {
      name: namesVisible ? item.name : '',
      icon: iconsVisible ? item.icon : ''
    }));

    return (
      <div>
        <Toggle
          label='Show names'
          checked={ namesVisible }
          onChanged={ areNamesVisible => this.setState({ areNamesVisible }) }
          onText='Visible'
          offText='Hidden' />
        <Toggle
          label='Show icons'
          checked={ iconsVisible }
          onChanged={ areIconsVisible => this.setState({ areIconsVisible }) }
          onText='Visible'
          offText='Hidden' />
        <br />
        <CommandBar
          elipisisAriaLabel='More options'
          items={ filteredItems }
          overflowItems={ filteredOverflowItems }
          farItems={ filteredFarItems }
        />
      </div>
    );
  }
}