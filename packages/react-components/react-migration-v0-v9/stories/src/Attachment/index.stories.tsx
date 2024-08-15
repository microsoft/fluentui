import * as React from 'react';
import {
  Attachment,
  AttachmentIcon,
  AttachmentHeader,
  AttachmentDescription,
  AttachmentAction,
  AttachmentBody,
} from '@fluentui/react-migration-v0-v9';
import {
  DismissRegular as Dismiss,
  MoreHorizontalRegular as MoreHorizontal,
  BriefcaseRegular as Briefcase,
  BookRegular as Book,
  PresenterRegular as Presenter,
  TableRegular as Table,
} from '@fluentui/react-icons';

import descriptionMd from './AttachmentDescription.md';

export const DefaultAttachment = () => {
  return (
    <Attachment>
      <AttachmentBody>
        <AttachmentHeader>Document.docx</AttachmentHeader>
      </AttachmentBody>
    </Attachment>
  );
};

DefaultAttachment.storyName = 'Default';

export const Progress = () => {
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

export const Icon = () => {
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

export const Description = () => {
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

export const Action = () => {
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

export const Actionable = () => {
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

export default {
  title: 'Migration Shims/V0/Attachment',
  component: Attachment,
  args: {
    layout: 'verr',
  },
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
