import { ICheckStyleProps, ICheckStyles } from 'office-ui-fabric-react/lib/Check';
import { IDetailsRowStyleProps, IDetailsRowStyles } from 'office-ui-fabric-react/lib/DetailsList';
import { FontWeights } from '@uifabric/styling';

export const CheckStyles = (props: ICheckStyleProps): Partial<ICheckStyles> => {
  const { theme, checked } = props;
  const { palette } = theme;

  return {
    circle: [!checked && { color: palette.neutralSecondary }],
    check: [!checked && { color: palette.neutralSecondary }]
  };
};

export const DetailsRowStyles = (props: IDetailsRowStyleProps): Partial<IDetailsRowStyles> => {
  const { theme, isSelected } = props;
  const { palette } = theme;

  const { neutralPrimary, neutralSecondary, neutralLight, neutralQuaternaryAlt } = palette;

  return {
    root: [
      {
        color: neutralSecondary
      },
      isSelected && {
        color: neutralPrimary
      },
      {
        selectors: {
          ':focus $check': {
            opacity: 1
          }
        }
      },
      isSelected && [
        {
          background: neutralLight,
          selectors: {
            ':hover': {
              background: neutralQuaternaryAlt
            },
            ':focus': {
              background: neutralLight
            },
            ':focus:hover': {
              background: neutralQuaternaryAlt
            }
          }
        }
      ]
    ],
    isRowHeader: [
      {
        color: neutralPrimary
      },
      isSelected && {
        fontWeight: FontWeights.semibold
      }
    ]
  };
};
