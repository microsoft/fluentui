import { Button, Card, cardFocusableBehavior, Image, MenuButton, MoreIcon, Text } from '@fluentui/react-northstar';
import * as React from 'react';

const CardExampleContextMenu = () => {
  const menuItems = ['Call', 'Chat', 'Favourite'];

  return (
    <MenuButton
      menu={menuItems}
      contextMenu
      trigger={
        <Card accessibility={cardFocusableBehavior} aria-roledescription="user card">
          <Card.TopControls>
            <MenuButton
              trigger={<Button icon={<MoreIcon />} text iconOnly aria-label="Menu button" />}
              menu={menuItems}
              on="click"
            />
          </Card.TopControls>
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
