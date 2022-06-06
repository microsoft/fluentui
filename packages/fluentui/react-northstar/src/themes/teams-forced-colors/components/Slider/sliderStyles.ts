import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { SliderProps } from '../../../../components/Slider/Slider';
import { pxToRem } from '../../../../utils/fontSizeUtility';
import { SliderVariables } from '../../../teams/components/Slider/sliderVariables';

export const sliderStyles: ComponentSlotStylesPrepared<SliderProps, SliderVariables> = {
  rail: (): ICSSInJSStyle => {
    return {
      border: `${pxToRem(1)} solid transparent`,
    };
  },

  track: (): ICSSInJSStyle => {
    return {
      border: `${pxToRem(1)} solid transparent`,
    };
  },

  thumb: (): ICSSInJSStyle => {
    return {
      border: `${pxToRem(1)} solid transparent`,
    };
  },
};
