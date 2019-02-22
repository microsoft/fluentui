import { fluentBorderRadius } from './styleConstants';
import { NeutralColors } from '../FluentColors';
import { ISpinButtonStyles, ISpinButtonProps } from 'office-ui-fabric-react/lib/SpinButton';

export const SpinButtonStyles = (props: ISpinButtonProps): Partial<ISpinButtonStyles> => {
  const SPIN_BUTTON_WIDTH = 23;
  const { theme } = props;
  if (!theme) {
    throw new Error('Theme is undefined or null.');
  }
  const { palette } = theme;

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
      borderRadius: fluentBorderRadius,
      borderColor: NeutralColors.gray80
    },
    spinButtonWrapperHovered: {
      borderColor: palette.neutralPrimary
    },
    input: {
      padding: '0 8px',
      width: `calc(100% - ${SPIN_BUTTON_WIDTH}px)`, // -23px because buttons width changed
      borderRadius: `${fluentBorderRadius} 0 0 ${fluentBorderRadius}`
    },
    arrowButtonsContainer: {
      selectors: {
        // No direct style section available so need to target a global className
        '.ms-DownButton': {
          ...buttonStyles,
          borderRadius: `0 0 ${fluentBorderRadius} 0`
        },
        '.ms-UpButton': {
          ...buttonStyles,
          borderRadius: `0 ${fluentBorderRadius} 0 0`
        }
      }
    }
  };
};
