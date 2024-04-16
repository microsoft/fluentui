import * as React from 'react';
import { Prototype } from './../utils';

import { AccessibleMeetBase } from './AccessibleMeetBase';

export const UsingGridsRowNavigation: React.FC = () => {
  return (
    <Prototype pageTitle="Accessible Meet Using Grids Row Navigation">
      <AccessibleMeetBase variant="gridsRowNavigation" />
    </Prototype>
  );
};
