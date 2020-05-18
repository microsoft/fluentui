import { Flex, Image, Text, Card } from '@fluentui/react-northstar';
import * as React from 'react';

const CardExampleSelected = () => {
  return (
    <Card selected aria-roledescription="selected card">
      <Card.Header>
        <Text content="Selected card" weight="bold" />
      </Card.Header>
      <Card.Body>
        <Flex column gap="gap.small">
          <Image src="public/images/wireframe/square-image.png" />
        </Flex>
      </Card.Body>
    </Card>
  );
};

export default CardExampleSelected;
