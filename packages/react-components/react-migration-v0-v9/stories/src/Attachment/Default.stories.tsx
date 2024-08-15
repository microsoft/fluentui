import { Attachment, AttachmentHeader, AttachmentBody } from '@fluentui/react-migration-v0-v9';

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
