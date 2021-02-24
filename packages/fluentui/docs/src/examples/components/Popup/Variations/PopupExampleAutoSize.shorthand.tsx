import * as React from 'react';
import { Button, Popup, Image, Flex, Text } from '@fluentui/react-northstar';
import { MoreIcon } from '@fluentui/react-icons-northstar';

const longContent = (
  <Flex column gap="gap.small">
    <Image src="https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/square-image.png" />
    <Text content="Lorem ipsum dolor" />
  </Flex>
);

const PopupExampleAutoSize = () => (
  <div
    style={{
      paddingTop: '10rem',
      maxWidth: '40rem',
      border: 'red dashed',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <Popup
      trigger={<Button icon={<MoreIcon />} title="Show popup" />}
      content={longContent}
      position={'above'}
      inline
      autoSize
    />
  </div>
);

export default PopupExampleAutoSize;
