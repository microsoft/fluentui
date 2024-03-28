import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { TagPickerBasicExample } from '../Pickers/TagPicker.Basic.Example';

export const ShadowDOMPickersExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <TagPickerBasicExample />
    </Shadow>
  );
};
