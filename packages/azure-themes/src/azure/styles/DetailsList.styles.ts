import { ICheckStyleProps, ICheckStyles } from 'office-ui-fabric-react/lib/Check';
import {
  IDetailsRowStyleProps,
  IDetailsRowStyles,
  IDetailsListStyleProps,
  IDetailsListStyles,
} from 'office-ui-fabric-react/lib/DetailsList';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';
import { FontSizes } from '../AzureType';
import * as StyleConstants from '../Constants';
import { BaseColors } from '../AzureColors';

export const CheckStyles = (props: ICheckStyleProps): Partial<ICheckStyles> => {
  const { theme, checked } = props;
  const semanticColors = theme.semanticColors as IExtendedSemanticColors;

  return {
    circle: [
      {
        fontSize: 0,
        paddingTop: 1,
        paddingLeft: 1,
        top: -1,
        color: semanticColors.listBackground,
        backgroundColor: semanticColors.listBackground,
        borderColor: semanticColors.checkBoxBorder, //semanticColors.controlOutline,
        borderWidth: StyleConstants.borderWidth,
        borderStyle: StyleConstants.borderSolid,
      },
      checked && {
        backgroundColor: BaseColors.BLUE_0078D4,
        borderColor: '#ffffff',
      },
    ],
    check: [
      {
        left: 1,
        top: -2,
        fontSize: '20px',
        borderRadius: 0,
      },
      !checked && {
        color: semanticColors.listBackground,
        selectors: {
          ':hover': {
            color: '#605E5C',
          },
        },
      },
    ],
  };
};

export const DetailsListStyles = (props: IDetailsListStyleProps): Partial<IDetailsListStyles> => {
  const { theme } = props;
  const { semanticColors } = theme;

  return {
    root: {
      borderTop: StyleConstants.borderNone,
    },
    headerWrapper: {
      selectors: {
        '.ms-DetailsHeader': {
          borderColor: semanticColors.variantBorder,
          fontSize: FontSizes.size13,
          borderTop: StyleConstants.borderNone,
          selectors: {
            '.ms-DetailsHeader-cellTitle': {
              backgroundColor: semanticColors.listBackground,
              borderRightWidth: StyleConstants.borderWidth,
              borderRightStyle: StyleConstants.borderSolid,
              borderRightColor: semanticColors.listBackground,
              fontSize: FontSizes.size13,
              fontWeight: 600,
            },
            ':hover .ms-DetailsHeader-cellTitle': {
              borderRightWidth: StyleConstants.borderWidth,
              borderRightStyle: StyleConstants.borderSolid,
              borderRightColor: semanticColors.variantBorder,
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
        borderColor: semanticColors.variantBorder,
        color: semanticColors.listText,
        fontSize: FontSizes.size13,
      },
      !isSelected && [
        {
          background: semanticColors.listBackground,
          color: semanticColors.listText,
          lineHeight: '20px',
          selectors: {
            ':hover': {
              backgroundColor: semanticColors.listItemBackgroundHovered,
            },
            ':focus': {
              backgroundColor: semanticColors.listItemBackgroundChecked,
            },
          },
        },
      ],
      isSelected && [
        {
          background: semanticColors.listItemBackgroundChecked,
          lineHeight: '20px',
          selectors: {
            ':hover': {
              background: extendedSemanticColors.listItemBackgroundSelectedHovered,
            },
            ':focus': {
              background: semanticColors.listItemBackgroundChecked,
            },
            ':focus:hover': {
              background: extendedSemanticColors.listItemBackgroundSelectedHovered,
            },
          },
        },
      ],
    ],
    cell: [
      {
        color: semanticColors.listText,
      },
    ],
  };
};
