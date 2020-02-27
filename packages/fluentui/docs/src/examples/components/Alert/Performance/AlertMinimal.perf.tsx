import { Alert } from '@fluentui/react';
import * as React from 'react';

const AlertMinimalPerf = () => <Alert />;

AlertMinimalPerf.iterations = 1000;
AlertMinimalPerf.filename = 'AlertMinimal.perf.tsx';

export default AlertMinimalPerf;
