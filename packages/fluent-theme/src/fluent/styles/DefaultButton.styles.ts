import { fluentBorderRadius } from './styleConstants';
import { getFocusStyle } from '../../../../styling/lib';
import FluentTheme from '../FluentTheme';
import { NeutralColors } from '../FluentColors';

export const DefaultButtonStyles = {
  root: {
    borderRadius: fluentBorderRadius,
    backgroundColor: NeutralColors.white,
    border: `1px solid ${NeutralColors.gray110}`,
    ...getFocusStyle(FluentTheme, 1)
  },
  rootHovered: {
    backgroundColor: NeutralColors.gray20
  },
  rootPressed: {
    backgroundColor: NeutralColors.gray30
  },
  rootChecked: {
    backgroundColor: NeutralColors.gray30
  },
  rootDisabled: {
    backgroundColor: NeutralColors.gray20,
    borderColor: NeutralColors.gray20
  }
};
