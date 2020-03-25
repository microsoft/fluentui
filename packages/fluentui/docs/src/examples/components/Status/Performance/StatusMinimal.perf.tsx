import { Status } from '@fluentui/react-northstar';
import * as React from 'react';

const StatusMinimalPerf = () => <Status />;

StatusMinimalPerf.iterations = 10000;
StatusMinimalPerf.filename = 'StatusMinimal.perf.tsx';

export default StatusMinimalPerf;
