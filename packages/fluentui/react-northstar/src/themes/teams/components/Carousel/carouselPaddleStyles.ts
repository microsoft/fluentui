import { unstable_createAnimationStyles as createAnimationStyles } from '@fluentui/react-bindings';
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import CarouselPaddle, { CarouselPaddleStylesProps } from '../../../../components/Carousel/CarouselPaddle';
import { CarouselVariables } from './carouselVariables';
import getBorderFocusStyles from '../../getBorderFocusStyles';
import getIconFillOrOutlineStyles from '../../getIconFillOrOutlineStyles';
import paddleIndicatorUrl from './paddleIndicatorUrl';

const getIndicatorStyles = (color: string, next: boolean, size: string): ICSSInJSStyle => {
  return {
    width: size,
    height: size,
    backgroundImage: paddleIndicatorUrl(color, next),
    backgroundRepeat: 'no-repeat',
  };
};

const carouselPaddleStyles: ComponentSlotStylesPrepared<CarouselPaddleStylesProps, CarouselVariables> = {
  root: ({ props: p, variables: v, theme }): ICSSInJSStyle => {
    const { siteVariables } = theme;
    const { borderWidth } = siteVariables;

    const borderFocusStyles = getBorderFocusStyles({
      variables: siteVariables,
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

      ':hover': {
        ...getIconFillOrOutlineStyles({ outline: false }),
        [`& .${CarouselPaddle.slotClassNames.content}`]: {
          ...getIndicatorStyles(v.paddleColorHover, p.next, v.paddleIndicatorSize),
        },
        color: v.paddleColorHover,
        background: v.paddleBackgroundColorHover,
      },

      ':active': {
        ...createAnimationStyles('scaleDownSoft', theme),
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

export default carouselPaddleStyles;
