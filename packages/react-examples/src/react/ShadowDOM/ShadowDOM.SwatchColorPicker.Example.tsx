import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { SwatchColorPickerBasicExample } from '../SwatchColorPicker/SwatchColorPicker.Basic.Example';

export const ShadowDOMSwatchColorPickerExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <SwatchColorPickerBasicExample />
    </Shadow>
  );
};
