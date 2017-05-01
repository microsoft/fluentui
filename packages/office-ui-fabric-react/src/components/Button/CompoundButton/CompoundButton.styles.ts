import { IButtonClassNames } from '../Button.Props';
import {
  ITheme,
  css,
  getTheme,
  mergeRules
} from '@uifabric/styling';
import {
  getStyles as getDefaultButtonStyles
} from '../DefaultButton/DefaultButton.styles';

const DEFAULT_BUTTON_HEIGHT = '32px';
const DEFAULT_BUTTON_MINWIDTH = '80px';
const DEFAULT_PADDING = '0 16px';

export function getCompoundButtonStyles(
  theme: ITheme = getTheme(),
  customClassNames: IButtonClassNames = {}
): IButtonClassNames {
  let defaultButtonStyles = getDefaultButtonStyles(theme, customClassNames);
  let compoundButtonStyles = {
    root: css(
      {
        maxWidth: '280px',
        minHeight: '72px',
        height: 'auto',
        padding: '20px'
      }
    ),

    rootEnabled: css(
      {
        ':hover .ms-Button-description': {
          color: theme.colors.neutralDark
        },
        ':active .ms-Button-description': {
          color: 'inherit'
        }
      }
    ),

    flexContainer: css(
      {
        flexDirection: 'column',
        alignItems: 'flex-start',
        minWidth: '100%',
        margin: ''
      }
    ),

    label: css(
      {
        margin: '0 0 5px',
        lineHeight: '100%'
      }
    ),

    description: css(
      theme.fonts.small,
      {
        lineHeight: '100%'
      }),

    descriptionEnabled: css({
      color: theme.colors.neutralSecondary,
    })

  };

  return mergeRules(defaultButtonStyles, compoundButtonStyles, customClassNames);
}
