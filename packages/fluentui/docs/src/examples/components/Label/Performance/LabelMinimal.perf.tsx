import { Label } from '@fluentui/react-northstar';
import * as React from 'react';

const LabelMinimalPerf = () => <Label />;

LabelMinimalPerf.iterations = 5000;
LabelMinimalPerf.filename = 'LabelMinimal.perf.tsx';

export default LabelMinimalPerf;
