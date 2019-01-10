import { ISpinButtonStyles } from 'office-ui-fabric-react/lib/SpinButton';
import { ITheme } from 'office-ui-fabric-react';

export const SpinButtonStyles = (theme: ITheme): Partial<ISpinButtonStyles> => {
  const { semanticColors } = theme;
  return {
    input: {
      backgroundColor: semanticColors.inputBackground,
      color: semanticColors.inputText
    },
    inputTextSelected: {
      color: semanticColors.inputText
    }
  };
};
