import * as React from 'react';
import { Menu, Header } from '@fluentui/react-northstar';

const MenuWithSubmenuControlledExample: React.FunctionComponent = () => {
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);

  const handleMenuOpenChange = (e, { menuOpen }) => {
    setMenuOpen(menuOpen);
  };

  return (
    <>
      <Header as="h5" content="Current state:" />
      <pre>{`${menuOpen}`}</pre>
      <Menu
        defaultActiveIndex={0}
        items={[
          {
            key: 'editorials',
            content: 'Editorials',
            menuOpen,
            onMenuOpenChange: handleMenuOpenChange,
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
};
export default MenuWithSubmenuControlledExample;
