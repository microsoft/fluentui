import { IBasePickerStyles, IBasePickerStyleProps } from 'office-ui-fabric-react/lib/Pickers';
import { FontSizes } from '../AzureType';
import * as StyleConstants from '../Constants';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';

export const TagPickerStyles = (props: IBasePickerStyleProps): Partial<IBasePickerStyles> => {
  const { theme } = props;
  if (!theme) {
    return {};
  }
  const { semanticColors } = theme;
  const extendedSemanticColors = semanticColors as IExtendedSemanticColors;
  return {
    root: {
      fontSize: FontSizes.size12,
      border: `${StyleConstants.borderWidth} solid ${StyleConstants.transparent}`,
      backgroundColor: StyleConstants.transparent,
      selectors: {
        '[disabled]': {
          backgroundColor: semanticColors.buttonBackgroundDisabled,
          color: semanticColors.buttonTextDisabled
        }
      }
    },
    input: {
      color: extendedSemanticColors.inputText,
      backgroundColor: StyleConstants.transparent,
      border: 'none'
    },
    itemsWrapper: {
      color: semanticColors.bodyText,
      border: 'none',
      backgroundColor: StyleConstants.transparent
    },
    text: {
      border: `${StyleConstants.borderWidth} solid ${extendedSemanticColors.controlOutline}`
    }
  };
};
