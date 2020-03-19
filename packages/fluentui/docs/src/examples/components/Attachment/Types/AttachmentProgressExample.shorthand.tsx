import * as React from 'react';
import { Attachment } from '@fluentui/react-northstar';

const AttachmentProgressExampleShorthand = () => (
  <Attachment
    header="Photo.jpg"
    action={{ icon: 'close', onClick: () => alert("'X' is clicked!"), title: 'Close' }}
    progress={33}
  />
);

export default AttachmentProgressExampleShorthand;
