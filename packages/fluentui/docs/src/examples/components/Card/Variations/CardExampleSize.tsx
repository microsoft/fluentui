import { Button, Flex, Image, Text, Avatar, Card, Divider } from '@fluentui/react-northstar';
import * as React from 'react';
import { StarIcon, DownloadIcon, MoreIcon } from '@fluentui/react-icons-northstar';

const CardExampleSize = () => (
  <Flex gap="gap.small">
    <Card size="small">
      <Card.Header>
        <Flex gap="gap.small" column>
          <Avatar
            image="public/images/avatar/small/matt.jpg"
            label="Copy bandwidth"
            name="Evie yundt"
            status="unknown"
          />
          <Text content="Small card" weight="bold" />
          <Text content="Secondary line" size="small" />
        </Flex>
      </Card.Header>
      <Card.Body>
        <Flex column gap="gap.small">
          <Image src="public/images/wireframe/square-image.png" fluid />
          <Text content="Content text" />
        </Flex>
      </Card.Body>
      <Card.Footer>
        <Flex space="between">
          <Button content="Action" />
          <Flex>
            <Button icon={<StarIcon />} iconOnly text title="Favourite" />
            <Button icon={<MoreIcon />} iconOnly text title="More" />
          </Flex>
        </Flex>
      </Card.Footer>
    </Card>

    <Divider />

    <Card>
      <Card.Header>
        <Flex gap="gap.small" column>
          <Avatar
            image="public/images/avatar/small/matt.jpg"
            label="Copy bandwidth"
            name="Evie yundt"
            status="unknown"
          />
          <Text content="Medium(default) card" weight="bold" />
          <Text content="Secondary line" size="small" />
        </Flex>
      </Card.Header>
      <Card.Body>
        <Flex column gap="gap.small">
          <Image src="public/images/wireframe/square-image.png" fluid />
          <Text content="Content text" />
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

    <Divider />

    <Card size="large">
      <Card.Header>
        <Flex gap="gap.small" column>
          <Avatar
            image="public/images/avatar/small/matt.jpg"
            label="Copy bandwidth"
            name="Evie yundt"
            status="unknown"
          />
          <Text content="Large card" weight="bold" />
          <Text content="Secondary line" size="small" />
        </Flex>
      </Card.Header>
      <Card.Body>
        <Flex column gap="gap.small">
          <Image src="public/images/wireframe/square-image.png" fluid />
          <Text content="Content text" />
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
  </Flex>
);

export default CardExampleSize;
