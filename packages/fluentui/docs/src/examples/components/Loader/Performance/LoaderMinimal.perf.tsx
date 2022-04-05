import { Loader } from '@fluentui/react-northstar';
import * as React from 'react';

const LoaderMinimalPerf = () => <Loader />;

LoaderMinimalPerf.iterations = 1000;
LoaderMinimalPerf.filename = 'LoaderMinimal.perf.tsx';

export default LoaderMinimalPerf;
