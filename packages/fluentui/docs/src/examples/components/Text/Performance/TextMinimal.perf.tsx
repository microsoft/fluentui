import { Text } from '@fluentui/react-future';
import * as React from 'react';

const TextMinimalPerf = () => <Text />;

TextMinimalPerf.iterations = 5000;
TextMinimalPerf.filename = 'TextMinimal.perf.tsx';

export default TextMinimalPerf;
