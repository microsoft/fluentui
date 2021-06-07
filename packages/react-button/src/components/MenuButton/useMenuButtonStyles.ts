import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import { Theme } from '@fluentui/react-theme';
import { useButtonStyles } from '../Button/useButtonStyles';
import { MenuButtonState, MenuButtonStyleSelectors, MenuButtonVariantTokens } from './MenuButton.types';

export const makeMenuButtonTokens = (theme: Theme): MenuButtonVariantTokens => ({
  base: {
    menuIconFontSize: '20px',
    menuIconHeight: '20px',
    menuIconWidth: '20px',
  },
  large: {
    menuIconFontSize: '24px',
    menuIconHeight: '24px',
    menuIconWidth: '24px',
  },
});

const useStyles = makeStyles({
  menuIcon: theme => {
    const menuButtonTokens = makeMenuButtonTokens(theme);

    return {
      fontSize: menuButtonTokens.base?.menuIconFontSize,
      height: menuButtonTokens.base?.menuIconHeight,
      width: menuButtonTokens.base?.menuIconWidth,
    };
  },
  menuIconLarge: theme => {
    const menuButtonTokens = makeMenuButtonTokens(theme);

    return {
      fontSize: menuButtonTokens.large?.menuIconFontSize,
      height: menuButtonTokens.large?.menuIconHeight,
      width: menuButtonTokens.large?.menuIconWidth,
    };
  },
});

export const useMenuButtonStyles = (state: MenuButtonState, selectors: MenuButtonStyleSelectors) => {
  useButtonStyles(state, selectors);

  const styles = useStyles();

  if (state.menuIcon) {
    state.menuIcon.className = mergeClasses(
      styles.menuIcon,
      selectors.size === 'large' && styles.menuIconLarge,
      state.menuIcon.className,
    );
  }
};
