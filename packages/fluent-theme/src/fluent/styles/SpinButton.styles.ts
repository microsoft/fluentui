import { fluentBorderRadius } from './styleConstants';
import { NeutralColors } from '../FluentColors';

export const SpinButtonStyles = {
  spinButtonWrapper: {
    borderRadius: fluentBorderRadius,
    borderColor: NeutralColors.gray80
  },
  spinButtonWrapperHovered: {
    borderColor: NeutralColors.gray160
  },
  input: {
    padding: '0 8px'
  }
};
