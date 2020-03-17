import { Embed } from '@fluentui/react-future';
import * as React from 'react';

const EmbedMinimalPerf = () => <Embed />;

EmbedMinimalPerf.iterations = 5000;
EmbedMinimalPerf.filename = 'EmbedMinimal.perf.tsx';

export default EmbedMinimalPerf;
