import { ILabelStyleProps, ILabelStyles } from 'office-ui-fabric-react/lib/Label';
import { FontWeights } from 'office-ui-fabric-react/lib/Styling';

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
