import { ICheckStyleProps, ICheckStyles } from '@fluentui/react/lib/Check';
import {
  IDetailsRowStyleProps,
  IDetailsRowStyles,
  IDetailsListStyleProps,
  IDetailsListStyles,
  IDetailsHeaderStyles,
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
        paddingLeft: 1,
        borderRadius: StyleConstants.borderRadius,
        color: semanticColors.listBackground,
        backgroundColor: semanticColors.listBackground,
        borderColor: semanticColors.ButtonBorderFocus,
        borderWidth: StyleConstants.borderWidth,
        borderStyle: StyleConstants.borderSolid,
      },
    ],
    check: [
      {
        left: 1.8,
        top: 0,
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
        ':has(.ms-Check.is-checked) .ms-DetailsHeader:not(.is-allSelected) .ms-DetailsHeader-cellIsCheck': {
          '.ms-Check:before': {
            backgroundColor: extendedSemanticColors.checkBoxIndeterminateDetailsRowCheck,
            borderRadius: 0,
            zIndex: 1,
            top: 6,
            left: 6,
            height: 8,
            width: 8,
          },
          '.ms-Check:hover:before': {
            backgroundColor: extendedSemanticColors.checkBoxIndeterminateDetailsRowCheckHover,
          },
          '.ms-Check-check': {
            display: 'none',
          },
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
        selectors: {
          '&.ms-DetailsRow': {
            borderBottom: `1px solid ${extendedSemanticColors.listItemBackgroundSelected}`,
          },
          '.ms-DetailsRow-check': {
            opacity: '1',
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
            '.ms-DetailsRow-cell .ms-Link': {
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

export const DetailsHeaderStyles = (props: IDetailsRowStyleProps): Partial<IDetailsHeaderStyles> => {
  return {
    root: {
      selectors: {
        '.ms-DetailsRow-check': {
          opacity: 1,
        },
      },
    },
  };
};
