import { Header } from '@fluentui/react-future';
import * as React from 'react';

const HeaderMinimalPerf = () => <Header />;

HeaderMinimalPerf.iterations = 5000;
HeaderMinimalPerf.filename = 'HeaderMinimal.perf.tsx';

export default HeaderMinimalPerf;
