import * as React from 'react';
import { Attachment } from '@fluentui/react-northstar';
import { CloseIcon } from '@fluentui/react-icons-northstar';

const AttachmentProgressExampleShorthand = () => (
  <Attachment
    header="Photo.jpg"
    actionable
    action={{ icon: <CloseIcon />, onClick: () => alert("'X' is clicked!"), title: 'Close' }}
    progress={33}
  />
);

export default AttachmentProgressExampleShorthand;
