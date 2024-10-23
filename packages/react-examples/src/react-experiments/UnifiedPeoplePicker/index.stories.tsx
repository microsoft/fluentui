import * as React from 'react';

import { DoubleUnifiedPeoplePickerExample } from './DoubleUnifiedPeoplePicker.Example';
import { UnifiedPeoplePickerExample } from './UnifiedPeoplePicker.Example';
import { UnifiedPeoplePickerWithEditExample } from './UnifiedPeoplePicker.WithEdit.Example';

export const Double = () => <DoubleUnifiedPeoplePickerExample />;

export const Basic = () => <UnifiedPeoplePickerExample />;

export const WithEdit = () => <UnifiedPeoplePickerWithEditExample />;

export default {
  title: 'Components/UnifiedPeoplePicker',
};
