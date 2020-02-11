import { IResolvedTokens } from '@fluentui/react-theming';
import { ISliderTokens } from './Slider.tokens';

const styles = (t: IResolvedTokens<ISliderTokens>) => ({
  rootDisabled: {},
  rootVertical: {},
  rootFocused: {},

  root: {
    position: 'relative',
    height: t.size,

    '&$rootVertical': {
      width: t.size,
      height: '100%',
    },
  },

  rail: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    width: 'auto',
    height: t.railSize,
    borderRadius: t.railBorderRadius,
    backgroundColor: t.railColor,

    '$rootVertical &': {
      left: '50%',
      right: 'auto',
      top: 0,
      bottom: 0,
      transform: 'translateX(-50%)',
      width: t.railSize,
      height: '100%',
    },

    '$root:hover &, $rootFocused &': {
      backgroundColor: t.railColorHovered,
    },

    '$root:active &': {
      backgroundColor: t.railColorPressed,
    },

    '$root$rootDisabled &': {
      backgroundColor: t.railColorDisabled,
    },
  },

  track: {
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    height: t.trackSize,
    backgroundColor: t.trackColor,
    borderRadius: t.trackBorderRadius,

    '$rootVertical &': {
      left: '50%',
      top: 'auto',
      bottom: 0,
      transform: 'translateX(-50%)',
      width: t.trackSize,
    },

    '$root:hover &, $rootFocused &': {
      backgroundColor: t.trackColorHovered,
    },

    '$root:active &': {
      backgroundColor: t.trackColorPressed,
    },

    '$root$rootDisabled &': {
      backgroundColor: t.trackColorDisabled,
    },
  },

  thumb: {
    position: 'absolute',
    transform: 'translateX(-50%)',
    boxSizing: 'border-box',
    width: t.size,
    height: t.size,
    outline: 'none',

    '$rootVertical &': {
      transform: 'translateY(50%)',
    },

    '&:after': {
      content: '""',
      position: 'absolute',
      height: t.thumbSize,
      width: t.thumbSize,
      borderRadius: t.thumbBorderRadius,
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: t.thumbColor,
      borderWidth: t.thumbBorderWidth,
      borderStyle: 'solid',
      borderColor: t.thumbBorderColor,
    },

    '&:focus': {
      borderRadius: 2,
      border: '1px solid black',
    },

    '$root:active &:after': {
      width: t.thumbSizePressed,
      height: t.thumbSizePressed,
    },

    '$rootDisabled &:after': {
      borderColor: t.thumbBorderColorDisabled,
    },
  },
});

export default styles;
