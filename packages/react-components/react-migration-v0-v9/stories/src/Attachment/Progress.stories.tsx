import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Attachment, AttachmentHeader, AttachmentAction, AttachmentBody } from '@fluentui/react-migration-v0-v9';
import { DismissRegular as Dismiss } from '@fluentui/react-icons';

export const Progress = (): JSXElement => {
  return (
    <Attachment actionable progress={33} onClick={() => alert('Attachment clicked')}>
      <AttachmentBody>
        <AttachmentHeader>Photo.jpg</AttachmentHeader>
      </AttachmentBody>
      <AttachmentAction icon={<Dismiss />} onClick={() => alert("'X' is clicked!")} title="Close" />
    </Attachment>
  );
};

Progress.storyName = 'Progress';
