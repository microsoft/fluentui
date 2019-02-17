import { IBreadcrumbStyleProps, IBreadcrumbStyles } from 'office-ui-fabric-react/lib/Breadcrumb';
import { FontWeights } from 'office-ui-fabric-react/lib/Styling';
import { FontSizes } from '../FluentType';
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
    // Needs to be revised with designers when moving to default OUFR styles.
    // Now used only to override the default ones to follow fluent specs.
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
      '&:last-child': {
        fontWeight: FontWeights.semibold,
        color: palette.neutralPrimary
      },
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

  return {
    root: {
      marginTop: 11
    },
    itemLink: itemStyle,
    item: itemStyle,
    overflowButton: {
      color: palette.neutralSecondary,
      selectors: {
        ...stateSelectors
      }
    }
  };
};
