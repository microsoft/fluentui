import { Button, Flex, Image, Text, Avatar, Card } from '@fluentui/react-northstar';
import * as React from 'react';
import { StarIcon, DownloadIcon, MoreIcon } from '@fluentui/react-icons-northstar';

const CardExampleCentered = () => (
  <Card centered aria-roledescription="card with avatar, image and action buttons">
    <Card.Header>
      <Flex gap="gap.small" column hAlign="center">
        <Avatar
          image="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg"
          label="Copy bandwidth"
          name="Robert Tolbert"
          status="unknown"
        />
        <Text content="Title goes here" weight="bold" />
        <Text content="Secondary line" size="small" />
      </Flex>
    </Card.Header>
    <Card.Body>
      <Flex column gap="gap.small">
        <Image src="https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/square-image.png" />
        <Text content="Citizens of distant epochs muse about at the edge of forever hearts of the..." align="center" />
      </Flex>
    </Card.Body>
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

export default CardExampleCentered;
