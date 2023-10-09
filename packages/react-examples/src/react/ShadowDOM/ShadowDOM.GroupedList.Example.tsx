import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { GroupedListBasicExample } from '../GroupedList/GroupedList.Basic.Example';

export const ShadowDOMGroupedListExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <GroupedListBasicExample />
    </Shadow>
  );
};
