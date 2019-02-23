import {
  IExpandingCardStyleProps,
  IExpandingCardStyles,
  IPlainCardStyleProps,
  IPlainCardStyles
} from 'office-ui-fabric-react/lib/HoverCard';
import { Depths } from '../FluentDepths';

const commonCardStyles = (props: IExpandingCardStyleProps | IPlainCardStyleProps) => {
  const { theme } = props;
  if (!theme) {
    throw new Error('Theme is undefined or null.');
  }
  const { effects } = theme;

  return {
    border: 'none',
    boxShadow: Depths.depth16,
    borderRadius: effects.roundedCorner2,
    selectors: {
      '.ms-Callout-main': { borderRadius: effects.roundedCorner2 }
    }
  };
};

export const ExpandingCardStyles = (props: IExpandingCardStyleProps): Partial<IExpandingCardStyles> => {
  return {
    root: {
      ...commonCardStyles(props),
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
    root: { ...commonCardStyles(props) }
  };
};
