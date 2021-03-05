import { Button, Card, Flex } from '@fluentui/react-northstar';
import * as React from 'react';
import { StarIcon, DownloadIcon, MoreIcon } from '@fluentui/react-icons-northstar';

const CardExampleFooter = () => (
  <Card aria-roledescription="card with action buttons">
    <Card.Footer fitted>
      <Flex space="between">
        <Button content="Action" />
        <Flex>
          <Button icon={<StarIcon />} iconOnly text title="Favourite" />
          <Button icon={<DownloadIcon />} iconOnly text title="Download" />
          <Button icon={<MoreIcon />} iconOnly text title="More" />
        </Flex>
      </Flex>
    </Card.Footer>
  </Card>
);

export default CardExampleFooter;
