import { Accordion } from '@fluentui/react';
import * as React from 'react';

const AccordionMinimalPerf = () => <Accordion />;

AccordionMinimalPerf.iterations = 1000;
AccordionMinimalPerf.filename = 'AccordionMinimal.perf.tsx';

export default AccordionMinimalPerf;
