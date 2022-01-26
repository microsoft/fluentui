import { ICSSInJSStyle, ComponentSlotStylesPrepared } from '@fluentui/styles';
import { getBorderFocusStyles } from '../../getBorderFocusStyles';
import { SplitButtonStylesProps } from '../../../../components/SplitButton/SplitButton';
import { SplitButtonVariables } from './splitButtonVariables';

export const splitButtonStyles: ComponentSlotStylesPrepared<SplitButtonStylesProps, SplitButtonVariables> = {
  menuButton: ({ props: p, variables: v }): ICSSInJSStyle => ({
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRightWidth: 0,
    padding: v.padding,
    minWidth: v.minWidth,
    ...(p.size === 'small' && {
      height: v.smallDimension,
      padding: v.smallPadding,
      minWidth: v.smallMinWidth,
    }),

    ...((p.flat || p.size === 'small') && {
      boxShadow: 'none',
    }),

    ':focus-visible': {
      borderRightWidth: 0,

      ':before': {
        borderRightWidth: 0,
      },

      ':after': {
        borderRightWidth: 0,
      },
    },

    ':active': {
      animationName: 'unset',
      animationDuration: 'unset',
    },
  }),

  root: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => {
    const borderFocusStyles = getBorderFocusStyles({
      variables: {
        borderRadius: v.focusBorderRadius,
        borderWidth: v.focusBorderWidth,
        focusInnerBorderColor: v.focusInnerBorderColor,
        focusOuterBorderColor: v.focusOuterBorderColor,
        zIndexes: { foreground: v.focusBorderZIndex },
      },
    });

    return {
      borderRadius: v.borderRadius,
      position: 'relative',
      whiteSpace: 'nowrap',
      display: 'inline-block',
      width: 'fit-content',

      ':focus-within': {
        boxShadow: 'none',
        ...(p.isFromKeyboard && {
          // make sure focus is coming from keyboard before applying the focus styles
          // otherwise focus state is applied only to the button and not the toggle
          ...borderFocusStyles[':focus-visible'],
        }),
      },
    };
  },
};
