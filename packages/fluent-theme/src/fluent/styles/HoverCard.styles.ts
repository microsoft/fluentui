import { IExpandingCardStyleProps, IPlainCardStyleProps } from 'office-ui-fabric-react/lib/HoverCard';
import { Depths } from '../FluentDepths';
import { fluentBorderRadius } from './styleConstants';

const commonCardStyles = {
  border: 'none',
  boxShadow: Depths.depth16,
  borderRadius: fluentBorderRadius,
  selectors: {
    '.ms-Callout-main': { borderRadius: fluentBorderRadius }
  }
};

export const ExpandingCardStyles = (props: IExpandingCardStyleProps) => {
  return {
    root: {
      ...commonCardStyles,
      width: 320
    },
    expandedCard: {
      selectors: {
        ':before': {
          width: 272 // needs to change due to above change
        }
      }
    }
  };
};

export const PlainCardStyles = (props: IPlainCardStyleProps) => {
  return {
    root: { ...commonCardStyles }
  };
};
