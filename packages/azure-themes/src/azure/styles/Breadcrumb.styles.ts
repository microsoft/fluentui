import { IBreadcrumbStyleProps, IBreadcrumbStyles } from 'office-ui-fabric-react/lib/Breadcrumb';
import { FontWeights } from 'office-ui-fabric-react/lib/Styling';
import { FontSizes } from '../AzureType';

export const BreadcrumbStyles = (props: IBreadcrumbStyleProps): Partial<IBreadcrumbStyles> => {
  const { theme } = props;
  const { semanticColors } = theme;

  return {
    chevron: {
      color: semanticColors.bodyText,
    },
    overflowButton: {
      selectors: {
        '&:hover': {
          backgroundColor: semanticColors.menuItemBackgroundHovered,
          color: semanticColors.buttonTextHovered,
        },
        ':focus': {
          backgroundColor: semanticColors.menuItemBackgroundHovered,
          color: semanticColors.buttonTextPressed,
        },
        ':hover:focus': {
          backgroundColor: semanticColors.menuItemBackgroundHovered,
          color: semanticColors.buttonTextPressed,
        },
      },
    },
    itemLink: {
      fontSize: FontSizes.size13,
      outline: 'none',
      fontWeight: FontWeights.regular,
      color: semanticColors.link,
      selectors: {
        ':hover': {
          backgroundColor: semanticColors.menuItemBackgroundHovered,
          color: semanticColors.linkHovered,
          textDecoration: 'underline',
        },
        ':focus': {
          backgroundColor: semanticColors.menuItemBackgroundHovered,
          color: semanticColors.linkHovered,
          textDecoration: 'underline',
        },
        ':hover:focus': {
          backgroundColor: semanticColors.menuItemBackgroundHovered,
          color: semanticColors.linkHovered,
          textDecoration: 'underline',
        },
      },
    },
  };
};
