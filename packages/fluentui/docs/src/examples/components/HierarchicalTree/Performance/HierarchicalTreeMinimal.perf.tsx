import { HierarchicalTree } from '@fluentui/react-experimental';
import * as React from 'react';

const HierarchicalTreeMinimalPerf = () => <HierarchicalTree />;

HierarchicalTreeMinimalPerf.iterations = 5000;
HierarchicalTreeMinimalPerf.filename = 'HierarchicalTreeMinimal.perf.tsx';

export default HierarchicalTreeMinimalPerf;
