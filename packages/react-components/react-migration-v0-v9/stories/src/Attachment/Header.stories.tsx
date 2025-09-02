import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Attachment, AttachmentHeader, AttachmentBody } from '@fluentui/react-migration-v0-v9';

export const Header = (): JSXElement => {
  return (
    <Attachment>
      <AttachmentBody>
        <AttachmentHeader>Strategy.docx</AttachmentHeader>
      </AttachmentBody>
    </Attachment>
  );
};

Header.storyName = 'Header';
