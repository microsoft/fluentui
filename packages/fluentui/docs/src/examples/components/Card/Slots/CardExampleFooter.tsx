import { Button, Card, Flex } from '@fluentui/react-northstar';
import * as React from 'react';

const CardExampleFooter = () => (
  <Card>
    <Card.Footer fitted>
      <Flex space="between">
        <Button content="Action" />
        <Flex>
          <Button icon="star" iconOnly text title="Favourite" />
          <Button icon="download" iconOnly text title="Download" />
          <Button icon="more" iconOnly text title="More" />
        </Flex>
      </Flex>
    </Card.Footer>
  </Card>
);

export default CardExampleFooter;
