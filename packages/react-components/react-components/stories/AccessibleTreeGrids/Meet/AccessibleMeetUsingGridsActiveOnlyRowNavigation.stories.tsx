import * as React from 'react';
import { Prototype } from './../utils';

import { AccessibleMeetBase } from './AccessibleMeetBase';

export const UsingGridsActiveOnlyRowNavigation: React.FC = () => {
  return (
    <Prototype pageTitle="Variant A: Accessible Meet Using Grids Active Only Row Navigation">
      <AccessibleMeetBase variant="gridsActiveOnlyRowNavigation" />
    </Prototype>
  );
};
