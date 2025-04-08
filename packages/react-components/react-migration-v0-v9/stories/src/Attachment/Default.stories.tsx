import * as React from 'react';
import { Attachment, AttachmentHeader, AttachmentBody } from '@fluentui/react-migration-v0-v9';

export const Default = () => {
  return (
    <Attachment>
      <AttachmentBody>
        <AttachmentHeader>Document.docx</AttachmentHeader>
      </AttachmentBody>
    </Attachment>
  );
};

Default.storyName = 'Default';
