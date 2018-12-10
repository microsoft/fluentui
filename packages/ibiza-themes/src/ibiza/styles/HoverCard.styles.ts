import {
  IExpandingCardStyleProps,
  IExpandingCardStyles,
  IPlainCardStyleProps,
  IPlainCardStyles
} from 'office-ui-fabric-react/lib/HoverCard';
import { Depths } from '../IbizaDepths';
import { borderRadius } from './styleConstants';

const commonCardStyles = {
  border: 'none',
  boxShadow: Depths.depth16,
  borderRadius: borderRadius,
  selectors: {
    '.ms-Callout-main': { borderRadius: borderRadius }
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
