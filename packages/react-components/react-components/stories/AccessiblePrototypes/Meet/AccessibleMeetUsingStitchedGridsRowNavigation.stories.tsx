import * as React from 'react';
import { Prototype } from './../utils';

import { AccessibleMeetBase } from './AccessibleMeetBase';

export const UsingStitchedGridsRowNavigation: React.FC = () => {
  return (
    <Prototype pageTitle="Accessible Meet Using Stitched Grids Row Navigation">
      <AccessibleMeetBase variant="stitchedGridsRowNavigation" />
    </Prototype>
  );
};
