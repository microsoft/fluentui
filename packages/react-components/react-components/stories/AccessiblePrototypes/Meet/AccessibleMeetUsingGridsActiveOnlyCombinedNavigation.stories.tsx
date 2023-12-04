import * as React from 'react';
import { Prototype } from './../utils';

import { AccessibleMeetBase } from './AccessibleMeetBase';

export const UsingGridsActiveOnlyCombinedNavigation: React.FC = () => {
  return (
    <Prototype pageTitle="Variant B: Accessible Meet Using Grids Active Only Combined Navigation">
      <AccessibleMeetBase variant="gridsActiveOnlyCombinedNavigation" />
    </Prototype>
  );
};
