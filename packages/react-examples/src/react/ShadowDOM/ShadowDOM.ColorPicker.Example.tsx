import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { ColorPickerBasicExample } from '../ColorPicker/ColorPicker.Basic.Example';

export const ShadowDOMColorPickerExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <ColorPickerBasicExample />
    </Shadow>
  );
};
