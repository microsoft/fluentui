import { Card, cardFocusableBehavior, Image, MenuButton, Text } from '@fluentui/react-northstar';
import * as React from 'react';

const CardExampleContextMenu = () => (
  <MenuButton
    menu={['Call', 'Chat', 'Favourite']}
    contextMenu
    trigger={
      <Card accessibility={cardFocusableBehavior} aria-roledescription="user card">
        <Card.Header>
          <Text content={`Cecil Folk`} weight="bold" />
          <Text content={`Software developer`} temporary />
        </Card.Header>
        <Card.Body>
          <Image src="https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/square-image.png" />
        </Card.Body>
      </Card>
    }
  />
);

export default CardExampleContextMenu;
