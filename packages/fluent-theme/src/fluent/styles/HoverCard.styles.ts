import {
  IExpandingCardStyleProps,
  IExpandingCardStyles,
  IPlainCardStyleProps,
  IPlainCardStyles
} from 'office-ui-fabric-react/lib/HoverCard';

const commonCardStyles = (props: IExpandingCardStyleProps | IPlainCardStyleProps) => {
  const { theme } = props;
  const { effects } = theme;

  return {
    border: 'none',
    boxShadow: effects.elevation16,
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
