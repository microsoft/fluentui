import * as React from 'react';
import { UnifiedPeoplePickerExample } from '@uifabric/experiments/lib/UnifiedPeoplePicker';

export const DoubleUnifiedPeoplePickerExample = (): JSX.Element => {
  return (
    <>
      To: <UnifiedPeoplePickerExample />
      CC: <UnifiedPeoplePickerExample />
    </>
  );
};
