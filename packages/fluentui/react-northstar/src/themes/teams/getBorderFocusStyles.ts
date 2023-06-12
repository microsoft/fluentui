import { ICSSInJSStyle, SiteVariablesPrepared } from '@fluentui/styles';
import * as React from 'react';

type CSSBorderStyles = Pick<React.CSSProperties, 'borderWidth' | 'borderRadius'>;
type BorderPadding = Record<'top' | 'bottom' | 'left' | 'right', string>;
type BorderFocusStyles = CSSBorderStyles & {
  variables?:
    | SiteVariablesPrepared
    | {
        borderWidth: string;
        borderRadius: string;
        focusBorderRadius?: string;
        focusInnerBorderColor: string;
        focusOuterBorderColor: string;
        focusInnerBorderWidth?: string;
        focusOuterBorderWidth?: string;
        zIndexes: { foreground: string };
      };
  focusBorderRadius?: string;
  focusInnerBorderColor?: string;
  focusOuterBorderColor?: string;
  focusInnerBorderWidth?: string;
  focusOuterBorderWidth?: string;
  borderPadding?: string | BorderPadding;
  zIndex?: string;
};
const defaultColor = 'transparent';
/**
 * Returns style object that can be used for styling components on focus state.
 * NOTE: the element where this is used needs to have relative positioning so that the
 * pseudo elements created on focus can be properly positioned.
 */
export const getBorderFocusStyles = (args: BorderFocusStyles): Record<':focus' | ':focus-visible', ICSSInJSStyle> => {
  const sv = args.variables;
  const {
    borderRadius = sv.focusBorderRadius || sv.borderRadius,
    focusInnerBorderColor = sv.focusInnerBorderColor || defaultColor,
    focusOuterBorderColor = sv.focusOuterBorderColor || defaultColor,
    borderPadding,
    focusInnerBorderWidth = sv.focusInnerBorderWidth || sv.borderWidth,
    focusOuterBorderWidth = sv.focusOuterBorderWidth || sv.borderWidth,
    zIndex = sv.zIndexes.foreground,
  } = args;
  const defaultPreudoStyles: React.CSSProperties = {
    content: '""',
    position: 'absolute',
    borderStyle: 'solid',
    pointerEvents: 'none',
    borderRadius,
  };
  const borderPaddingTop = (borderPadding as BorderPadding)?.top || borderPadding;
  const borderPaddingBottom = (borderPadding as BorderPadding)?.bottom || borderPadding;
  const borderPaddingLeft = (borderPadding as BorderPadding)?.left || borderPadding;
  const borderPaddingRight = (borderPadding as BorderPadding)?.right || borderPadding;
  return {
    ':focus': {
      outline: 'none',
    },
    ':focus-visible': {
      borderColor: 'transparent',
      ':before': {
        ...defaultPreudoStyles,
        borderWidth: focusInnerBorderWidth,
        zIndex,
        borderColor: focusInnerBorderColor,
        top: borderPadding == null ? '0' : `-${borderPaddingTop}`,
        bottom: borderPadding == null ? '0' : `-${borderPaddingBottom}`,
        left: borderPadding == null ? '0' : `-${borderPaddingLeft}`,
        right: borderPadding == null ? '0' : `-${borderPaddingRight}`,
      },
      ':after': {
        ...defaultPreudoStyles,
        borderWidth: focusOuterBorderWidth,
        zIndex,
        borderColor: focusOuterBorderColor,
        top:
          borderPadding == null
            ? `-${focusInnerBorderWidth}`
            : `calc(0px - ${borderPaddingTop} - ${focusInnerBorderWidth})`,
        bottom:
          borderPadding == null
            ? `-${focusInnerBorderWidth}`
            : `calc(0px - ${borderPaddingBottom} - ${focusInnerBorderWidth})`,
        left:
          borderPadding == null
            ? `-${focusInnerBorderWidth}`
            : `calc(0px - ${borderPaddingLeft} - ${focusInnerBorderWidth})`,
        right:
          borderPadding == null
            ? `-${focusInnerBorderWidth}`
            : `calc(0px - ${borderPaddingRight} - ${focusInnerBorderWidth})`,
      },
      '@media(forced-colors: active)': {
        ':before': {
          borderColor: 'Highlight',
        },
        ':after': {
          borderColor: 'Highlight',
        },
      },
    },
  };
};
