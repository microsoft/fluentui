import * as React from 'react';
import { Menu, Header } from '@fluentui/react-northstar';

class MenuWithSubmenuControlledExample extends React.Component {
  state = { menuOpen: false };

  handleMenuOpenChange = (e, { menuOpen }) => {
    this.setState({ menuOpen });
  };

  render() {
    return (
      <>
        <Header as="h5" content="Current state:" />
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
        <Menu
          defaultActiveIndex={0}
          items={[
            {
              key: 'editorials',
              content: 'Editorials',
              menuOpen: this.state.menuOpen,
              onMenuOpenChange: this.handleMenuOpenChange,
              menu: [
                { key: '1', content: 'item1' },
                { key: '2', content: 'item2' },
                { key: '3', content: 'item3' },
              ],
            },
            { key: 'events', content: 'Upcoming Events' },
          ]}
        />
      </>
    );
  }
}

export default MenuWithSubmenuControlledExample;
