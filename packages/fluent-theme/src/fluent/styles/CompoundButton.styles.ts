import { fluentBorderRadius } from './styleConstants';
import { NeutralColors, CommunicationColors } from '../FluentColors';
import FluentTheme from '../FluentTheme';
import { getFocusStyle } from 'office-ui-fabric-react/lib/Styling';
import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';

export const CompoundButtonStyles: Partial<IButtonStyles> = {
  root: {
    ...getFocusStyle(FluentTheme, 2),
    backgroundColor: NeutralColors.white,
    border: `1px solid ${NeutralColors.gray110}`,
    borderRadius: fluentBorderRadius,
    padding: '16px 12px',

    // Primary styles require targeting a selector for now.
    // @todo: These selectors override the focus style above. Need to fix this.
    selectors: {
      '&.ms-Button--compoundPrimary': {
        backgroundColor: CommunicationColors.primary,
        borderColor: CommunicationColors.primary
      }
    }
  },
  rootPressed: {
    backgroundColor: NeutralColors.gray40,

    // Primary styles require targeting a selector for now.
    selectors: {
      '&.ms-Button--compoundPrimary:active': {
        backgroundColor: CommunicationColors.shade20
      }
    }
  },
  rootChecked: {
    backgroundColor: NeutralColors.gray40,

    // Primary styles require targeting a selector for now.
    selectors: {
      '&.ms-Button--compoundPrimary': {
        backgroundColor: CommunicationColors.shade20,
        borderColor: CommunicationColors.shade20
      }
    }
  },
  rootDisabled: {
    borderColor: NeutralColors.gray20,

    selectors: {
      '&.ms-Button--compoundPrimary': {
        backgroundColor: NeutralColors.gray20,
        borderColor: NeutralColors.gray20
      }
    }
  }
};
