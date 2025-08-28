import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Attachment, AttachmentIcon, AttachmentHeader, AttachmentBody } from '@fluentui/react-migration-v0-v9';
import {
  BriefcaseRegular as Briefcase,
  BookRegular as Book,
  PresenterRegular as Presenter,
} from '@fluentui/react-icons';

export const Icon = (): JSXElement => {
  return (
    <div>
      <Attachment>
        <AttachmentIcon>
          <Book />
        </AttachmentIcon>
        <AttachmentBody>
          <AttachmentHeader>MeetingNotes.docx</AttachmentHeader>
        </AttachmentBody>
      </Attachment>
      <Attachment>
        <AttachmentIcon>
          <Briefcase />
        </AttachmentIcon>
        <AttachmentBody>
          <AttachmentHeader>Budget.xlsx</AttachmentHeader>
        </AttachmentBody>
      </Attachment>
      <Attachment>
        <AttachmentIcon>
          <Presenter />
        </AttachmentIcon>
        <AttachmentBody>
          <AttachmentHeader>Presentation.pptx</AttachmentHeader>
        </AttachmentBody>
      </Attachment>
    </div>
  );
};

Icon.storyName = 'Icon';
