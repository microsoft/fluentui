import { ICSSInJSStyle } from '@fluentui/styles';
import type { BasePlacement as PopperJsBasePlacement } from '@popperjs/core';

type GetContainerStylesOptions = {
  padding: string;
  placement: PopperJsBasePlacement;
};

type GetPointerStylesOptions = {
  backgroundColor: string;
  borderColor: string;
  borderSize: string;

  gap: string;
  padding: string;
  height: string;
  width: string;

  placement: PopperJsBasePlacement;
  rtl: boolean;
  svg?: string;
};

export const getContainerStyles = (options: GetContainerStylesOptions): ICSSInJSStyle => {
  const { padding, placement } = options;

  return {
    ...(placement === 'bottom' && {
      paddingTop: padding,
    }),
    ...(placement === 'top' && {
      paddingBottom: padding,
    }),
    ...(placement === 'left' && {
      paddingRight: padding,
    }),
    ...(placement === 'right' && {
      paddingLeft: padding,
    }),
  };
};

export const getPointerStyles = (options: GetPointerStylesOptions): ICSSInJSStyle => {
  const { backgroundColor, borderColor, rtl, borderSize, gap, height, padding, placement, svg, width } = options;

  return {
    display: 'block',
    position: 'absolute',
    zIndex: 1,

    ...((placement === 'bottom' || placement === 'top') && {
      paddingLeft: gap,
      paddingRight: gap,

      height,
      width: `calc(${width} + (${gap} * 2))`,
    }),
    ...((placement === 'left' || placement === 'right') && {
      paddingBottom: gap,
      paddingTop: gap,

      height: `calc(${width} + (${gap} * 2))`,
      width: height,
    }),

    ...(placement === 'bottom' && {
      top: `calc(${padding} - ${height} + (${borderSize} * 2))`,
    }),
    ...(placement === 'top' && {
      bottom: `calc(${padding} - ${height} + ${borderSize})`,
    }),

    ...(placement === 'left' && {
      right: `calc(${padding} - ${height} + ${borderSize})`,
    }),
    ...(placement === 'right' && {
      left: `calc(${padding} - ${height} + ${borderSize})`,
    }),

    '::before': {
      content: '" "',
      display: 'block',
      height,
      position: 'relative',
      transformOrigin: 'center top',

      borderBottomColor: 'transparent',
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderTopColor: 'transparent',
      borderStyle: 'solid',

      left: 0,
      top: 0,

      ...(placement === 'bottom' && {
        borderBottomColor: backgroundColor,
        borderWidth: `0 ${height} ${height}`,
      }),
      ...(placement === 'top' && {
        borderTopColor: backgroundColor,
        borderWidth: `${height} ${height} 0`,

        top: `calc(${borderSize} * -1)`,
      }),
      ...(placement === 'left' && {
        borderLeftColor: backgroundColor,
        borderWidth: `${height} 0 ${height} ${height}`,
      }),
      ...(placement === 'right' && {
        borderRightColor: backgroundColor,
        borderWidth: `${height} ${height} ${height} 0`,
      }),
    },

    '::after': {
      content: '" "',
      display: 'block',
      height,
      position: 'relative',
      transformOrigin: 'center top',
      zIndex: -1,

      borderBottomColor: 'transparent',
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderTopColor: 'transparent',
      borderStyle: 'solid',

      ...(placement === 'bottom' && {
        borderBottomColor: borderColor,
        borderWidth: `0 ${height} ${height}`,

        left: 0,
        bottom: `calc(${height} + 1px)`,
      }),
      ...(placement === 'top' && {
        borderTopColor: borderColor,
        borderWidth: `${height} ${height} 0`,

        left: 0,
        bottom: height,
      }),
      ...(placement === 'left' && {
        borderLeftColor: borderColor,
        borderWidth: `${height} 0 ${height} ${height}`,

        left: borderSize,
        bottom: width,
      }),
      ...(placement === 'right' && {
        borderRightColor: borderColor,
        borderWidth: `${height} ${height} ${height} 0`,

        right: borderSize,
        bottom: width,
      }),
    },

    ...(svg && {
      // :before & :after are used to draw CSS triangles, not valid for SVG
      '::before': {
        content: '" "',
        backgroundImage: svg,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        display: 'block',
        position: 'relative',

        ...(placement === 'bottom' && {
          height: `calc(${width} + (${gap} * 2))`,
          width: height,

          left: gap,
          bottom: `calc(${width} - ${height} + ${borderSize})`,
          transform: 'rotate(90deg) /* @noflip */',
        }),
        ...(placement === 'top' && {
          height: `calc(${width} + (${gap} * 2))`,
          width: height,

          left: gap,
          bottom: `calc(${gap} + ${height} - ${borderSize})`,
          transform: 'rotate(-90deg) /* @noflip */',
        }),
        ...(placement === 'left' && {
          height: width,
          width: height,

          left: 0,
          transform: rtl ? 'rotate(0) /* @noflip */' : 'rotate(180deg) /* @noflip */',
        }),
        ...(placement === 'right' && {
          height: width,
          width: height,

          right: 0,
          transform: rtl ? 'rotate(180deg) /* @noflip */' : 'rotate(0) /* @noflip */',
        }),
      },
      '::after': undefined,
    }),
  };
};
