import * as React from 'react';
import { Button, Flex, Image, Text, Avatar, Card, Layout } from '@fluentui/react-northstar';
import { StarIcon, DownloadIcon, MoreIcon } from '@fluentui/react-icons-northstar';

const CardExample = () => (
  <Card fluid>
    <Card.Header>
      <Flex gap="gap.small" column>
        <Avatar image="public/images/avatar/small/matt.jpg" label="Copy bandwidth" name="Evie yundt" status="unknown" />
        <Text content="Sample card" weight="bold" />
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
);

const ImageExampleFluent = () => (
  <div>
    <Layout styles={{ maxWidth: '200px' }} debug renderMainArea={() => <CardExample />} />
    <Layout styles={{ maxWidth: '400px' }} debug renderMainArea={() => <CardExample />} />
    <Layout styles={{ maxWidth: '600px' }} debug renderMainArea={() => <CardExample />} />
  </div>
);

export default ImageExampleFluent;
