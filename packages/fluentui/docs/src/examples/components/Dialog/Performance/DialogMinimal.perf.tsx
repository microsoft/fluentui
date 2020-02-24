import { Dialog } from '@fluentui/react';
import * as React from 'react';

const DialogMinimalPerf = () => <Dialog />;

DialogMinimalPerf.iterations = 5000;
DialogMinimalPerf.filename = 'DialogMinimal.perf.tsx';

export default DialogMinimalPerf;
