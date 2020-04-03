import { ICSSInJSStyle } from '@fluentui/styles';
import Popper from 'popper.js';

type GetContainerStylesOptions = {
  placement: Popper.Position;
  margin: string;
};

type GetPointerStylesOptions = {
  backgroundColor: string;
  borderColor: string;
  borderSize: string;

  gap: string;
  height: string;
  width: string;

  placement: Popper.Position;
  rtl: boolean;
  svg?: string;
};

export const getContainerStyles = (options: GetContainerStylesOptions): ICSSInJSStyle => {
  const { placement, margin } = options;

  return {
    // TODO: Popper v2, replace margins with paddings
    ...(placement === 'bottom' && {
      marginTop: margin,
    }),
    ...(placement === 'top' && {
      marginBottom: margin,
    }),
    ...(placement === 'left' && {
      marginRight: margin,
    }),
    ...(placement === 'right' && {
      marginLeft: margin,
    }),
  };
};

export const getPointerStyles = (options: GetPointerStylesOptions): ICSSInJSStyle => {
  const { backgroundColor, borderColor, borderSize, gap, height, placement, rtl, svg, width } = options;

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
      // TODO: use in Popper v2
      // top: `calc(${height} + (${borderSize} * 2))`,
      top: `calc((${height} * -1) + (${borderSize} * 2))`,
    }),
    ...(placement === 'top' && {
      // bottom: `calc(${height} + ${borderSize})`,
      bottom: `calc((${height} * -1) + ${borderSize})`,
    }),

    ...(placement === 'left' && {
      // right: `calc(${height} + ${borderSize})`,
      right: `calc((${height} * -1) + (${borderSize} * 2))`,
    }),
    ...(placement === 'right' && {
      // left: `calc(${height} + ${borderSize})`,
      left: `calc((${height} * -1) + (${borderSize} * 2))`,
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

    // :before & :after are used to draw CSS triangles, not valid for SVG
    ...(svg && {
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
          // TODO: use in Popper v2
          // bottom: `calc(${width} + ${borderSize})`,
          bottom: `calc((${gap} * 2) + ${borderSize})`,
          transform: `rotate(${rtl ? -90 : 90}deg)`,
        }),
        ...(placement === 'top' && {
          height: `calc(${width} + (${gap} * 2))`,
          width: height,

          left: gap,
          // bottom: `calc(${gap} - ${borderSize})`,
          bottom: `calc(${gap} * 2)`,
          transform: `rotate(${rtl ? 90 : -90}deg)`,
        }),
        ...(placement === 'left' && {
          height: width,
          width: height,

          // left: height,
          left: borderSize,
          transform: `rotate(${rtl ? 0 : 180}deg)`,
        }),
        ...(placement === 'right' && {
          height: width,
          width: height,

          // right: height,
          right: borderSize,
          transform: `rotate(${rtl ? 180 : 0}deg)`,
        }),
      },
      '::after': undefined,
    }),
  };
};
