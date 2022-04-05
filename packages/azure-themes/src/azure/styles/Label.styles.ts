import { ILabelStyleProps, ILabelStyles } from '@fluentui/react/lib/Label';
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
        fontWeight: 400,
      },
      disabled && {
        color: semanticColors.disabledBodyText,
      },
    ],
  };
};
