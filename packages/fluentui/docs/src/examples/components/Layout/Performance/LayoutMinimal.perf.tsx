import { Layout } from '@fluentui/react';
import * as React from 'react';

const LayoutMinimalPerf = () => <Layout />;

LayoutMinimalPerf.iterations = 5000;
LayoutMinimalPerf.filename = 'LayoutMinimal.perf.tsx';

export default LayoutMinimalPerf;
