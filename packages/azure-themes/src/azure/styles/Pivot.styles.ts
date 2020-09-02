import { IPivotStyleProps, IPivotStyles } from 'office-ui-fabric-react/lib/Pivot';
import * as StyleConstants from '../Constants';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';

export const PivotStyles = (props: IPivotStyleProps): Partial<IPivotStyles> => {
  const { theme, rootIsTabs, rootIsLarge } = props;
  const { semanticColors } = theme;
  const extendedSemanticColors = semanticColors as IExtendedSemanticColors;

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
        color: semanticColors.buttonText,
        height: 36,
      },
      !rootIsLarge && {
        fontSize: theme.fonts.medium.fontSize,
      },
      !rootIsTabs && {
        selectors: {
          ':hover': {
            backgroundColor: extendedSemanticColors.tabHover,
            border: StyleConstants.borderNone,
            color: semanticColors.bodyText,
            transition: 'background-color .2s ease-out',
          },
          ':active': {
            backgroundColor: semanticColors.listItemBackgroundCheckedHovered,
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
            backgroundColor: semanticColors.listItemBackgroundHovered,
            border: StyleConstants.borderNone,
            borderBottom: `1px solid ${semanticColors.inputBorder}`,
            transition: 'background-color .2s ease-out',
          },
          ':active': {
            backgroundColor: semanticColors.listItemBackgroundHovered,
            border: StyleConstants.borderNone,
            borderBottom: `1px solid ${semanticColors.inputBorder}`,
            transition: 'background-color .2s ease-out',
          },
        },
      },
    ],
    linkIsSelected: [
      !rootIsLarge && {
        fontSize: theme.fonts.medium.fontSize,
        height: 36,
      },
      !rootIsTabs && {
        color: semanticColors.bodyText,
        paddingBottom: '1px',
        selectors: {
          ':hover': {
            backgroundColor: extendedSemanticColors.tabHover,
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
