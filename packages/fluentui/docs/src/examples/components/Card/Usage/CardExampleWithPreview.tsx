import { Button, Flex, Image, Text, Card, Checkbox } from '@fluentui/react-northstar';
import * as React from 'react';
import { LikeIcon } from '@fluentui/react-icons-northstar';

const CardExampleWithPreview = () => (
  <Card compact aria-roledescription="card with image, text and action buttons">
    <Card.TopControls>
      <Checkbox aria-label="test checkbox" />
    </Card.TopControls>
    <Card.Preview>
      <Image fluid src="https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/square-image.png" />
    </Card.Preview>
    <Card.Header fitted>
      <Flex padding="padding.medium">
        <Text content="It's a wonderful life" weight="bold" />
      </Flex>
    </Card.Header>
    <Card.Footer>
      <Flex space="between">
        <Button content="View album" text primary />
        <Flex vAlign="center">
          <Text content="2.4k likes" />
          <Button icon={<LikeIcon />} iconOnly text title="More" />
        </Flex>
      </Flex>
    </Card.Footer>
  </Card>
);

export default CardExampleWithPreview;
