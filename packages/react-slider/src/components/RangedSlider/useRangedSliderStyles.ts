import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import { useSliderStyles } from '../Slider/useSliderStyles';
import type { RangedSliderState } from './RangedSlider.types';

const useMenuIconStyles = makeStyles({
  small: {
    fontSize: '20px',
    height: '20px',
    width: '20px',
  },
  medium: {
    fontSize: '20px',
    height: '20px',
    width: '20px',
  },
  large: {
    fontSize: '24px',
    height: '24px',
    width: '24px',
  },
});

export const useRangedSliderStyles = (state: RangedSliderState): RangedSliderState => {
  // const menuIconStyles = useMenuIconStyles();

  // state.menuIcon.className = mergeClasses(menuIconStyles[state.size], state.menuIcon.className);

  // useSliderStyles(state);

  return state;
};
