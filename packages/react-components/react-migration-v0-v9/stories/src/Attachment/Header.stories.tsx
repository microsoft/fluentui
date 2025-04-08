import * as React from 'react';
import { Attachment, AttachmentHeader, AttachmentBody } from '@fluentui/react-migration-v0-v9';

export const Header = () => {
  return (
    <Attachment>
      <AttachmentBody>
        <AttachmentHeader>Strategy.docx</AttachmentHeader>
      </AttachmentBody>
    </Attachment>
  );
};

Header.storyName = 'Header';
