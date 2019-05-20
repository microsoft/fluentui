import { ILabelStyleProps, ILabelStyles, FontWeights } from 'office-ui-fabric-react';

export const LabelStyles = (props: ILabelStyleProps): Partial<ILabelStyles> => {
  const { theme, disabled } = props;
  const { palette } = theme;

  return {
    root: [
      {
        fontWeight: FontWeights.semibold
      },
      disabled && {
        color: palette.neutralTertiary
      }
    ]
  };
};
