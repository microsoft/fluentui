import { Header } from '@fluentui/react-northstar';
import * as React from 'react';

const HeaderSlotsPerf = () => (
  <Header content="Account Settings" description="Manage your account settings and set email preferences." />
);

HeaderSlotsPerf.iterations = 5000;
HeaderSlotsPerf.filename = 'HeaderSlots.perf.tsx';

export default HeaderSlotsPerf;
