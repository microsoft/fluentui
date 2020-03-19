import { Button, Card, Flex } from '@fluentui/react';
import * as React from 'react';

const SimpleCard = () => (
  <Card>
    <Card.Footer fitted>
      <Flex space="between">
        <Flex.Item>
          <Button content="Action" />
        </Flex.Item>
        <Flex.Item>
          <Flex>
            <Button icon="star" iconOnly text title="Favourite" />
            <Button icon="download" iconOnly text title="Download" />
            <Button icon="more" iconOnly text title="More" />
          </Flex>
        </Flex.Item>
      </Flex>
    </Card.Footer>
  </Card>
);
export default SimpleCard;
