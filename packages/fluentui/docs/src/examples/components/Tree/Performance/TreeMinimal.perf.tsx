import { Tree } from '@fluentui/react';
import * as React from 'react';

const TreeMinimalPerf = () => <Tree />;

TreeMinimalPerf.iterations = 5000;
TreeMinimalPerf.filename = 'TreeMinimal.perf.tsx';

export default TreeMinimalPerf;
