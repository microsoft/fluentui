import * as React from 'react';
import { Button, Flex, Text, Avatar, Card, Layout } from '@fluentui/react-northstar';
import { StarIcon, DownloadIcon, MoreIcon } from '@fluentui/react-icons-northstar';

const CardExample = () => (
  <Card fluid aria-roledescription="card with avatar, image and action buttons">
    <Card.Header>
      <Flex gap="gap.small">
        <Avatar
          image="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg"
          label="Copy bandwidth"
          name="Robert Tolbert"
          status="unknown"
        />
        <Flex column>
          <Text content="Fluid card" weight="bold" />
          <Text content="Secondary line" size="small" />
        </Flex>
      </Flex>
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

const ImageExampleFluent = () => (
  <div>
    <Layout styles={{ maxWidth: '200px' }} debug renderMainArea={() => <CardExample />} />
    <Layout styles={{ maxWidth: '400px' }} debug renderMainArea={() => <CardExample />} />
    <Layout styles={{ maxWidth: '600px' }} debug renderMainArea={() => <CardExample />} />
  </div>
);

export default ImageExampleFluent;
