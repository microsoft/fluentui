import { ICheckStyleProps, ICheckStyles } from 'office-ui-fabric-react/lib/Check';
import { IDetailsRowStyleProps, IDetailsRowStyles } from 'office-ui-fabric-react/lib/DetailsList';

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

  return {
    root: [
      {
        selectors: {
          ':focus $check': {
            opacity: 1
          }
        }
      },
      isSelected && [
        {
          background: palette.neutralLight,
          selectors: {
            ':hover': {
              background: palette.neutralQuaternaryAlt
            },
            ':focus': {
              background: palette.neutralLight
            },
            ':focus:hover': {
              background: palette.neutralQuaternaryAlt
            }
          }
        }
      ]
    ]
  };
};
