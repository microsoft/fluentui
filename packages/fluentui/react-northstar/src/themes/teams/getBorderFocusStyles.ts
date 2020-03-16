import { ICSSInJSStyle, SiteVariablesPrepared } from '@fluentui/styles';
import * as React from 'react';

type CSSBorderStyles = Pick<React.CSSProperties, 'borderWidth' | 'borderRadius'>;

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

type BorderPseudoElementStyles = CSSBorderStyles & { borderEdgeValue: string };

const defaultColor = 'transparent';

const getPseudoElementStyles = (args: BorderPseudoElementStyles): ICSSInJSStyle => {
  const { borderEdgeValue, ...styles } = args;

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
const getBorderFocusStyles = (args: BorderFocusStyles): ICSSInJSStyle => {
  const sv = args.variables;
  const {
    borderWidth = sv.borderWidth,
    borderRadius = sv.borderRadius,
    focusInnerBorderColor = sv.focusInnerBorderColor || defaultColor,
    focusOuterBorderColor = sv.focusOuterBorderColor || defaultColor,
    borderPadding,
  } = args;

  const defaultBorderStyles: React.CSSProperties = { borderWidth, borderRadius };

  return {
    ':focus': {
      outline: 0,
    },
    ':focus-visible': {
      borderColor: 'transparent',

      ':before': getPseudoElementStyles({
        zIndex: sv.zIndexes.foreground,
        borderEdgeValue: borderPadding == null ? '0' : `-${borderPadding}`,
        borderColor: focusInnerBorderColor,
        ...defaultBorderStyles,
      }),

      ':after': getPseudoElementStyles({
        zIndex: sv.zIndexes.foreground,
        borderEdgeValue: borderPadding == null ? `-${borderWidth}` : `calc(0px - ${borderPadding} - ${borderWidth})`,
        borderColor: focusOuterBorderColor,
        ...defaultBorderStyles,
      }),
    },
  };
};

export default getBorderFocusStyles;
