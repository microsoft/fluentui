import { Animation } from '@fluentui/react-northstar';
import * as React from 'react';

const AnimationMinimalPerf = () => (
  <Animation>
    <div />
  </Animation>
);

AnimationMinimalPerf.iterations = 5000;
AnimationMinimalPerf.filename = 'AnimationMinimal.perf.tsx';

export default AnimationMinimalPerf;
