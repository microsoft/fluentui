import { Card, cardFocusableBehavior, Image, MenuButton, Text } from '@fluentui/react-northstar';
import * as React from 'react';

const CardExampleContextMenu = () => {
  const menuItems = ['Call', 'Chat', 'Favourite'];

  return (
    <MenuButton
      menu={menuItems}
      contextMenu
      trigger={
        <Card accessibility={cardFocusableBehavior} aria-roledescription="user card">
          <Card.Header>
            <Text content={`John Doe`} weight="bold" />
            <Text content={`Software developer`} temporary />
          </Card.Header>
          <Card.Body>
            <Image src="public/images/wireframe/square-image.png" />
          </Card.Body>
        </Card>
      }
    />
  );
};

export default CardExampleContextMenu;
