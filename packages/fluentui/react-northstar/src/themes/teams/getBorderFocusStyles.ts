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

const getPseudoElementStyles = (borderEdgeValue: string, styles: ICSSInJSStyle): ICSSInJSStyle => {
  return {
    content: '""',
    position: 'absolute',
    borderStyle: 'solid',
    pointerEvents: 'none',

    top: borderEdgeValue,
    right: borderEdgeValue,
    bottom: borderEdgeValue,
    left: borderEdgeValue,

    ...styles,
  };
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

  const afterBorderEdgeValue =
    borderPadding == null ? `-${borderWidth}` : `calc(0px - ${borderPadding} - ${borderWidth})`;
  const beforeBorderEdgeValue = borderPadding == null ? '0' : `-${borderPadding}`;

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
