import { RecursivePartial, Theme } from '../../types';
import { ButtonTokenSet } from './types';

export const defaultButtonTokens: RecursivePartial<ButtonTokenSet> = {
  size: {
    // smallest size supported by default theme is 24px.
    smallest: '24px',
    smaller: '24px',
    small: '24px',
    regular: '32px',
    large: '40px',
    larger: '48px',
    largest: '64px',
  },
  padding: '0 16px',
  minHeight: 'var(--button-size-regular)',
  contentGap: '10px',
  iconSize: '16px',
  borderRadius: '2px',
  borderWidth: '1px',
  // eslint-disable-next-line @fluentui/max-len
  fontFamily: `'Segoe UI', 'Segoe UI Web (West European)', 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue', sans-serif`,
  fontSize: '14px',
  fontWeight: 400,
  focusColor: '#605e5c',
  focusInnerColor: '#ffffff',
  background: '#ffffff',
  borderColor: '#8a8886',
  contentColor: '#323130',
  iconColor: 'inherit',
  dividerColor: 'rgba(0, 0, 0, 0.1)',
  dividerLength: 'var(--button-minHeight)',
  dividerThickness: 'var(--button-borderWidth)',
  disabled: {
    background: '#f3f2f1',
    borderColor: '#f3f2f1',
    contentColor: '#a19f9d',
    iconColor: 'var(--button-disabled-contentColor)',
  },
  hovered: {
    background: '#f3f2f1',
    borderColor: '#8a8886',
    contentColor: '#201f1e',
    iconColor: 'var(--button-iconColor)',
  },
  pressed: {
    background: '#edebe9',
    borderColor: '#8a8886',
    contentColor: '#201f1e',
    iconColor: 'var(--button-iconColor)',
  },
  checked: {
    background: 'var(--button-pressed-background)',
    contentColor: 'var(--button-pressed-contentColor)',
  },
  checkedHovered: {
    background: 'var(--button-pressed-background)',
    contentColor: 'var(--button-pressed-contentColor)',
  },
};

/**
 * Get button tokens from compat (v7) theme.
 */
export function getButtonTokensFromCompatTheme(theme: Theme): RecursivePartial<ButtonTokenSet> {
  const { fonts, effects, palette, semanticColors } = theme;

  return {
    fontWeight: fonts?.medium?.fontWeight,
    fontSize: fonts?.medium?.fontSize,
    fontFamily: fonts?.medium?.fontFamily,
    iconSize: fonts?.mediumPlus?.fontSize,
    borderRadius: effects?.roundedCorner2,
    focusColor: palette?.neutralSecondary,
    focusInnerColor: palette?.white,

    background: semanticColors?.buttonBackground,
    borderColor: semanticColors?.buttonBorder,
    contentColor: semanticColors?.buttonText,

    hovered: {
      background: semanticColors?.buttonBackgroundHovered,
      borderColor: semanticColors?.buttonBorder,
      contentColor: semanticColors?.buttonTextHovered,
    },

    pressed: {
      background: semanticColors?.buttonBackgroundPressed,
      contentColor: semanticColors?.buttonTextPressed,
      borderColor: semanticColors?.buttonBorder,
    },

    disabled: {
      background: semanticColors?.buttonBackgroundDisabled,
      borderColor: semanticColors?.buttonBorderDisabled,
      contentColor: semanticColors?.buttonTextDisabled,
    },

    checked: {
      background: semanticColors?.buttonBackgroundPressed,
      contentColor: semanticColors?.buttonTextChecked,
    },

    checkedHovered: {
      background: semanticColors?.buttonBackgroundPressed,
      contentColor: semanticColors?.buttonTextCheckedHovered,
    },
  };
}
