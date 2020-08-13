export const imageBehavior = props => {
  return {
    attributes: {
      root: {
        'aria-hidden': props.alt || props['aria-label'] ? undefined : 'true',
      },
    },
  };
};
