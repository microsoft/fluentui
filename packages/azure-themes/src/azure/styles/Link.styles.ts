import { ILinkStyleProps, ILinkStyles } from 'office-ui-fabric-react/lib/Link';

export const LinkStyles = (props: ILinkStyleProps): Partial<ILinkStyles> => {
  const { isDisabled, theme } = props;
  const { semanticColors } = theme;
  return {
    root: [
      !isDisabled && {
        color: semanticColors.link,
        selectors: {
          '&:active, &:hover, &:active:hover': {
            textDecoration: 'underline',
            color: semanticColors.linkHovered,
          },
        },
      },
    ],
  };
};
