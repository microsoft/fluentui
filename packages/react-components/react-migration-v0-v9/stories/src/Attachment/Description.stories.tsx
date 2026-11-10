import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Attachment, AttachmentHeader, AttachmentDescription, AttachmentBody } from '@fluentui/react-migration-v0-v9';

export const Description = (): JSXElement => {
  return (
    <Attachment>
      <AttachmentBody>
        <AttachmentHeader>Profile.jpg</AttachmentHeader>
        <AttachmentDescription>80kb</AttachmentDescription>
      </AttachmentBody>
    </Attachment>
  );
};

Description.storyName = 'Description';
