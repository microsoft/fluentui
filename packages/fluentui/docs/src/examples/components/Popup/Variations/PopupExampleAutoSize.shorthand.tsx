import * as React from 'react';
import { Button, Checkbox, Popup, Image, Flex, Text, Box } from '@fluentui/react-northstar';
import { MoreIcon } from '@fluentui/react-icons-northstar';

const PopupExampleAutoSize = () => {
  const [autoSize, setAutoSize] = React.useState(true);

  return (
    <Box
      style={{
        paddingTop: '10rem',
        maxWidth: '40rem',
        border: 'red dashed',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Checkbox label="Autosize" checked={autoSize} onChange={(e, data) => setAutoSize(data.checked)} />
      <Popup
        trigger={<Button icon={<MoreIcon />} title="Show popup" />}
        content={
          <Flex column gap="gap.small">
            <Image src="https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/square-image.png" />
            <Text content="Lorem ipsum dolor" />
          </Flex>
        }
        position={'above'}
        inline
        open
        autoSize={autoSize}
      />
    </Box>
  );
};

export default PopupExampleAutoSize;
