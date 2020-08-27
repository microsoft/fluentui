import { ILabelStyleProps, ILabelStyles } from 'office-ui-fabric-react/lib/Label';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';

export const LabelStyles = (props: ILabelStyleProps): Partial<ILabelStyles> => {
  const { theme, disabled } = props;
  const { semanticColors } = theme;
  const extendedSemanticColors = semanticColors as IExtendedSemanticColors;

  return {
    root: [
      {
        fontSize: theme.fonts.medium.fontSize,
        color: extendedSemanticColors.labelText,
      },
      disabled && {
        color: semanticColors.disabledBodyText,
      },
    ],
  };
};
