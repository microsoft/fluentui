import { Button } from '@fluentui/react-northstar';
import * as React from 'react';

const ButtonMinimalPerf = () => <Button />;

ButtonMinimalPerf.iterations = 1000;
ButtonMinimalPerf.filename = 'ButtonMinimal.perf.tsx';

export default ButtonMinimalPerf;
