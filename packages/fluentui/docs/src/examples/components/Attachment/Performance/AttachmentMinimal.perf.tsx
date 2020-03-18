import { Attachment } from '@fluentui/react-northstar';
import * as React from 'react';

const AttachmentMinimalPerf = () => <Attachment />;

AttachmentMinimalPerf.iterations = 1000;
AttachmentMinimalPerf.filename = 'AttachmentMinimal.perf.tsx';

export default AttachmentMinimalPerf;
