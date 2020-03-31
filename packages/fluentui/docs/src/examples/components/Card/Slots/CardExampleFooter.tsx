import { Button, Card, Flex } from '@fluentui/react-northstar';
import * as React from 'react';
import { Star, Download, More } from '@fluentui/react-icons-northstar';

const CardExampleFooter = () => (
  <Card>
    <Card.Footer fitted>
      <Flex space="between">
        <Button content="Action" />
        <Flex>
          <Button icon={<Star />} iconOnly text title="Favourite" />
          <Button icon={<Download />} iconOnly text title="Download" />
          <Button icon={<More />} iconOnly text title="More" />
        </Flex>
      </Flex>
    </Card.Footer>
  </Card>
);

export default CardExampleFooter;
