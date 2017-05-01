import { IButtonClassNames } from '../Button.Props';
import {
  ITheme,
  css,
  getTheme
} from '@uifabric/styling';
import {
  getStyles as getDefaultButtonStyles
} from '../DefaultButton/DefaultButton.styles';

const DEFAULT_BUTTON_HEIGHT = '32px';
const DEFAULT_BUTTON_MINWIDTH = '80px';
const DEFAULT_PADDING = '0 16px';

export function getCompoundButtonStyles(
  theme: ITheme = getTheme(),
  userClassNames: IButtonClassNames = {}
): IButtonClassNames {
  let defaultButtonStyles = getDefaultButtonStyles(theme, userClassNames);

  return {
    ...defaultButtonStyles,
    ...userClassNames,

    base: 'ms-Button',
    variant: 'ms-Button--compound',

    root: css(
      defaultButtonStyles.root,
      {
        maxWidth: '280px',
        minHeight: '72px',
        height: 'auto',
        padding: '20px'
      },
      userClassNames.root
    ),

    rootEnabled: css(
      defaultButtonStyles.rootEnabled,
      {
        ':hover .ms-Button-description': {
          color: theme.colors.neutralDark
        },
        ':active .ms-Button-description': {
          color: 'inherit'
        }
      },
      userClassNames.rootEnabled
    ),

    flexContainer: css(
      defaultButtonStyles.flexContainer,
      {
        flexDirection: 'column',
        alignItems: 'flex-start',
        minWidth: '100%',
        margin: ''
      },
      userClassNames.flexContainer),

    label: css(
      defaultButtonStyles.label,
      {
        margin: '0 0 5px',
        lineHeight: '100%'
      },
      userClassNames),

    description: css(
      theme.fonts.small,
      {
        color: theme.colors.neutralSecondary,
        lineHeight: '100%'
      }
    ),

    descriptionDisabled: css({
      color: 'inherit'
    })

  };

}
