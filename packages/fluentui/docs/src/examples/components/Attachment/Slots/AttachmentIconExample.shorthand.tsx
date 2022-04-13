import * as React from 'react';

import { ExcelColorIcon, PowerPointColorIcon, WordColorIcon } from '@fluentui/react-icons-northstar';
import { Attachment } from '@fluentui/react-northstar';

const AttachmentIconExampleShorthand = () => (
  <div>
    <Attachment icon={<WordColorIcon />} header="MeetingNotes.docx" />
    <Attachment icon={<ExcelColorIcon />} header="Budget.xlsx" />
    <Attachment icon={<PowerPointColorIcon />} header="Presentation.pptx" />
  </div>
);

export default AttachmentIconExampleShorthand;
