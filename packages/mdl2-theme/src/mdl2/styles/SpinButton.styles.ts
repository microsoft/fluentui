const SPIN_BUTTON_WIDTH = 14;

export const SpinButtonStyles = {
  input: {
    padding: '0 12px'
  },
  arrowButtonsContainer: {
    selectors: {
      '.ms-DownButton': {
        width: SPIN_BUTTON_WIDTH,
        selectors: {
          '.ms-Button-icon': {
            fontSize: 6
          }
        }
      },
      '.ms-UpButton': {
        width: SPIN_BUTTON_WIDTH,
        selectors: {
          '.ms-Button-icon': {
            fontSize: 6
          }
        }
      }
    }
  }
};
