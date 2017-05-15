import { IButtonStyles } from '../Button.Props';
import {
  ITheme,
  mergeStyles,
  getTheme,
  mergeStyleSets
} from '../../../Styling';
import {
  getStyles as getDefaultButtonStyles
} from '../DefaultButton/DefaultButton.styles';

const DEFAULT_BUTTON_HEIGHT = '32px';
const DEFAULT_BUTTON_MINWIDTH = '80px';
const DEFAULT_PADDING = '0 16px';

export function getStyles(
  theme: ITheme = getTheme(),
  customStyles?: IButtonStyles
): IButtonStyles {
  let defaultButtonStyles: IButtonStyles = getDefaultButtonStyles(
    theme,
    customStyles
  );
  let compoundButtonStyles: IButtonStyles = {
    root: mergeStyles(
      {
        maxWidth: '280px',
        minHeight: '72px',
        height: 'auto',
        padding: '20px'
      }
    ),

    rootEnabled: mergeStyles(
      {
        ':hover .ms-Button-description': {
          color: theme.palette.neutralDark
        },
        ':active .ms-Button-description': {
          color: 'inherit'
        }
      }
    ),

    flexContainer: mergeStyles(
      {
        flexDirection: 'column',
        alignItems: 'flex-start',
        minWidth: '100%',
        margin: ''
      }
    ),

    label: mergeStyles(
      {
        margin: '0 0 5px',
        lineHeight: '100%'
      }
    ),

    description: mergeStyles(
      theme.fonts.small,
      {
        lineHeight: '100%'
      }),

    descriptionEnabled: mergeStyles({
      color: theme.palette.neutralSecondary,
    })

  };

  return mergeStyleSets(defaultButtonStyles, compoundButtonStyles, customStyles);
}
