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
        color: semanticColors.buttonText,
        height: 36,
        paddingLeft: 0,
        paddingRight: 0,
        marginRight: 24,
        selectors: {
          '.ms-Pivot-text': {
            padding: '0 8px',
          },
        },
      },
      !rootIsLarge && {
        fontSize: theme.fonts.large.fontSize,
      },
      !rootIsTabs && {
        selectors: {
          ':hover': {
            backgroundColor: extendedSemanticColors.listItemBackgroundHovered,
            border: StyleConstants.borderNone,
            color: semanticColors.bodyText,
            transition: 'background-color .2s ease-out',
          },
          ':active': {
            backgroundColor: semanticColors.listItemBackgroundSelected,
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
        marginRight: StyleConstants.inputControlHeight,
        selectors: {
          '.ms-Fabric--isFocusVisible': {
            outline: `${StyleConstants.borderWidth} solid ${semanticColors.bodyText} !important`,
          },
          '.ms-Pivot-text': {
            backgroundColor: 'none',
            padding: '0 8px',
          },
          ':active': {
            backgroundColor: semanticColors.buttonBackgroundHovered,
          },
          '.ms-Pivot-text:hover': {
            backgroundColor: extendedSemanticColors.listItemBackgroundHovered,
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
            color: extendedSemanticColors.bodyTextHovered,
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
        color: semanticColors.bodyText,
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
