import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Attachment,
  AttachmentIcon,
  AttachmentHeader,
  AttachmentDescription,
  AttachmentAction,
  AttachmentBody,
} from '@fluentui/react-migration-v0-v9';
import { MoreHorizontalRegular as MoreHorizontal, TableRegular as Table } from '@fluentui/react-icons';

export const Actionable = (): JSXElement => {
  const handleClick = (message: string) => (e: React.MouseEvent) => {
    alert(`'${message}' was clicked`);
    e.stopPropagation();
  };

  return (
    <Attachment actionable onClick={handleClick('Attachment')} progress={33}>
      <AttachmentIcon>
        <Table />
      </AttachmentIcon>
      <AttachmentBody>
        <AttachmentHeader>Document.docx</AttachmentHeader>
        <AttachmentDescription>800 Kb</AttachmentDescription>
      </AttachmentBody>
      <AttachmentAction icon={<MoreHorizontal />} onClick={handleClick('More Action')} title="More Action" />
    </Attachment>
  );
};

Actionable.storyName = 'Actionable';
