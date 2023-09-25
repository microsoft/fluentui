import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import {
  CarouselPaddleStylesProps,
  carouselPaddleSlotClassNames,
} from '../../../../components/Carousel/CarouselPaddle';
import { CarouselVariables } from './carouselVariables';
import { getBorderFocusStyles } from '../../getBorderFocusStyles';
import { getIconFillOrOutlineStyles } from '../../getIconFillOrOutlineStyles';
import { paddleIndicatorUrl } from './paddleIndicatorUrl';

import { faster, ultraFast } from '../../animations/durations';
import { pxToRem } from '../../../../utils';

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
      border: 0,
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      verticalAlign: 'middle',
      cursor: 'pointer',
      marginBottom: pxToRem(40),
      outline: 0,
      padding: 0,
      transition: faster,
      zIndex: 1,
      ...(p.hidden && {
        visibility: 'hidden',
      }),
      ...(p.disableClickableNav && {
        cursor: 'default',
      }),
      ':hover': {
        ...getIconFillOrOutlineStyles({ outline: false }),
        [`& .${carouselPaddleSlotClassNames.content}`]: {
          ...getIndicatorStyles(v.paddleColor, p.next, v.paddleIndicatorSize),
        },
        background: v.paddleBackgroundColorHover,
      },

      ':active': {
        transition: ultraFast,
        backgroundColor: v.paddleBackgroundColorActive,
      },

      ':focus': borderFocusStyles[':focus'],
      ':focus-visible': {
        ...borderFocusStyles[':focus-visible'],
      },

      // Overrides for "disabled" buttons
      ...(p.disabled && {
        cursor: 'default',
        color: v.paddleColorDisabled,
        pointerEvents: 'none',
        ':hover': {
          color: v.paddleColorDisabled,
        },

        backgroundColor: v.paddleBackgroundColorDisabled,
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
