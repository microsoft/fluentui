import { Skeleton } from '@fluentui/react-northstar';
import * as React from 'react';

const SkeletonMinimalPerf = () => <Skeleton />;

SkeletonMinimalPerf.iterations = 5000;
SkeletonMinimalPerf.filename = 'SkeletonMinimal.perf.tsx';

export default SkeletonMinimalPerf;
