import * as React from 'react';
import { Prototype } from './../utils';

import { AccessibleMeetBase } from './AccessibleMeetBase';

export const UsingGridsFirstCellNavigation: React.FC = () => {
  return (
    <Prototype pageTitle="Accessible Meet Using Grids First Cell Navigation">
      <AccessibleMeetBase variant="gridsFirstCellNavigation" />
    </Prototype>
  );
};
