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
            backgroundColor: extendedSemanticColors.linkBackgroundHovered,
            color: semanticColors.linkHovered,
          },
          '&:active': {
            backgroundColor: extendedSemanticColors.linkBackgroundHovered,
            border: `${extendedSemanticColors.choiceGroupContainerBorder}
              ${extendedSemanticColors.linkBorderStyle}
              ${extendedSemanticColors.linkHovered}`,
            color: semanticColors.linkHovered,
          },
        },
      },
    ],
  };
};
