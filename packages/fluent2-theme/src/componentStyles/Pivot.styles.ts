import type { IPivotStyleProps, IPivotStyles, IStyleFunctionOrObject } from '@fluentui/react';

export function getPivotStyles(props: IPivotStyleProps): IStyleFunctionOrObject<IPivotStyleProps, IPivotStyles> {
  const { theme } = props;
  const { effects, semanticColors } = theme;

  return {
    link: {
      backgroundColor: 'transparent',
      border: '2px solid transparent',
      borderRadius: effects.roundedCorner4,
      height: '44px',
      lineHeight: '20px',
      marginRight: 0,
      padding: '12px',
      '&:hover::before': {
        borderRadius: effects.roundedCorner4,
        height: '3px',
        // backgroundColor: rootIsTabs ? 'transparent' : palette.neutralQuaternary,
      },
      '&:hover': {
        '.ms-Pivot-icon': {
          //   color: rootIsTabs ? semanticColors.primaryButtonText : palette.themePrimary,
        },
      },
      '.ms-Fabric--isFocusVisible &:focus': {
        border: `2px solid ${semanticColors.focusBorder}`,
        borderRadius: effects.roundedCorner4,
        inset: 0,
        outline: 'none',
      },
    },
    icon: {
      height: '14px',
      width: '14px',
    },
    linkIsSelected: {
      border: '2px solid transparent',
      borderRadius: effects.roundedCorner4,
      height: '44px',
      lineHeight: '20px',
      marginRight: 0,
      padding: '12px',
      '&::before': {
        borderRadius: effects.roundedCorner4,
        height: '3px',
      },
      '.ms-Fabric--isFocusVisible &:focus': {
        border: `2px solid ${semanticColors.focusBorder}`,
        borderRadius: effects.roundedCorner4,
        inset: 0,
        outline: 'none',
      },
      '.ms-Pivot-icon': {
        // color: rootIsTabs ? semanticColors.primaryButtonText : palette.themePrimary,
      },
    },
  };
}
