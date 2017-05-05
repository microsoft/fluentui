import { IButtonStyles } from './Button.Props';
import { ITheme, mergeStyles, getFocusRule } from '@uifabric/styling';

const noOutline = {
  outline: 0
};

/**
 * Gets the base button styles. Note: because it is a base class to be used with the `mergeRules`
 * helper, it should have values for all class names in the interface. This let `mergeRules` optimize
 * mixing class names together.
 */
export function getStyles(
  theme: ITheme,
  focusInset?: string,
  focusColor?: string): IButtonStyles {

  const iconStyle = mergeStyles({
    margin: '0 4px',
    height: '16px',
    lineHeight: '16px',
    textAlign: 'center',
    verticalAlign: 'middle'
  });

  return {
    root: mergeStyles(
      getFocusRule(theme, focusInset, focusColor),
      theme.fonts.medium,
      {
        // this transparent border converts to the correct colors in HC mode
        boxSizing: 'border-box',
        border: '1px solid transparent',
        userSelect: 'none',
        display: 'inline-block',
        textDecoration: 'none',
        textAlign: 'center',
        cursor: 'pointer',
        verticalAlign: 'top',
        padding: '0 16px'
      }
    ),

    rootEnabled: undefined,

    rootDisabled: mergeStyles({
      backgroundColor: theme.palette.neutralLighter,
      color: theme.palette.neutralTertiary,
      cursor: 'default',
      pointerEvents: 'none',
      ':hover': noOutline,
      ':focus': noOutline
    }),

    flexContainer: mergeStyles({
      display: 'flex',
      height: '100%',
      flexWrap: 'nowrap',
      justifyContent: 'center',
      alignItems: 'center'
    }),

    icon: iconStyle,
    iconEnabled: undefined,
    iconDisabled: undefined,

    menuIcon: iconStyle,
    menuIconEnabled: undefined,
    menuIconDisabled: undefined,

    label: mergeStyles({
      margin: '0 4px',
      lineHeight: '100%'
    }),

    labelEnabled: undefined,
    labelDisabled: undefined,

    description: undefined,
    descriptionEnabled: undefined,
    descriptionDisabled: undefined,

    screenReaderText: mergeStyles({
      position: 'absolute',
      width: '1px',
      height: '1px',
      margin: '-1px',
      padding: 0,
      overflow: 'hidden',
      clip: 'rect(0,0,0,0)',
      border: 0
    })
  };
}
