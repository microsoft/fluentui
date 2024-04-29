import * as React from 'react';
import { Attachment } from '@fluentui/react-northstar';
import { WordIcon } from '@fluentui/react-icons-northstar';
// changed to svg icon
const AttachmentExampleRtl = () => <Attachment header="مرحبا العالم" icon={<WordIcon />} progress={70} />;

export default AttachmentExampleRtl;
