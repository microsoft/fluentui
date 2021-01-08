import * as React from 'react';
import { RosterPrototype } from '@fluentui/react-northstar-prototypes';

const RosterPerf = () => <RosterPrototype />;

RosterPerf.iterations = 5000;
RosterPerf.filename = 'Roster.perf.tsx';

export default RosterPerf;
