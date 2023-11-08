import * as React from 'react';
import { Prototype } from './../utils';

import { AccessibleMeetBase } from './AccessibleMeetBase';

export const UsingLists: React.FC = () => {
  return (
    <Prototype pageTitle="Accessible Meet Using Lists">
      <AccessibleMeetBase variant="lists" />
    </Prototype>
  );
};
