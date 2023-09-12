import { ILinkStyleProps, ILinkStyles } from '@fluentui/react/lib/Link';
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
          '&:focus': {
            outline: '0 !important', //outline and border cannot both be active or border looks 2x width on focus. There is another target that has more specificity (.ms-Fabric--isFocusVisible .root-663:focus) that I am unable to target from here, therefore had to use important.
          },
        },
      },
    ],
  };
};
