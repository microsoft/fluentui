import { Flex } from '@fluentui/react-northstar';
import * as React from 'react';

const FlexMinimalPerf = () => <Flex />;

FlexMinimalPerf.iterations = 5000;
FlexMinimalPerf.filename = 'FlexMinimal.perf.tsx';

export default FlexMinimalPerf;
