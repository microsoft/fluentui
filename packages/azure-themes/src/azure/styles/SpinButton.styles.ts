import { ISpinButtonStyles } from 'office-ui-fabric-react/lib/SpinButton';
import { ITheme } from 'office-ui-fabric-react';
import { FontSizes } from '../AzureType';

export const SpinButtonStyles = (theme: ITheme): Partial<ISpinButtonStyles> => {
  const { semanticColors } = theme;
  return {
    input: {
      backgroundColor: semanticColors.inputBackground,
      color: semanticColors.inputText,
      fontSize: FontSizes.size13,
    },
    inputTextSelected: {
      color: semanticColors.inputText,
      fontSize: FontSizes.size13,
    },
  };
};
