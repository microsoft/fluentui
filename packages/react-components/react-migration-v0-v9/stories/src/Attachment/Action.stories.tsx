import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Attachment, AttachmentHeader, AttachmentAction, AttachmentBody } from '@fluentui/react-migration-v0-v9';
import { DismissRegular as Dismiss, MoreHorizontalRegular as MoreHorizontal } from '@fluentui/react-icons';

export const Action = (): JSXElement => {
  const handleClick = (action: string) => () => alert(`'${action}' was clicked`);

  return (
    <div>
      <Attachment onClick={handleClick('Remove')}>
        <AttachmentBody>
          <AttachmentHeader>Picture.jpg</AttachmentHeader>
        </AttachmentBody>
        <AttachmentAction icon={<Dismiss />} onClick={handleClick('Remove')} title="Close" />
      </Attachment>
      <Attachment onClick={handleClick('Show more')}>
        <AttachmentBody>
          <AttachmentHeader>Document.docx</AttachmentHeader>
        </AttachmentBody>
        <AttachmentAction icon={<MoreHorizontal />} onClick={handleClick('Show more')} title="Show more" />
      </Attachment>
    </div>
  );
};

Action.storyName = 'Action';
