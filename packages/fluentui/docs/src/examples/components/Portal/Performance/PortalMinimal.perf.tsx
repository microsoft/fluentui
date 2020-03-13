import { Portal } from '@fluentui/react-experimental';
import * as React from 'react';

const PortalMinimalPerf = () => <Portal />;

PortalMinimalPerf.iterations = 5000;
PortalMinimalPerf.filename = 'PortalMinimal.perf.tsx';

export default PortalMinimalPerf;
