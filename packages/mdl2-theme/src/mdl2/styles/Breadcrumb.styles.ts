import { IBreadcrumbStyleProps, IBreadcrumbStyles } from 'office-ui-fabric-react/lib/Breadcrumb';
import { FontWeights } from 'office-ui-fabric-react/lib/Styling';
import { MediumScreenSelector, MinimumScreenSelector } from './styleConstants';

export const BreadcrumbStyles = (props: IBreadcrumbStyleProps): Partial<IBreadcrumbStyles> => {
  const { theme } = props;
  const { palette, fonts } = theme;

  const stateSelectors = {
    ':hover': {
      backgroundColor: palette.neutralLighter,
      textDecoration: 'none'
    },
    ':active': {
      backgroundColor: palette.neutralTertiaryAlt,
      textDecoration: 'none'
    },
    '&:active:hover': {
      backgroundColor: palette.neutralQuaternary,
      textDecoration: 'none'
    }
  };

  const itemStyle = {
    lineHeight: 'normal',
    fontSize: fonts.xLarge.fontSize,
    outline: 'none',
    fontWeight: FontWeights.light,
    color: palette.neutralPrimary,
    selectors: {
      '.ms-Fabric--isFocusVisible &:focus': {
        // Necessary due to changes of Link component not using getFocusStyle.
        outline: 'none'
      },
      // Leaving this breakpoint selectors here as there might be some design discussions regarding scaling breadcrumb.
      [MediumScreenSelector]: { fontSize: fonts.xLarge.fontSize, fontWeight: FontWeights.regular, lineHeight: 'normal' },
      [MinimumScreenSelector]: { fontSize: fonts.xLarge.fontSize, fontWeight: FontWeights.regular, lineHeight: 'normal' },
      ...stateSelectors
    }
  };

  const lastChildItem = {
    fontWeight: FontWeights.light,
    color: palette.neutralPrimary
  };

  return {
    root: {
      marginTop: 23
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
