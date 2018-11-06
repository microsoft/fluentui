import { fluentBorderRadius } from './styleConstants';
import { getFocusStyle } from '../../../../styling/lib';
import FluentTheme from '../FluentTheme';
import { NeutralColors, CommunicationColors } from '../FluentColors';

export const DefaultButtonStyles = {
  root: {
    borderRadius: fluentBorderRadius,
    backgroundColor: NeutralColors.white,
    border: `1px solid ${NeutralColors.gray110}`,
    ...getFocusStyle(FluentTheme, 1)
  },
  rootHovered: {
    selectors: {
      '.ms-Button--primary': {
        backgroundColor: CommunicationColors.shade10
      }
    }
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
  },

  splitButtonMenuButton: {
    background: 'transparent',
    borderTopRightRadius: fluentBorderRadius,
    borderBottomRightRadius: fluentBorderRadius,
    border: `1px solid ${NeutralColors.gray110}`,
    borderLeft: 'none'
  },

  splitButtonContainer: {
    selectors: {
      '.ms-Button--default': {
        borderRight: 'none',
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
      },
      '.ms-Button--primary': {
        border: 'none',
        backgroundColor: CommunicationColors.primary
      },
      '.ms-Button--primary + .ms-Button': {
        backgroundColor: CommunicationColors.primary,
        border: 'none'
      },
      '.ms-Button.is-disabled': {
        backgroundColor: NeutralColors.gray20
      },
      '.ms-Button.is-disabled + .ms-Button': {
        backgroundColor: NeutralColors.gray20,
        border: 'none'
      }
    }
  }
};
