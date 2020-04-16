import {
  Button,
  Card,
  cardChildrenFocusableBehavior,
  DownloadIcon,
  Flex,
  MoreIcon,
  StarIcon,
  Text,
} from '@fluentui/react-northstar';
import * as React from 'react';

const CardExampleFocusableChildren = () => {
  return (
    <Card accessibility={cardChildrenFocusableBehavior} aria-roledescription="card with action buttons">
      <Card.Header>
        <Text content="Sample title" weight="bold" />
      </Card.Header>
      <Card.Footer>
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
};

export default CardExampleFocusableChildren;
