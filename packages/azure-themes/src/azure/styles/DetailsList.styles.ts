import { ICheckStyleProps, ICheckStyles } from '@fluentui/react/lib/Check';
import {
  IDetailsRowStyleProps,
  IDetailsRowStyles,
  IDetailsListStyleProps,
  IDetailsListStyles,
} from '@fluentui/react/lib/DetailsList';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';
import { FontSizes } from '../AzureType';
import * as StyleConstants from '../Constants';

export const CheckStyles = (props: ICheckStyleProps): Partial<ICheckStyles> => {
  const { theme, checked } = props;
  const semanticColors = theme.semanticColors as IExtendedSemanticColors;

  return {
    circle: [
      {
        fontSize: 0,
        paddingTop: 1,
        paddingLeft: 1,
        borderRadius: 2,
        color: semanticColors.listBackground,
        backgroundColor: semanticColors.listBackground,
        borderColor: semanticColors.ButtonBorderFocus,
        borderWidth: StyleConstants.borderWidth,
        borderStyle: StyleConstants.borderSolid,
      },
    ],
    check: [
      {
        left: 2.5,
        top: 1.5,
      },
      checked && {
        color: semanticColors.inputText,
      },
      !checked && {
        color: semanticColors.listBackground,
      },
    ],
  };
};

export const DetailsListStyles = (props: IDetailsListStyleProps): Partial<IDetailsListStyles> => {
  const { theme } = props;
  const { semanticColors } = theme;
  const extendedSemanticColors = semanticColors as IExtendedSemanticColors;

  return {
    root: {
      borderTop: StyleConstants.borderNone,
      selectors: {
        '.ms-DetailsRow-check': {
          opacity: 1,
        },
      },
    },
    headerWrapper: {
      selectors: {
        '.ms-DetailsHeader': {
          borderColor: extendedSemanticColors.rowBorder,
          borderTop: StyleConstants.borderNone,
          selectors: {
            '.ms-DetailsHeader-cellTitle': {
              backgroundColor: semanticColors.listBackground,
              borderRightWidth: StyleConstants.borderWidth,
              borderRightStyle: StyleConstants.borderSolid,
              borderRightColor: semanticColors.listBackground,
              fontSize: FontSizes.size10,
              fontWeight: 700,
            },
            ':hover .ms-DetailsHeader-cellTitle': {
              borderRightWidth: StyleConstants.borderWidth,
              borderRightStyle: StyleConstants.borderSolid,
              borderRightColor: semanticColors.variantBorder,
            },
            '.is-checked': {
              '.ms-Check-circle': {
                backgroundColor: extendedSemanticColors.checkboxBackgroundChecked,
                borderColor: extendedSemanticColors.checkBoxCheck,
              },
              '.ms-Check-check': {
                color: extendedSemanticColors.checkBoxCheck,
              },
            },
            '.ms-DetailsHeader-check:hover': {
              '.ms-Check-check': {
                color: extendedSemanticColors.checkBoxCheckHover,
              },
              '.is-checked': {
                '.ms-Check-circle': {
                  backgroundColor: extendedSemanticColors.checkboxBackgroundHovered,
                },
                '.ms-Check-check': {
                  color: extendedSemanticColors.checkBoxCheck,
                },
              },
            },
          },
        },
      },
    },
  };
};

export const DetailsRowStyles = (props: IDetailsRowStyleProps): Partial<IDetailsRowStyles> => {
  const { theme, isSelected } = props;
  const { semanticColors } = theme;
  const extendedSemanticColors = semanticColors as IExtendedSemanticColors;

  return {
    root: [
      {
        borderColor: extendedSemanticColors.rowBorder,
        color: semanticColors.listText,
        fontSize: theme.fonts.medium.fontSize,
        borderBottom: `1px solid ${extendedSemanticColors.listItemBackgroundSelected} !important`,
        selectors: {
          '.ms-DetailsRow-check': {
            opacity: 1,
          },
        },
      },
      !isSelected && [
        {
          background: semanticColors.listBackground,
          selectors: {
            ':hover': {
              backgroundColor: semanticColors.listItemBackgroundHovered,
              selectors: {
                '.ms-Check-check': {
                  color: extendedSemanticColors.checkBoxCheckHover,
                },
                '.ms-Link': {
                  color: extendedSemanticColors.listLinkRowHovered,
                },
                '.ms-Link:hover': {
                  color: extendedSemanticColors.listLinkHovered,
                },
              },
            },
            ':after': {
              border: `1px solid ${extendedSemanticColors.listItemBackgroundSelected} !important`,
            },
            ':focus': {
              backgroundColor: extendedSemanticColors.rowFocus,
            },
          },
        },
      ],
      isSelected && [
        {
          backgroundColor: extendedSemanticColors.listItemBackgroundSelected,
          textDecoration: extendedSemanticColors.listUnderline,
          fontWeight: StyleConstants.fontWeightRegular,
          selectors: {
            '.ms-DetailsRow-cell': {
              fontWeight: StyleConstants.fontWeightRegular,
            },
            '.ms-Check-circle': {
              backgroundColor: extendedSemanticColors.checkboxBackgroundChecked,
              borderColor: extendedSemanticColors.checkBoxCheck,
            },
            '.ms-Check-check': {
              color: extendedSemanticColors.checkBoxCheck,
            },
            '.ms-Link': {
              color: extendedSemanticColors.listLinkRowSelected,
            },
            ':hover': {
              background: extendedSemanticColors.listItemBackgroundSelectedHovered,
              selectors: {
                '.ms-Link': {
                  color: extendedSemanticColors.listLinkRowSelectedHovered,
                },
                '.ms-Check-circle': {
                  backgroundColor: extendedSemanticColors.checkboxBackgroundHovered,
                },
              },
            },
          },
        },
      ],
    ],
  };
};
