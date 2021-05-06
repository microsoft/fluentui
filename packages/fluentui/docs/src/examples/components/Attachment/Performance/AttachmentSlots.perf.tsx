import { Attachment } from '@fluentui/react-northstar';
import * as React from 'react';
import { MoreIcon, TableIcon } from '@fluentui/react-icons-northstar';

const AttachmentSlotsPerf = () => (
  <Attachment
    actionable
    icon={<TableIcon />}
    header="Document.docx"
    description="800 Kb"
    action={{ icon: <MoreIcon />, title: 'More Action' }}
    progress={33}
  />
);

AttachmentSlotsPerf.iterations = 1000;
AttachmentSlotsPerf.filename = 'AttachmentSlots.perf.tsx';

export default AttachmentSlotsPerf;
