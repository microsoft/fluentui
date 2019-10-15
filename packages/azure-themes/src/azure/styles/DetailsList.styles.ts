import { ICheckStyleProps, ICheckStyles } from 'office-ui-fabric-react/lib/Check';
import {
  IDetailsRowStyleProps,
  IDetailsRowStyles,
  IDetailsListStyleProps,
  IDetailsListStyles
} from 'office-ui-fabric-react/lib/DetailsList';
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
        color: semanticColors.listBackground,
        backgroundColor: semanticColors.listBackground,
        borderColor: semanticColors.controlOutline,
        borderWidth: StyleConstants.borderWidth,
        borderStyle: StyleConstants.borderSolid
      }
    ],
    check: [
      {
        left: 2.5,
        top: 1.5
      },
      checked && {
        color: semanticColors.inputText
      },
      !checked && {
        color: semanticColors.listBackground
      }
    ]
  };
};

export const DetailsListStyles = (props: IDetailsListStyleProps): Partial<IDetailsListStyles> => {
  const { theme } = props;
  const { semanticColors } = theme;

  return {
    root: {
      borderTop: StyleConstants.borderNone
    },
    headerWrapper: {
      selectors: {
        '.ms-DetailsHeader': {
          borderColor: semanticColors.variantBorder,
          textTransform: 'uppercase',
          borderTop: StyleConstants.borderNone,
          selectors: {
            '.ms-DetailsHeader-cellTitle': {
              backgroundColor: semanticColors.listBackground,
              borderRightWidth: StyleConstants.borderWidth,
              borderRightStyle: StyleConstants.borderSolid,
              borderRightColor: semanticColors.listBackground,
              fontSize: FontSizes.size10,
              fontWeight: 700
            },
            ':hover .ms-DetailsHeader-cellTitle': {
              borderRightWidth: StyleConstants.borderWidth,
              borderRightStyle: StyleConstants.borderSolid,
              borderRightColor: semanticColors.variantBorder
            }
          }
        }
      }
    }
  };
};

export const DetailsRowStyles = (props: IDetailsRowStyleProps): Partial<IDetailsRowStyles> => {
  const { theme, isSelected } = props;
  const { semanticColors } = theme;

  return {
    root: [
      {
        borderColor: semanticColors.variantBorder,
        color: semanticColors.listText,
        fontSize: FontSizes.size12
      },
      !isSelected && [
        {
          background: semanticColors.listBackground,
          color: semanticColors.listText,
          selectors: {
            ':hover': {
              backgroundColor: semanticColors.listItemBackgroundHovered
            },
            ':focus': {
              backgroundColor: semanticColors.listItemBackgroundHovered
            },
            ':focus:hover': {
              backgroundColor: semanticColors.listItemBackgroundHovered
            }
          }
        }
      ],
      isSelected && [
        {
          background: semanticColors.listItemBackgroundChecked,
          selectors: {
            ':hover': {
              background: semanticColors.listItemBackgroundHovered
            },
            ':focus': {
              background: semanticColors.listItemBackgroundChecked
            },
            ':focus:hover': {
              background: semanticColors.listItemBackgroundHovered
            }
          }
        }
      ]
    ],
    cell: [
      {
        color: semanticColors.listText
      }
    ]
  };
};
