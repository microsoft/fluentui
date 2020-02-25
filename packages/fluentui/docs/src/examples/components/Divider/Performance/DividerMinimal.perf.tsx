import { Divider } from '@fluentui/react';
import * as React from 'react';

const DividerMinimalPerf = () => <Divider />;

DividerMinimalPerf.iterations = 5000;
DividerMinimalPerf.filename = 'DividerMinimal.perf.tsx';

export default DividerMinimalPerf;
