import { ICSSInJSStyle, SiteVariablesPrepared } from '@fluentui/styles';
import * as React from 'react';

type CSSBorderStyles = Pick<ICSSInJSStyle, 'borderWidth' | 'borderRadius'>;

type BorderFocusStyles = CSSBorderStyles & {
  variables?:
    | SiteVariablesPrepared
    | {
        borderWidth: string;
        borderRadius: string;
        focusInnerBorderColor: string;
        focusOuterBorderColor: string;

        zIndexes: { foreground: string };
      };
  focusInnerBorderColor?: string;
  focusOuterBorderColor?: string;
  borderPadding?: React.CSSProperties['padding'];
};

const defaultColor = 'transparent';

const getPseudoElementStyles = (borderEdgeValue: BorderEdgeValue, styles: ICSSInJSStyle): ICSSInJSStyle => {
  return {
    content: '""',
    position: 'absolute',
    borderStyle: 'solid',
    pointerEvents: 'none',

    top: borderEdgeValue.top,
    right: borderEdgeValue.right,
    bottom: borderEdgeValue.bottom,
    left: borderEdgeValue.left,

    ...styles,
  };
};
type BorderEdgeValue = {
  top: string;
  right: string;
  bottom: string;
  left: string;
};
const getBoderEdgeValues = (top: string, right: string, bottom: string, left: string) => {
  return { top, right, bottom, left };
};

/**
 * Returns style object that can be used for styling components on focus state.
 * NOTE: the element where this is used needs to have relative positioning so that the
 * pseudo elements created on focus can be properly positioned.
 */
export const getBorderFocusStyles = (args: BorderFocusStyles): ICSSInJSStyle => {
  const sv = args.variables;
  const {
    borderWidth = sv.borderWidth,
    borderRadius = sv.borderRadius,
    focusInnerBorderColor = sv.focusInnerBorderColor || defaultColor,
    focusOuterBorderColor = sv.focusOuterBorderColor || defaultColor,
    borderPadding,
  } = args;

  const borderPaddingValues = borderPadding?.toString().split(' ');
  const [top = borderPadding, right = borderPadding, bottom = borderPadding, left = borderPadding] = [
    ...borderPaddingValues,
  ];
  const afterBorderEdgeValue =
    borderPadding == null
      ? getBoderEdgeValues(`-${borderWidth}`, `-${borderWidth}`, `-${borderWidth}`, `-${borderWidth}`)
      : getBoderEdgeValues(
          `calc(0px - ${top} - ${borderWidth})`,
          `calc(0px - ${right} - ${borderWidth})`,
          `calc(0px - ${bottom} - ${borderWidth})`,
          `calc(0px - ${left} - ${borderWidth})`,
        );

  const beforeBorderEdgeValue =
    borderPadding == null
      ? getBoderEdgeValues('0', '0', '0', '0')
      : getBoderEdgeValues(`-${top}`, `-${right}`, `-${bottom}`, `-${left}`);

  return {
    ':focus': {
      outline: 'none',
    },
    ':focus-visible': {
      borderColor: 'transparent',

      ':before': getPseudoElementStyles(beforeBorderEdgeValue, {
        zIndex: sv.zIndexes.foreground,
        borderColor: focusInnerBorderColor,
        borderWidth,
        borderRadius,
      }),

      ':after': getPseudoElementStyles(afterBorderEdgeValue, {
        zIndex: sv.zIndexes.foreground,
        borderColor: focusOuterBorderColor,
        borderWidth,
        borderRadius,
      }),
    },
  };
};
