import * as React from 'react';
import { Prototype } from './../utils';

import { AccessibleMeetBase } from './AccessibleMeetBase';

export const UsingListsWithActions: React.FC = () => {
  return (
    <Prototype pageTitle="Accessible Meet Using Lists With Actions">
      <AccessibleMeetBase variant="listsWithActions" />
    </Prototype>
  );
};
