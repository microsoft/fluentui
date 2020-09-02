import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import {
  CarouselPaddleStylesProps,
  carouselPaddleSlotClassNames,
} from '../../../../components/Carousel/CarouselPaddle';
import { CarouselVariables } from './carouselVariables';
import { getBorderFocusStyles } from '../../getBorderFocusStyles';
import { getIconFillOrOutlineStyles } from '../../getIconFillOrOutlineStyles';
import { paddleIndicatorUrl } from './paddleIndicatorUrl';
import { pxToRem } from '../../../../utils';
import { faster, ultraFast } from '../../animations/durations';

const getIndicatorStyles = (color: string, next: boolean, size: string): ICSSInJSStyle => {
  return {
    width: size,
    height: size,
    backgroundImage: paddleIndicatorUrl(color, next),
    backgroundRepeat: 'no-repeat',
  };
};

export const carouselPaddleStyles: ComponentSlotStylesPrepared<CarouselPaddleStylesProps, CarouselVariables> = {
  root: ({ props: p, variables: v, theme }): ICSSInJSStyle => {
    const { siteVariables } = theme;
    const { borderWidth } = siteVariables;

    const borderFocusStyles = getBorderFocusStyles({
      variables: {
        borderRadius: v.focusBorderRadius,
        borderWidth: v.focusBorderWidth,
        focusInnerBorderColor: v.focusInnerBorderColor,
        focusOuterBorderColor: v.focusOuterBorderColor,
        zIndexes: { foreground: v.focusBorderZIndex },
      },
      borderPadding: borderWidth,
    });

    return {
      height: v.paddleHeight,
      minWidth: v.paddleHeight,
      color: v.paddleColor,
      backgroundColor: v.paddleBackgroundColor,
      borderRadius: v.paddleBorderRadius,
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      verticalAlign: 'middle',
      cursor: 'pointer',

      outline: 0,
      padding: 0,
      borderWidth,
      borderStyle: 'solid',
      borderColor: v.paddleBorderColor,
      boxShadow: v.paddleBoxShadow,
      transition: faster,

      ...(p.next && {
        height: pxToRem(v.paddleNextSize),
        top: pxToRem(-v.height / 2 - v.paddleNextSize / 2),
        left: pxToRem(v.width - 2 * v.paddleNextSize),
      }),

      ...(p.previous && {
        height: pxToRem(v.paddlePreviousSize),
        top: pxToRem(-v.height / 2 - v.paddlePreviousSize / 2),
      }),

      ...(p.hidden && {
        visibility: 'hidden',
      }),

      ':hover': {
        ...getIconFillOrOutlineStyles({ outline: false }),
        [`& .${carouselPaddleSlotClassNames.content}`]: {
          ...getIndicatorStyles(v.paddleColorHover, p.next, v.paddleIndicatorSize),
        },
        color: v.paddleColorHover,
        background: v.paddleBackgroundColorHover,
      },

      ':active': {
        transition: ultraFast,
        color: v.paddleColorActive,
        backgroundColor: v.paddleBackgroundColorActive,
        borderColor: v.paddleBorderColorActive,
        boxShadow: 'none',
      },

      ':focus': borderFocusStyles[':focus'],
      ':focus-visible': {
        backgroundColor: v.paddleBackgroundColorFocus,
        borderColor: v.paddleBorderColorFocus,
        color: v.paddleColorFocus,
        borderWidth,

        ':hover': {
          borderColor: v.paddleBorderColorHover,
        },
      },

      // Overrides for "disabled" buttons
      ...(p.disabled && {
        cursor: 'default',
        color: v.paddleColorDisabled,
        boxShadow: 'none',
        pointerEvents: 'none',
        ':hover': {
          color: v.paddleColorDisabled,
        },

        backgroundColor: v.paddleBackgroundColorDisabled,
        borderColor: v.paddleBorderColorDisabled,
      }),
    };
  },
  content: ({ props: p, variables: v, rtl }) => ({
    ...getIndicatorStyles(p.disabled ? v.paddleColorDisabled : v.paddleColor, p.next, v.paddleIndicatorSize),
    ...(rtl && {
      transform: 'scaleX(-1)',
    }),
  }),
};
