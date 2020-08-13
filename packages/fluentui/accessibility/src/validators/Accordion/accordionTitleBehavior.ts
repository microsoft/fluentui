export const accordionTitleBehavior = props => {
  const isHeading = /(h\d{1})$/.test(props.as);
  const forcedOpen = props.active && !props.canBeCollapsed;
  return {
    attributes: {
      root: {
        role: isHeading ? undefined : 'heading',
        'aria-level': isHeading ? undefined : 4,
      },
      content: {
        'aria-expanded': !!props.active,
        'aria-disabled': !!(forcedOpen || props.disabled),
        'aria-controls': props.accordionContentId,
        role: 'button',
        tabIndex: 0,
      },
    },
    keyActions: {
      content: {
        performClick: {
          keyCombinations: [{ keyCode: 'Enter' }, { keyCode: 'Spacebar' }],
        },
      },
    },
  };
};
