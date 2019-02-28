import { ISpinButtonStyles, ISpinButtonProps } from 'office-ui-fabric-react/lib/SpinButton';

export const SpinButtonStyles = (props: ISpinButtonProps): Partial<ISpinButtonStyles> => {
  const SPIN_BUTTON_WIDTH = 23;
  const { theme } = props;
  if (!theme) {
    throw new Error('Theme is undefined or null.');
  }
  const { palette, effects } = theme;

  const buttonStyles = {
    color: palette.neutralSecondary,
    width: SPIN_BUTTON_WIDTH,
    selectors: {
      ':hover': {
        backgroundColor: palette.neutralLighter,
        color: palette.neutralSecondary
      },
      ':active': {
        backgroundColor: palette.neutralLight,
        color: palette.neutralSecondary
      },
      '.ms-Button-icon': {
        fontSize: 8 // following the redlines even though we don't have this size in our type ramp.
      }
    }
  };

  return {
    spinButtonWrapper: {
      borderRadius: effects.roundedCorner2
    },
    input: {
      padding: '0 8px',
      width: `calc(100% - ${SPIN_BUTTON_WIDTH}px)`, // -23px because buttons width changed
      borderRadius: `${effects.roundedCorner2} 0 0 ${effects.roundedCorner2}`
    },
    arrowButtonsContainer: {
      selectors: {
        // No direct style section available so need to target a global className
        '.ms-DownButton': {
          ...buttonStyles,
          borderRadius: `0 0 ${effects.roundedCorner2} 0`
        },
        '.ms-UpButton': {
          ...buttonStyles,
          borderRadius: `0 ${effects.roundedCorner2} 0 0`
        }
      }
    }
  };
};
