import {
  IExpandingCardStyleProps,
  IExpandingCardStyles,
  IPlainCardStyleProps,
  IPlainCardStyles
} from 'office-ui-fabric-react/lib/HoverCard';
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

export const ExpandingCardStyles = (props: IExpandingCardStyleProps): Partial<IExpandingCardStyles> => {
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

export const PlainCardStyles = (props: IPlainCardStyleProps): Partial<IPlainCardStyles> => {
  return {
    root: { ...commonCardStyles }
  };
};
