import { Image, Text, Card } from '@fluentui/react-northstar';
import * as React from 'react';

const CardExampleSelected = () => (
  <Card selected aria-roledescription="selected card">
    <Card.Header>
      <Text content="Selected card" weight="bold" />
    </Card.Header>
    <Card.Body>
      <Image src="https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/square-image.png" />
    </Card.Body>
  </Card>
);

export default CardExampleSelected;
