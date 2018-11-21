import { ICheckStyleProps } from 'office-ui-fabric-react/lib/Check';
import { IDetailsRowStyleProps } from 'office-ui-fabric-react/lib/DetailsList';
import { getFocusStyle } from 'office-ui-fabric-react/lib/Styling';

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
      getFocusStyle(theme, -1, undefined, undefined, palette.neutralSecondary, palette.white),
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
