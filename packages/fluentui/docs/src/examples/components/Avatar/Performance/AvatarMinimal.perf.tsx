import { Avatar } from '@fluentui/react-experimental';
import * as React from 'react';

const AvatarMinimalPerf = () => <Avatar />;

AvatarMinimalPerf.iterations = 1000;
AvatarMinimalPerf.filename = 'AvatarMinimal.perf.tsx';

export default AvatarMinimalPerf;
