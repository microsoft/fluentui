import { Reaction } from '@fluentui/react-future';
import * as React from 'react';

const ReactionMinimalPerf = () => <Reaction />;

ReactionMinimalPerf.iterations = 5000;
ReactionMinimalPerf.filename = 'ReactionMinimal.perf.tsx';

export default ReactionMinimalPerf;
