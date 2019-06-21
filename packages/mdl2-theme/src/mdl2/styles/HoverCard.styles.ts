const commonCardStyles = () => {
  return {
    border: 'none',
    boxShadow: '0 0 20px rgba(0, 0, 0, .2)'
  };
};

export const ExpandingCardStyles = {
  root: {
    ...commonCardStyles(),
    width: 340
  },
  expandedCard: {
    selectors: {
      ':before': {
        width: 292 // needs to change due to above change
      }
    }
  }
};

export const PlainCardStyles = {
  root: { ...commonCardStyles() }
};
