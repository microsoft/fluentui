import * as React from 'react';
import { ActivityItemBasicExample } from '../ActivityItem/ActivityItem.Basic.Example';
import { Shadow } from './ShadowHelper';

export const ShadowDOMActivityItemExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <ActivityItemBasicExample />
    </Shadow>
  );
};
