import { fluentBorderRadius } from './styleConstants';
import { getFocusStyle } from 'office-ui-fabric-react/lib/Styling';
import { NeutralColors } from '../FluentColors';
import { IButtonStyles, IButtonProps } from 'office-ui-fabric-react/lib/Button';

// TODO: "any" is used here to get around "is using xxx but cannot be named" TS error. Should be able to remove
//        this 'any' once we upgrade to TS3.1+
// tslint:disable-next-line:no-any
export const DefaultButtonStyles = (props: IButtonProps): Partial<IButtonStyles> => {
  const { theme } = props;
  if (!theme) {
    throw new Error('Theme is undefined or null.');
  }
  const { palette } = theme;

  return {
    root: {
      borderRadius: fluentBorderRadius,
      backgroundColor: palette.white,
      border: `1px solid ${NeutralColors.gray110}`,
      ...getFocusStyle(theme, 1)
    },
    rootHovered: {
      backgroundColor: palette.neutralLighter,
      selectors: {
        '.ms-Button--primary': {
          backgroundColor: palette.themeDarkAlt
        }
      }
    },
    rootPressed: {
      backgroundColor: palette.neutralLight
    },
    rootChecked: {
      backgroundColor: palette.neutralLight
    },
    rootDisabled: {
      backgroundColor: palette.neutralLighter,
      borderColor: palette.neutralLighter
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
          borderTopRightRadius: '0',
          borderBottomRightRadius: '0'
        },
        '.ms-Button--primary': {
          border: 'none',
          backgroundColor: palette.themePrimary
        },
        '.ms-Button--primary + .ms-Button': {
          backgroundColor: palette.themePrimary,
          border: 'none'
        },
        '.ms-Button.is-disabled': {
          backgroundColor: palette.neutralLighter
        },
        '.ms-Button.is-disabled + .ms-Button': {
          backgroundColor: palette.neutralLighter,
          border: 'none'
        }
      }
    }
  };
};
