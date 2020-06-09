import { Text } from '@fluentui/react-northstar';
import * as React from 'react';

const TextMinimalPerf = () => <Text />;

TextMinimalPerf.iterations = 5000;
TextMinimalPerf.filename = 'TextMinimal.perf.tsx';

export default TextMinimalPerf;
