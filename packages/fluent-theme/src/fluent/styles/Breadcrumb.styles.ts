import { IBreadcrumbStyleProps } from 'office-ui-fabric-react/lib/Breadcrumb';
import { FontSizes } from '../FluentType';
import { MediumScreenSelector, MinimumScreenSelector } from './styleConstants';

export const BreadcrumbStyles = (props: IBreadcrumbStyleProps) => {
  const { theme } = props;
  const { semanticColors } = theme;

  const stateSelectors = {
    ':hover': {
      color: semanticColors.bodyText
    },
    ':active': {
      backgroundColor: semanticColors.buttonBackgroundPressed
    },
    // Needs to be revised with designers when moving to default OUFR styles.
    // Now used only to override the default ones to follow fluent specs.
    '&:active:hover': {
      color: semanticColors.bodyText,
      backgroundColor: semanticColors.buttonBackgroundPressed
    }
  };

  return {
    root: {
      marginTop: 11
    },
    itemLink: {
      lineHeight: 36,
      fontSize: FontSizes.size18,
      outline: 'none',
      fontWeight: 400,
      color: semanticColors.bodySubtext,
      selectors: {
        '&:last-child': {
          fontWeight: 600,
          color: semanticColors.bodyText
        },
        '.ms-Fabric--isFocusVisible &:focus': {
          // Necessary due to changes of Link component not using getFocusStyle
          outline: 'none'
        },
        // Leaving this breakpoint selectors here as there might be some design discussions regarding scaling breadcrumb.
        [MediumScreenSelector]: { fontSize: FontSizes.size18, lineHeight: 36 },
        [MinimumScreenSelector]: { fontSize: FontSizes.size18, lineHeight: 36 },
        ...stateSelectors
      }
    },
    overflowButton: {
      color: semanticColors.bodySubtext,
      selectors: {
        ...stateSelectors
      }
    }
  };
};
