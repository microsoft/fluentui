import { Card } from '@fluentui/react-northstar';
import * as React from 'react';

const CardMinimalPerf = () => <Card />;

CardMinimalPerf.iterations = 5000;
CardMinimalPerf.filename = 'CardMinimal.perf.tsx';

export default CardMinimalPerf;
