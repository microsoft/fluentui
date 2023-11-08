import * as React from 'react';
import { Prototype } from './../utils';

import { AccessibleMeetBase } from './AccessibleMeetBase';

export const UsingGridsCellNavigation: React.FC = () => {
  return (
    <Prototype pageTitle="Accessible Meet Using Grids Cell Navigation">
      <AccessibleMeetBase variant="gridsCellNavigation" />
    </Prototype>
  );
};
