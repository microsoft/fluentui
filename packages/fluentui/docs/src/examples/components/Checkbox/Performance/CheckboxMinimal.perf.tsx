import { Checkbox } from '@fluentui/react-future';
import * as React from 'react';

const CheckboxMinimalPerf = () => <Checkbox />;

CheckboxMinimalPerf.iterations = 5000;
CheckboxMinimalPerf.filename = 'CheckboxMinimal.perf.tsx';

export default CheckboxMinimalPerf;
