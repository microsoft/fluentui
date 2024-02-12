import { IPivotStyleProps, IPivotStyles } from '@fluentui/react/lib/Pivot';
import * as StyleConstants from '../Constants';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';

export const PivotStyles = (props: IPivotStyleProps): Partial<IPivotStyles> => {
  const { theme, linkFormat, linkSize } = props;
  const { semanticColors } = theme;
  const extendedSemanticColors = semanticColors as IExtendedSemanticColors;
  const rootIsTabs = linkFormat === 'tabs';
  const rootIsLarge = linkSize === 'large';

  return {
    root: [
      {
        borderBottomColor: semanticColors.inputBorder,
        borderBottomStyle: StyleConstants.borderSolid,
        borderBottomWidth: StyleConstants.borderWidth,
        borderBottom: 0,
      },
      !rootIsTabs && {
        selectors: {
          '.is-selected::before': {
            borderColor: semanticColors.bodyText,
          },
        },
      },
      rootIsTabs && {
        selectors: {
          // remove bottom highlight
          '.is-selected::before': {
            border: StyleConstants.borderNone,
          },
          '.ms-Pivot-link:hover': {
            color: semanticColors.bodyText,
          },
          '.ms-Pivot-link:active': {
            color: semanticColors.bodyText,
          },
          '.ms-Pivot-link:focus': {
            color: semanticColors.bodyText,
          },
        },
      },
    ],
    link: [
      {
        color: semanticColors.bodyText,
        height: 36,
        paddingLeft: 0,
        paddingRight: 0,
        marginRight: 24,
      },
      !rootIsLarge && {
        fontSize: theme.fonts.large.fontSize,
      },
      !rootIsTabs && {
        selectors: {
          ':hover': {
            backgroundColor: extendedSemanticColors.buttonBackgroundCheckedHovered,
            border: StyleConstants.borderNone,
            color: semanticColors.buttonTextHovered,
            transition: 'background-color .2s ease-out',
          },
          ':active': {
            backgroundColor: semanticColors.buttonBackgroundChecked,
            border: StyleConstants.borderNone,
            color: semanticColors.bodyText,
          },
        },
      },
      rootIsTabs && {
        backgroundColor: semanticColors.bodyBackground,
        borderBottom: `1px solid ${semanticColors.inputBorder}`,
        color: semanticColors.buttonText,
        marginBottom: '-1px',
        selectors: {
          ':hover': {
            backgroundColor: semanticColors.bodyBackground,
            border: StyleConstants.borderNone,
            borderBottom: `1px solid ${semanticColors.inputBorder}`,
            transition: 'background-color .2s ease-out',
          },
          ':active': {
            backgroundColor: semanticColors.bodyBackground,
            border: StyleConstants.borderNone,
            borderBottom: `1px solid ${semanticColors.inputBorder}`,
            transition: 'background-color .2s ease-out',
          },
        },
      },
    ],
    linkIsSelected: [
      {
        marginRight: 24,
        selectors: {
          '.ms-Fabric--isFocusVisible': {
            outline: '1px solid black !important',
          },
          ':active': {
            backgroundColor: semanticColors.bodyBackground,
          },
          ':focus': {
            border: 0,
          },
        },
      },
      !rootIsLarge && {
        fontSize: theme.fonts.large.fontSize,
        height: 36,
        paddingLeft: 0,
        paddingRight: 0,
        // the selected underline
        '::before': {
          left: 0,
          right: 0,
        },
      },
      !rootIsTabs && {
        color: semanticColors.bodyText,
        paddingBottom: '1px',
        selectors: {
          ':hover': {
            backgroundColor: extendedSemanticColors.bodyBackground,
            color: extendedSemanticColors.bodyText,
            border: StyleConstants.borderNone,
          },
          ':active': {
            border: StyleConstants.borderNone,
          },
        },
      },
      rootIsTabs && {
        backgroundColor: semanticColors.bodyBackground,
        borderColor: semanticColors.inputBorder,
        borderStyle: StyleConstants.borderSolid,
        borderWidth: StyleConstants.borderWidth,
        borderBottomColor: semanticColors.bodyDivider,
        marginBottom: '-1px',
        selectors: {
          ':hover': {
            backgroundColor: semanticColors.bodyBackground,
            borderColor: semanticColors.inputBorder,
            borderBottomColor: semanticColors.bodyDivider,
          },
          ':active': {
            backgroundColor: semanticColors.bodyBackground,
            borderColor: semanticColors.inputBorder,
            borderBottomColor: semanticColors.bodyDivider,
          },
        },
      },
    ],
  };
};
