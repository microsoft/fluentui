import { IBasePickerStyleProps, IBasePickerStyles } from 'office-ui-fabric-react/lib/Pickers';

export const BasePickerStyles = (props: IBasePickerStyleProps): Partial<IBasePickerStyles> => {
  const { theme } = props;
  if (!theme) {
    throw new Error('Theme is undefined or null.');
  }
  const { effects, palette } = theme;

  return {
    text: {
      borderRadius: effects.roundedCorner2,
      borderColor: palette.neutralSecondaryAlt
    },
    input: {
      borderRadius: effects.roundedCorner2
    }
  };
};
