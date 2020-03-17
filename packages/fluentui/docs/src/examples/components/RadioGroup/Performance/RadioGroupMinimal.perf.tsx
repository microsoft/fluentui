import { RadioGroup } from '@fluentui/react-future';
import * as React from 'react';

const RadioGroupMinimalPerf = () => <RadioGroup />;

RadioGroupMinimalPerf.iterations = 5000;
RadioGroupMinimalPerf.filename = 'RadioGroupMinimal.perf.tsx';

export default RadioGroupMinimalPerf;
