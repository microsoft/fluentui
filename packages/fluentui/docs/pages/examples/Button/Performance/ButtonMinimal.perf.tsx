import { Button } from '@fluentui/react-northstar';
import * as React from 'react';

const ButtonMinimalPerf = () => <Button aria-label="Minimal button" />;

ButtonMinimalPerf.iterations = 1000;
ButtonMinimalPerf.filename = 'ButtonMinimal.perf.tsx';

export default ButtonMinimalPerf;
