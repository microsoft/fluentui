import * as React from 'react';
import { Attachment } from '@fluentui/react-northstar';

const AttachmentIconExampleShorthand = () => (
  <div>
    <Attachment icon="word-color" header="MeetingNotes.docx" />
    <Attachment icon="excel-color" header="Budget.xlsx" />
    <Attachment icon="powerpoint-color" header="Presentation.pptx" />
  </div>
);

export default AttachmentIconExampleShorthand;
