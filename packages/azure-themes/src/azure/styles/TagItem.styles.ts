import { ITagItemStyleProps, ITagItemStyles } from 'office-ui-fabric-react/lib/Pickers';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';
import { FontSizes } from '../AzureType';

export const TagItemStyles = (props: ITagItemStyleProps): Partial<ITagItemStyles> => {
  const { theme, selected } = props;
  if (!theme) {
    return {};
  }
  const { semanticColors } = theme;
  const extendedSemanticColors = semanticColors as IExtendedSemanticColors;
  return {
    root: {
      backgroundColor: semanticColors.listItemBackgroundChecked,
      selectors: {
        ':hover': {
          backgroundColor: semanticColors.listItemBackgroundCheckedHovered
        }
      }
    },
    text: [
      selected && {
        color: semanticColors.bodyText
      }
    ],
    close: {
      fontSize: FontSizes.size12,
      color: semanticColors.bodyText,
      selectors: {
        ':hover': {
          color: extendedSemanticColors.controlOutlineHovered
        }
      }
    }
  };
};
