import { Ref } from '@fluentui/react';
import * as React from 'react';

const RefMinimalPerf = () => (
  <Ref innerRef={React.createRef()}>
    <div />
  </Ref>
);

RefMinimalPerf.iterations = 5000;
RefMinimalPerf.filename = 'RefMinimal.perf.tsx';

export default RefMinimalPerf;
