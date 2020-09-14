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

export const defaultTokens: Tokens = {
  body: { background: '#ffffff', contentColor: '#323130' },
  accent: {
    background: '#0078d4',
    contentColor: '#ffffff',
    borderColor: 'transparent',
    iconColor: '#ffffff',
    dividerColor: '#ffffff',
    secondaryContentColor: '#ffffff',
    disabled: {
      background: '#f3f2f1',
      contentColor: '#c8c6c4',
      borderColor: 'var(--accent-disabled-background)',
      iconColor: 'var(--accent-disabled-contentColor)',
      dividerColor: '#c8c6c4',
      secondaryContentColor: 'var(--accent-disabled-contentColor)',
    },
    hovered: {
      background: '#106ebe',
      contentColor: '#ffffff',
      borderColor: 'var(--accent-borderColor)',
      iconColor: '#ffffff',
      secondaryContentColor: 'var(--accent-hovered-contentColor)',
    },
    pressed: {
      background: '#005a9e',
      contentColor: 'var(--accent-contentColor)',
      borderColor: 'var(--accent-borderColor)',
      iconColor: 'var(--accent-iconColor)',
      secondaryContentColor: 'var(--accent-pressed-contentColor)',
    },
    focused: {
      background: 'var(--accent-background)',
      borderColor: 'var(--accent-borderColor)',
      contentColor: 'var(--accent-contentColor)',
      iconColor: 'var(--accent-iconColor)',
      secondaryContentColor: 'var(--accent-focused-contentColor)',
    },
    checked: {
      background: 'var(--acent-pressed-background)',
      contentColor: 'var(--acent-pressed-contentColor)',
    },
    checkedHovered: {
      background: 'var(--acent-pressed-background)',
      contentColor: 'var(--acent-pressed-contentColor)',
    },
  },

  // TODO: this should be a variant.
  ghost: {
    background: 'var(--body-background)',
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
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '0',
    paddingBottom: '0',
    minWidth: '80px',
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
    focusWidth: '2px',
    innerFocusWidth: '2px',
    background: '#ffffff',
    borderColor: '#8a8886',
    contentColor: '#323130',
    iconColor: 'inherit',
    menuIconColor: 'inherit',
    dividerColor: 'rgba(0, 0, 0, 0.1)',
    dividerLength: 'var(--button-minHeight)',
    dividerThickness: 'var(--button-borderWidth)',
    secondaryContentColor: '#605e5c',
    secondaryContentFontSize: '12px',

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

  // TODO: These should not be here
  card: {
    size: {
      smallest: {
        borderRadius: '4px',
        height: 'auto',
        margin: 0,
        padding: '8px',
        width: 'auto',
      },
      smaller: {
        borderRadius: '4px',
        height: 'auto',
        margin: 0,
        padding: '8px',
        width: 'auto',
      },
      small: {
        borderRadius: '4px',
        height: 'auto',
        margin: 0,
        padding: '8px',
        width: 'auto',
      },
      medium: {
        borderRadius: '4px',
        height: 'auto',
        margin: 0,
        padding: '16px',
        width: 'auto',
      },
      large: {
        borderRadius: '6px',
        height: 'auto',
        margin: 0,
        padding: '16px',
        width: 'auto',
      },
      larger: {
        borderRadius: '6px',
        height: 'auto',
        margin: 0,
        padding: '16px',
        width: 'auto',
      },
      largest: {
        borderRadius: '6px',
        height: 'auto',
        margin: 0,
        padding: '16px',
        width: 'auto',
      },
    },

    backgroundColor: '#ffffff',
    borderColor: 'transparent',
    borderWidth: '1px',
    boxShadow: '0 1.6px 3.6px 0 rgba(0, 0, 0, 0.1)',
    minHeight: '32px',
    minWidth: '100px',

    borderRadius: 'var(--card-size-medium-borderRadius)',
    height: 'var(--card-size-medium-height)',
    margin: 'var(--card-size-medium-margin)',
    padding: 'var(--card-size-medium-padding)',
    width: 'var(--card-size-medium-width)',

    hovered: {
      backgroundColor: 'var(--card-backgroundColor)',
      borderColor: 'var(--card-borderColor)',
      borderWidth: 'var(--card-borderWidth)',
      boxShadow: 'var(--card-boxShadow)',
    },

    pressed: {
      backgroundColor: 'var(--card-backgroundColor)',
      borderColor: 'var(--card-borderColor)',
      borderWidth: 'var(--card-borderWidth)',
      boxShadow: 'var(--card-boxShadow)',
    },

    selected: {
      backgroundColor: '#fafafa',
      borderColor: 'var(--card-borderColor)',
      borderWidth: 'var(--card-borderWidth)',
      boxShadow: 'var(--card-boxShadow)',
    },

    disabled: {
      backgroundColor: '#f0f0f0',
      borderColor: 'var(--card-borderColor)',
      borderWidth: 'var(--card-borderWidth)',
      boxShadow: '0 0.8px 1.8px 0 rgba(0, 0, 0, 0.1)',
    },

    clickable: {
      backgroundColor: '#ffffff',
      borderColor: 'transparent',
      borderWidth: '1px',
      boxShadow: '0 1.6px 3.6px 0 rgba(0, 0, 0, 0.1)',

      hovered: {
        backgroundColor: '#fafafa',
        borderColor: 'var(--card-clickable-borderColor)',
        borderWidth: 'var(--card-clickable-borderWidth)',
        boxShadow: '0 3.2px 7.2px 0 rgba(0, 0, 0, 0.1)',
      },

      pressed: {
        backgroundColor: '#f5f5f5',
        borderColor: 'var(--card-clickable-borderColor)',
        borderWidth: '2px',
        boxShadow: 'var(--card-clickable-boxShadow)',
      },
    },

    compact: {
      padding: 0,
    },

    fluid: {
      height: '100%',
      width: '100%',
    },
  },
};
