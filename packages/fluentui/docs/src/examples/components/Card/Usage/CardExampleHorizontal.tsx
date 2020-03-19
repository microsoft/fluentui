import { Button, Flex, Image, Text, Card } from '@fluentui/react';
import * as React from 'react';

const CardExampleHorizontal = () => (
  <div style={{ width: '300px', border: '1px solid grey' }}>
    <Card compact horizontal>
      <Card.Preview horizontal>
        <Image style={{ height: '100px', width: '100px' }} src="public/images/wireframe/square-image.png" />
      </Card.Preview>
      <Card.Column>
        <Card.Header>
          <Text content="It's a wonderful life" weight="bold" />
        </Card.Header>
        <Card.Body>
          <Text content="Citizens of distant epochs muse about..." />
        </Card.Body>
        <Card.Footer>
          <Flex space="between" vAlign="center">
            <Flex.Item>
              <Text content="2.4k likes" />
            </Flex.Item>
            <Flex.Item>
              <Flex>
                <Button icon="download" iconOnly text title="Download" />
                <Button icon="more" iconOnly text title="More" />
              </Flex>
            </Flex.Item>
          </Flex>
        </Card.Footer>
      </Card.Column>
    </Card>
  </div>
);
export default CardExampleHorizontal;
