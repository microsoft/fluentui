import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { SliderBasicExample } from '../Slider/Slider.Basic.Example';

export const ShadowDOMSliderExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <SliderBasicExample />
    </Shadow>
  );
};
