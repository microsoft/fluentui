import { ICheckStyleProps } from 'office-ui-fabric-react/lib/Check';
import { IDetailsRowStyleProps } from 'office-ui-fabric-react/lib/DetailsList';

export const CheckStyles = (props: ICheckStyleProps) => {
  const { theme, checked } = props;
  const { palette } = theme;

  return {
    circle: [!checked && { color: palette.neutralSecondary }],
    check: [!checked && { color: palette.neutralSecondary }]
  };
};

export const DetailsRowStyles = (props: IDetailsRowStyleProps) => {
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
