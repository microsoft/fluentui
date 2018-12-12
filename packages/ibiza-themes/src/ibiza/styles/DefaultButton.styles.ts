import { borderRadius } from './styleConstants';
import { getFocusStyle } from 'office-ui-fabric-react/lib/Styling';
import { NeutralColors, CommunicationColors } from '../IbizaColors';
import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { IExtendedTheme } from '../IExtendedTheme';

// TODO: "any" is used here to get around "is using xxx but cannot be named" TS error. Should be able to remove
//        this 'any' once we upgrade to TS3.1+
// tslint:disable-next-line:no-any
export const DefaultButtonStyles = (extendedTheme: IExtendedTheme): Partial<IButtonStyles> => {
  return {
    root: {
      borderRadius: borderRadius,
      backgroundColor: NeutralColors.white,
      border: `1px solid ${NeutralColors.gray110}`,
      ...getFocusStyle(extendedTheme.theme, 1)
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
      borderTopRightRadius: borderRadius,
      borderBottomRightRadius: borderRadius,
      border: `1px solid ${NeutralColors.gray110}`,
      borderLeft: 'none'
    },
    splitButtonContainer: {
      selectors: {
        '.ms-Button--default': {
          borderRight: 'none',
          borderTopRightRadius: '0',
          borderBottomRightRadius: '0'
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
};
