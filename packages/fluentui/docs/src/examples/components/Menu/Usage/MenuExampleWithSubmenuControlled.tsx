import * as React from 'react';
import { Menu, Header } from '@fluentui/react-northstar';

const MenuWithSubmenuControlledExample: React.FC = props => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleMenuOpenChange = (e, { menuOpen }) => {
    setMenuOpen(open => !open);
  };

  return (
    <>
      <Header as="h5" content="Current state:" />
      <pre>{JSON.stringify({ menuOpen }, null, 2)}</pre>
      <Menu defaultActiveIndex={0}>
        <Menu.Item
          index={0}
          menuOpen={menuOpen}
          onMenuOpenChange={handleMenuOpenChange}
          menu={
            <>
              <Menu.Item>
                <Menu.ItemContent>item 1</Menu.ItemContent>
              </Menu.Item>
              <Menu.Item>
                <Menu.ItemContent>item 2</Menu.ItemContent>
              </Menu.Item>
              <Menu.Item>
                <Menu.ItemContent>item 3</Menu.ItemContent>
              </Menu.Item>
            </>
          }
          content="Editorials"
        />
        <Menu.Item index={1}>
          <Menu.ItemContent>Upcoming Events</Menu.ItemContent>
        </Menu.Item>
      </Menu>
    </>
  );
};

export default MenuWithSubmenuControlledExample;
