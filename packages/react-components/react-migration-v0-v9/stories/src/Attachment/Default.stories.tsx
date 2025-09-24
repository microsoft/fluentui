import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Attachment, AttachmentHeader, AttachmentBody } from '@fluentui/react-migration-v0-v9';

export const Default = (): JSXElement => {
  return (
    <Attachment>
      <AttachmentBody>
        <AttachmentHeader>Document.docx</AttachmentHeader>
      </AttachmentBody>
    </Attachment>
  );
};

Default.storyName = 'Default';
