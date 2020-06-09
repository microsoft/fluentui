import { ILabelStyleProps, ILabelStyles } from 'office-ui-fabric-react/lib/Label';
import { FontSizes } from '../AzureType';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';

export const LabelStyles = (props: ILabelStyleProps): Partial<ILabelStyles> => {
  const { theme, disabled } = props;
  const { semanticColors } = theme;
  const extendedSemanticColors = semanticColors as IExtendedSemanticColors;

  return {
    root: [
      {
        fontSize: FontSizes.size12,
        color: extendedSemanticColors.labelText,
      },
      disabled && {
        color: semanticColors.disabledBodyText,
      },
    ],
  };
};
