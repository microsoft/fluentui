import { ILabelStyleProps, ILabelStyles } from 'office-ui-fabric-react/lib/Label';
import { FontSizes } from '../AzureType';

export const LabelStyles = (props: ILabelStyleProps): Partial<ILabelStyles> => {
  const { theme, disabled } = props;
  const { palette, semanticColors } = theme;

  return {
    root: [
      {
        fontSize: FontSizes.size12,
        color: palette.neutralPrimary
      },
      disabled && {
        color: semanticColors.disabledBodyText
      }
    ]
  };
};
