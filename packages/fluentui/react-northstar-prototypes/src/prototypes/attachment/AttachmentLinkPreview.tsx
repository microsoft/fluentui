import * as React from 'react';

import { Attachment, Flex, Image, Text } from '@fluentui/react-northstar';

export const AttachmentLinkPreview = () => (
  <Attachment
    actionable
    children={
      <>
        <Image
          src="https://fabricweb.azureedge.net/fabric-website/assets/images/fluent-ui-logo.png"
          width="90"
          design={{ padding: '4px 9px' }}
        />
        <Flex column style={{ minWidth: 0, alignSelf: 'stretch' }} design={{ padding: '8px' }}>
          <Text weight="bold">Fluent UI</Text>
          <Text truncated>
            Fluent UI provides extensible vanilla JavaScript solutions to component state, styling, and accessibility.
          </Text>
          <Flex.Item push>
            <Text size="small">https://fluentsite.z22.web.core.windows.net</Text>
          </Flex.Item>
        </Flex>
      </>
    }
    onClick={() => {
      alert('AttachmentLinkPreview was clicked!');
    }}
    style={{
      padding: 0,
      maxWidth: 'unset',
    }}
  />
);
