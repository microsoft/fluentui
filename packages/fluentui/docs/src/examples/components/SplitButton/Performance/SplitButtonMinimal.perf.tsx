import { SplitButton } from '@fluentui/react-northstar';
import * as React from 'react';

const SplitButtonMinimalPerf = () => <SplitButton />;

SplitButtonMinimalPerf.iterations = 5000;
SplitButtonMinimalPerf.filename = 'SplitButtonMinimal.perf.tsx';

export default SplitButtonMinimalPerf;
