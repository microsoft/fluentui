import { sliderCSSVars } from '@fluentui/react-slider';
import { makeStyles } from '@griffel/react';
const { sliderProgressColorVar, sliderRailColorVar, sliderThumbColorVar, sliderThumbSizeVar } = sliderCSSVars;

export const useStyles = makeStyles({
  enabled: {
    [sliderProgressColorVar]: '#ff0764',
    [sliderRailColorVar]: '##242424',
    [sliderThumbColorVar]: '#ff0764',
    ':hover': {
      [sliderThumbColorVar]: '#d60d58',
      [sliderProgressColorVar]: '#d60d58',
      ':active': {
        [sliderThumbColorVar]: '#b91150',
        [sliderProgressColorVar]: '#b91150',
      },
    },
  },
  thumb: {
    [sliderThumbSizeVar]: '16px',
    boxShadow: `0 0 0 calc(var(${sliderThumbSizeVar}) * .2) transparent inset`,
    '::before': {
      content: 'unset',
    },
  },
});
