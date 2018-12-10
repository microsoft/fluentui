import { borderRadius } from './styleConstants';
import { NeutralColors } from '../IbizaColors';
import { ISpinButtonStyles } from 'office-ui-fabric-react/lib/SpinButton';

const buttonStyles = {
  color: NeutralColors.gray130,
  width: 23,
  selectors: {
    ':hover': {
      backgroundColor: NeutralColors.gray20,
      color: NeutralColors.gray130
    },
    ':active': {
      backgroundColor: NeutralColors.gray30,
      color: NeutralColors.gray130
    },
    '.ms-Button-icon': {
      fontSize: 8
    }
  }
};

export const SpinButtonStyles: Partial<ISpinButtonStyles> = {
  spinButtonWrapper: {
    borderRadius: borderRadius,
    borderColor: NeutralColors.gray80
  },
  spinButtonWrapperHovered: {
    borderColor: NeutralColors.gray160
  },
  input: {
    padding: '0 8px',
    width: 'calc(100% - 23px)', // -23px because buttons width changed
    borderRadius: `${borderRadius} 0 0 ${borderRadius}`
  },
  arrowButtonsContainer: {
    selectors: {
      // No direct style section available so need to target a global className
      '.ms-DownButton': {
        ...buttonStyles,
        borderRadius: `0 0 ${borderRadius} 0`
      },
      '.ms-UpButton': {
        ...buttonStyles,
        borderRadius: `0 ${borderRadius} 0 0`
      }
    }
  }
};
