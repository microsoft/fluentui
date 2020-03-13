import { Input } from '@fluentui/react-experimental';
import * as React from 'react';

const InputMinimalPerf = () => <Input />;

InputMinimalPerf.iterations = 1000;
InputMinimalPerf.filename = 'InputMinimal.perf.tsx';

export default InputMinimalPerf;
