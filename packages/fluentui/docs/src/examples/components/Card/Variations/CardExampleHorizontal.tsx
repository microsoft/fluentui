import { Button, Flex, Image, Text, Card } from '@fluentui/react-northstar';
import * as React from 'react';
import { DownloadIcon, MoreIcon } from '@fluentui/react-icons-northstar';

const CardExampleHorizontal = () => (
  <Card compact horizontal aria-roledescription="card with a preview image, text and action buttons">
    <Card.Preview horizontal>
      <Image
        style={{ height: '115px', width: '115px' }}
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/square-image.png"
      />
    </Card.Preview>
    <Card.Column>
      <Card.Header>
        <Text content="It's a wonderful life" weight="bold" />
      </Card.Header>
      <Card.Body>
        <Text content="Citizens of distant epochs muse about..." />
      </Card.Body>
      <Card.Footer fitted>
        <Flex space="between" vAlign="center">
          <Text content="2.4k likes" />
          <Flex>
            <Button icon={<DownloadIcon />} iconOnly text title="Download" />
            <Button icon={<MoreIcon />} iconOnly text title="More" />
          </Flex>
        </Flex>
      </Card.Footer>
    </Card.Column>
  </Card>
);

export default CardExampleHorizontal;
