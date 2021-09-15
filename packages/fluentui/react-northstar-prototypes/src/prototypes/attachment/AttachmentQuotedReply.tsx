import * as React from 'react';

import { Attachment, Box, Flex, Text } from '@fluentui/react-northstar';

export const AttachmentQuotedReply = () => (
  <Attachment
    actionable
    children={
      <>
        <Box
          style={{
            alignSelf: 'stretch',
            background: '#c7c7c7',
            borderRadius: '4px',
            marginRight: '8px',
            width: '4px',
          }}
        />
        <Flex column>
          <Text timestamp size="small">
            Cecil Folk
          </Text>
          <Text>Would you like to grab lunch there?</Text>
        </Flex>
      </>
    }
    onClick={() => {
      alert('AttachmentQuotedReply was clicked!');
    }}
    style={{
      padding: '8px',
      maxWidth: 'unset',
    }}
  />
);
