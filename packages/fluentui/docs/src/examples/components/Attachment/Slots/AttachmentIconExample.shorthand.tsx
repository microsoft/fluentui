import * as React from 'react';
import { Attachment } from '@fluentui/react-northstar';
import { WordColorIcon, ExcelColorIcon, PowerPointColorIcon } from '@fluentui/react-icons-northstar';

const AttachmentIconExampleShorthand = () => (
  <div>
    <Attachment icon={<WordColorIcon />} header="MeetingNotes.docx" />
    <Attachment icon={<ExcelColorIcon />} header="Budget.xlsx" />
    <Attachment icon={<PowerPointColorIcon />} header="Presentation.pptx" />
  </div>
);

export default AttachmentIconExampleShorthand;
