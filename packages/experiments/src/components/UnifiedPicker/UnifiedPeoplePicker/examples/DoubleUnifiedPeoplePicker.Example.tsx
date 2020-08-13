import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { UnifiedPeoplePickerExample } from '@uifabric/experiments/src/components/UnifiedPicker/UnifiedPeoplePicker/examples/UnifiedPeoplePicker.Example';

export const DoubleUnifiedPeoplePickerExample = (): JSX.Element => {
  return (
    <>
      To: <UnifiedPeoplePickerExample />
      CC: <UnifiedPeoplePickerExample />
    </>
  );
};
