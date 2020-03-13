import { Slider } from '@fluentui/react-experimental';
import * as React from 'react';

const SliderMinimalPerf = () => <Slider />;

SliderMinimalPerf.iterations = 1000;
SliderMinimalPerf.filename = 'SliderMinimal.perf.tsx';

export default SliderMinimalPerf;
