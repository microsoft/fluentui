import { IBreadcrumbStyleProps, IBreadcrumbStyles } from 'office-ui-fabric-react/lib/Breadcrumb';
import { FontWeights } from 'office-ui-fabric-react/lib/Styling';
import { FontSizes } from '../Mdl2Type';
import { MediumScreenSelector, MinimumScreenSelector } from './styleConstants';

export const BreadcrumbStyles = (props: IBreadcrumbStyleProps): Partial<IBreadcrumbStyles> => {
  const { theme } = props;
  const { palette } = theme;

  const stateSelectors = {
    ':hover': {
      color: palette.neutralPrimary,
      textDecoration: 'none'
    },
    ':active': {
      backgroundColor: palette.neutralLight,
      textDecoration: 'none'
    },
    '&:active:hover': {
      color: palette.neutralPrimary,
      backgroundColor: palette.neutralLight,
      textDecoration: 'none'
    }
  };

  const itemStyle = {
    lineHeight: 36,
    fontSize: FontSizes.size18,
    outline: 'none',
    fontWeight: FontWeights.regular,
    color: palette.neutralSecondary,
    selectors: {
      '.ms-Fabric--isFocusVisible &:focus': {
        // Necessary due to changes of Link component not using getFocusStyle.
        outline: 'none'
      },
      // Leaving this breakpoint selectors here as there might be some design discussions regarding scaling breadcrumb.
      [MediumScreenSelector]: { fontSize: FontSizes.size18, fontWeight: FontWeights.regular, lineHeight: 36 },
      [MinimumScreenSelector]: { fontSize: FontSizes.size18, lineHeight: 36 },
      ...stateSelectors
    }
  };

  const lastChildItem = {
    fontWeight: FontWeights.semibold,
    color: palette.neutralPrimary
  };

  return {
    root: {
      marginTop: 11
    },
    itemLink: itemStyle,
    item: itemStyle,
    listItem: {
      selectors: {
        '&:last-child .ms-Breadcrumb-itemLink': lastChildItem,
        '&:last-child .ms-Breadcrumb-item': lastChildItem
      }
    },
    overflowButton: {
      color: palette.neutralSecondary,
      selectors: {
        ...stateSelectors
      }
    }
  };
};
