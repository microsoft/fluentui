import { IDocumentCardStyles, IDocumentCardStyleProps } from '@fluentui/react/lib/DocumentCard';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';

export const DocumentCardStyles = (props: IDocumentCardStyleProps): Partial<IDocumentCardStyles> => {
  const { theme } = props;
  const semanticColors = theme.semanticColors as IExtendedSemanticColors;

  return {
    root: {
      borderColor: semanticColors.controlOutline,
      selectors: {
        '&:hover': {
          borderColor: semanticColors.controlOutlineHovered,
        },
      },
    },
  };
};
