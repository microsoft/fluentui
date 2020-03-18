import { Button, Flex, Image, Text, Card, Checkbox } from '@fluentui/react';
import * as React from 'react';

const CardExamplePreview = () => (
  <div style={{ width: '300px', border: '1px solid grey' }}>
    <Card noPadding>
      <Card.TopControls>
        <Checkbox aria-label="test checkbox" />
      </Card.TopControls>
      <Card.Preview id="cardMedia">
        <Image fluid src="public/images/wireframe/square-image.png" />
      </Card.Preview>
      <Card.Header>
        <Flex style={{ padding: '0 10px' }}>
          <Text content="It's a wonderful life" weight={'bold'} />
        </Flex>
      </Card.Header>
      <Card.Footer>
        <Flex space="between">
          <Flex.Item>
            <Button content="View album" text primary />
          </Flex.Item>
          <Flex.Item>
            <Flex vAlign="center">
              <Text content="2.4k likes" />
              <Button icon="like" iconOnly text title="More" />
            </Flex>
          </Flex.Item>
        </Flex>
      </Card.Footer>
    </Card>
  </div>
);
export default CardExamplePreview;
