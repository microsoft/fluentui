import { makeClasses } from '@fluentui/react-theme-provider';
import { CommandBarButtonState } from './CommandBarButton.types';

const GlobalClassNames = {
  root: 'ms-Button',
  contentContainer: 'ms-Button-contentContainer',
  secondaryContent: 'ms-Button-secondaryContent',
};

export const useCompoundButtonClasses = makeClasses<CommandBarButtonState>({
  root: [
    GlobalClassNames.root,
    {
      '--button-height': 'auto',
      '--button-maxWidth': '280px',
      '--button-minWidth': '72px',
      '--button-paddingBottom': '16px',
      '--button-paddingLeft': '12px',
      '--button-paddingRight': '12px',
      '--button-paddingTop': '16px',

      '&:hover': {
        '--button-secondaryContentColor': 'var(--button-hovered-secondaryContentColor)',
      },

      '&:active': {
        '--button-secondaryContentColor': 'var(--button-pressed-secondaryContentColor)',
      },
    },
  ],

  contentContainer: [
    GlobalClassNames.contentContainer,
    {
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'left',
    },
  ],

  secondaryContent: [
    GlobalClassNames.secondaryContent,
    {
      color: 'var(--button-secondaryContentColor)',
      fontSize: 'var(--button-secondaryContentFontSize)',
      lineHeight: '100%',
    },
  ],

  _iconOnly: {
    '--button-minHeight': 'var(--button-size-regular)',
    '--button-padding': 0,
    '--button-width': 'var(--button-minHeight)',
  },

  _ghost: {
    '--button-secondaryContentColor': 'var(--ghost-secondaryContentColor)',
    '--button-focused-secondaryContentColor': 'var(--ghost-focused-secondaryContentColor)',
    '--button-hovered-secondaryContentColor': 'var(--ghost-hovered-secondaryContentColor)',
    '--button-pressed-secondaryContentColor': 'var(--ghost-pressed-secondaryContentColor)',
  },

  _primary: {
    '--button-secondaryContentColor': 'var(--color-brand-secondaryContentColor)',
    '--button-focused-secondaryContentColor': 'var(--color-brand-focused-secondaryContentColor)',
    '--button-hovered-secondaryContentColor': 'var(--color-brand-hovered-secondaryContentColor)',
    '--button-pressed-secondaryContentColor': 'var(--color-brand-pressed-secondaryContentColor)',
  },

  _disabled: {
    '--button-secondaryContentColor': 'var(--button-disabled-secondaryContentColor)',
  },
});
