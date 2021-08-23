import { ILinkStyleProps, ILinkStyles } from 'office-ui-fabric-react/lib/Link';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';

export const LinkStyles = (props: ILinkStyleProps): Partial<ILinkStyles> => {
  const { isDisabled, theme } = props;
  const { semanticColors } = theme;
  const extendedSemanticColors = semanticColors as IExtendedSemanticColors;

  return {
    root: [
      !isDisabled && {
        color: semanticColors.link,
        textDecoration: extendedSemanticColors.listUnderline,
        selectors: {
          '&:active, &:hover, &:active:hover': {
            color: semanticColors.linkHovered,
          },
          '&:active': {
            color: semanticColors.linkHovered,
          },
        },
      },
    ],
  };
};
