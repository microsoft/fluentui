import { Dropdown } from '@fluentui/react-future';
import * as React from 'react';

const DropdownMinimalPerf = () => <Dropdown />;

DropdownMinimalPerf.iterations = 1000;
DropdownMinimalPerf.filename = 'DropdownMinimal.perf.tsx';

export default DropdownMinimalPerf;
