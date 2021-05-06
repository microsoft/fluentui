import { Card, Flex, Image, Text } from '@fluentui/react-northstar';
import * as React from 'react';

const CardExampleBody = () => (
  <Card aria-roledescription="card with image and text">
    <Card.Body fitted>
      <Flex column gap="gap.small">
        <Image src="https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/square-image.png" />
        <Text content="Citizens of distant epochs muse about at the edge of forever hearts of the..." />
      </Flex>
    </Card.Body>
  </Card>
);

export default CardExampleBody;
