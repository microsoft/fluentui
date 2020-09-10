import { Theme, Tokens } from '@fluentui/theme';
import { createTheme } from '@uifabric/styling';
import { getTokens } from './getTokens';

/**
 * Creates default theme (Fluent theme).
 */
export const createDefaultTheme = (): Theme => {
  const defaultTheme: Theme = createTheme({});
  defaultTheme.tokens = getTokens(defaultTheme);

  return defaultTheme;
};

// TODO: use default fonts from `theme` package.
const defaultFonts = {
  // eslint-disable-next-line @fluentui/max-len
  fontFamily: `'Segoe UI', 'Segoe UI Web (West European)', 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue', sans-serif`,
  fontSize: '14px',
  fontWeight: 400,
  mozOsxFontSmoothing: 'grayscale',
  webkitFontSmoothing: 'antialiased',
};

export const defaultTokens: Tokens = {
  color: {
    body: { background: '#ffffff', contentColor: '#323130', ...defaultFonts },

    brand: {
      background: '#0078d4',
      contentColor: '#ffffff',
      borderColor: 'transparent',
      iconColor: '#ffffff',
      dividerColor: '#ffffff',
      secondaryContentColor: '#ffffff',
      disabled: {
        background: '#f3f2f1',
        contentColor: '#c8c6c4',
        borderColor: 'var(--color-brand-disabled-background)',
        iconColor: 'var(--color-brand-disabled-contentColor)',
        dividerColor: '#c8c6c4',
        secondaryContentColor: 'var(--color-brand-disabled-contentColor)',
      },
      hovered: {
        background: '#106ebe',
        contentColor: '#ffffff',
        borderColor: 'var(--color-brand-borderColor)',
        iconColor: '#ffffff',
        secondaryContentColor: 'var(--color-brand-hovered-contentColor)',
      },
      pressed: {
        background: '#005a9e',
        contentColor: 'var(--color-brand-contentColor)',
        borderColor: 'var(--color-brand-borderColor)',
        iconColor: 'var(--color-brand-iconColor)',
        secondaryContentColor: 'var(--color-brand-pressed-contentColor)',
      },
      focused: {
        background: 'var(--color-brand-background)',
        borderColor: 'var(--color-brand-borderColor)',
        contentColor: 'var(--color-brand-contentColor)',
        iconColor: 'var(--color-brand-iconColor)',
        secondaryContentColor: 'var(--color-brand-focused-contentColor)',
      },
      checked: {
        background: 'var(--color-brand-pressed-background)',
        contentColor: 'var(--color-brand-pressed-contentColor)',
      },
      checkedHovered: {
        background: 'var(--color-brand-pressed-background)',
        contentColor: 'var(--color-brand-pressed-contentColor)',
      },
    },
  },

  // TODO: this should be a variant.
  ghost: {
    fontWeight: 'normal',
    background: 'var(--color-body-background)',
    borderColor: 'transparent',
    contentColor: '#323130',
    iconColor: '#106ebe',
    menuIconColor: '#605e5c',
    secondaryContentColor: 'var(--ghost-contentColor)',

    checked: {
      background: 'var(--ghost-background)',
      borderColor: 'var(--ghost-borderColor)',
      contentColor: '#000000',
      iconColor: '#004578',
    },
    checkedHovered: {
      background: 'var(--ghost-background)',
      borderColor: 'var(--ghost-borderColor)',
      contentColor: 'var(--ghost-hovered-contentColor)',
      iconColor: 'var(--ghost-hovered-iconColor)',
    },
    disabled: {
      background: 'var(--ghost-background)',
      borderColor: 'var(--ghost-borderColor)',
      contentColor: '#a19f9d',
      iconColor: 'inherit',
      secondaryContentColor: 'var(--ghost-disabled-contentColor)',
    },
    expanded: {
      contentColor: '#0078d4',
    },
    focused: {
      background: 'var(--ghost-background)',
      borderColor: 'var(--ghost-borderColor)',
      contentColor: 'var(--ghost-contentColor)',
      iconColor: 'var(--ghost-iconColor)',
      secondaryContentColor: 'var(--ghost-focused-contentColor)',
    },
    hovered: {
      background: 'var(--ghost-background)',
      borderColor: 'var(--ghost-borderColor)',
      contentColor: '#0078d4',
      iconColor: '#0078d4',
      secondaryContentColor: 'var(--ghost-hovered-contentColor)',
    },
    pressed: {
      background: 'var(--ghost-background)',
      borderColor: 'var(--ghost-borderColor)',
      contentColor: '#000000',
      iconColor: '#004578',
      secondaryContentColor: 'var(--ghost-pressed-contentColor)',
    },
  },

  // TODO: these should not be here.
  button: {
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
    ...defaultFonts,
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '0',
    paddingBottom: '0',
    minWiedth: '80px',
    minHeight: 'var(--button-size-regular)',
    contentGap: '8px',
    iconSize: '16px',
    borderRadius: '2px',
    borderWidth: '1px',
    focusColor: '#605e5c',
    focusInnerColor: '#ffffff',
    focusWidth: '2px',
    innerFocusWidth: '2px',
    background: '#ffffff',
    borderColor: '#8a8886',
    contentColor: '#323130',
    iconColor: 'inherit',
    menuIconColor: 'inherit',
    menuIconSize: '12px',
    dividerColor: 'rgba(0, 0, 0, 0.1)',
    dividerLength: 'var(--button-minHeight)',
    dividerThickness: 'var(--button-borderWidth)',
    secondaryContentColor: '#605e5c',
    secondaryContentFontSize: '12px',
    secondaryContentFontWeight: 'normal',
    secondaryContentMarginTop: '5px',

    disabled: {
      background: '#f3f2f1',
      borderColor: '#f3f2f1',
      contentColor: '#a19f9d',
      iconColor: 'var(--button-disabled-contentColor)',
      dividerColor: '#c8c6c4',
      secondaryContentColor: 'var(--button-disabled-contentColor)',
    },

    hovered: {
      background: '#f3f2f1',
      borderColor: '#8a8886',
      contentColor: '#201f1e',
      iconColor: 'var(--button-iconColor)',
      menuIconColor: 'var(--button-menuIconColor)',
      secondaryContentColor: 'var(--button-hovered-contentColor)',
    },

    pressed: {
      background: '#edebe9',
      borderColor: '#8a8886',
      contentColor: '#201f1e',
      iconColor: 'var(--button-iconColor)',
      menuIconColor: 'var(--button-menuIconColor)',
      secondaryContentColor: 'var(--button-pressed-contentColor)',
    },

    focused: {
      background: 'var(--button-background)',
      borderColor: 'var(--button-borderColor)',
      contentColor: 'var(--button-contentColor)',
      iconColor: 'var(--button-iconColor)',
      menuIconColor: 'var(--button-menuIconColor)',
      secondaryContentColor: 'var(--button-focused-contentColor)',
    },

    checked: {
      background: 'var(--button-pressed-background)',
      contentColor: 'var(--button-pressed-contentColor)',
    },

    checkedHovered: {
      background: 'var(--button-pressed-background)',
      contentColor: 'var(--button-pressed-contentColor)',
    },
  },
};
