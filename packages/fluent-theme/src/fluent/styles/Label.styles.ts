import { ILabelStyleProps, ILabelStyles } from 'office-ui-fabric-react/lib/Label';
import { FontWeights } from '@uifabric/styling';

export const LabelStyles = (props: ILabelStyleProps): Partial<ILabelStyles> => {
  const { theme, disabled } = props;
  const { palette } = theme;

  return {
    root: [
      {
        fontWeight: FontWeights.semibold,
      },
      disabled && {
        color: palette.neutralTertiary,
      },
    ],
  };
};
