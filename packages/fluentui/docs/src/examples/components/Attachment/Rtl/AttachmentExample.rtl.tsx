import * as React from 'react';

import { MoreIcon, WordIcon } from '@fluentui/react-icons-northstar';
import { Attachment } from '@fluentui/react-northstar';

const AttachmentExampleRtl = () => (
  <Attachment header="مستند" description="مرحبا العالم" icon={<WordIcon />} progress={70} action={<MoreIcon />} />
);

export default AttachmentExampleRtl;
