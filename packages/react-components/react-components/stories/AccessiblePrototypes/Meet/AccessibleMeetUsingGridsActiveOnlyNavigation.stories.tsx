import * as React from 'react';
import { Prototype } from './../utils';

import { AccessibleMeetBase } from './AccessibleMeetBase';

export const UsingGridsActiveOnlyNavigation: React.FC = () => {
  return (
    <Prototype pageTitle="Accessible Meet Using Grids Active Only Navigation">
      <AccessibleMeetBase variant="gridsActiveOnlyNavigation" />
    </Prototype>
  );
};
