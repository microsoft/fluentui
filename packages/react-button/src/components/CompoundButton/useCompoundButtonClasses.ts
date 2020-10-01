import { makeVariantClasses } from '@fluentui/react-theme-provider';
import { CompoundButtonState } from './CompoundButton.types';
import { useButtonClasses } from '../Button/useButtonClasses';

const GlobalClassNames = {
  root: 'ms-Button',
  contentContainer: 'ms-Button-contentContainer',
  secondaryContent: 'ms-Button-secondaryContent',
};

export const useClasses = makeVariantClasses<CompoundButtonState>({
  name: 'CompoundButton',
  prefix: '--button',
  styles: {
    root: [
      GlobalClassNames.root,
      {
        alignItems: 'flex-start',
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
        color: 'var(--button-secondaryContentColor, var(--button-contentColor))',
        fontSize: 'var(--button-secondaryContentFontSize)',
        fontWeight: 'var(--button-secondaryContentFontWeight)',
        lineHeight: '100%',
        marginTop: 'var(--button-secondaryContentGap)',

        [`${GlobalClassNames.root}:hover &`]: {
          color: 'var(--button-hovered-secondaryContentColor, var(--button-secondaryContentColor))',
        },

        [`${GlobalClassNames.root}:active &`]: {
          color:
            'var(--button-pressed-secondaryContentColor, ' +
            'var(--button-hovered-secondaryContentColor, ' +
            'var(--button-secondaryContentColor)))',
        },

        [`.${GlobalClassNames.root}[aria-disabled="true"] &`]: {
          color: 'var(--button-disabled-secondaryContentColor, var(--button-disabled-contentColor))',
        },
      },
    ],
  },
  variants: {
    root: {
      height: 'auto',
      maxWidth: '280px',
      minWidth: '72px',
      paddingBottom: '16px',
      paddingLeft: '12px',
      paddingRight: '12px',
      paddingTop: '16px',
      iconSize: '28px',
      secondaryContentGap: '4px',
      secondaryContentFontWeight: 'normal',

      disabled: {
        secondaryContentColor: 'var(--button-disabled-contentColor)',
      },
    },

    iconOnly: {
      minHeight: 'var(--button-size-regular)',
      width: 'var(--button-minHeight)',
      paddingBottom: 0,
      paddingTop: 0,
      paddingLeft: 0,
      paddingRight: 0,
    },

    ghost: {
      secondaryContentColor: 'var(--ghost-secondaryContentColor)',
      focused: {
        secondaryContentColor: 'var(--ghost-focused-secondaryContentColor)',
      },
      hovered: {
        secondaryContentColor: 'var(--ghost-hovered-secondaryContentColor)',
      },
      pressed: {
        secondaryContentColor: 'var(--ghost-pressed-secondaryContentColor)',
      },
    },

    primary: {
      secondaryContentColor: 'var(--color-brand-secondaryContentColor)',

      focused: {
        secondaryContentColor: 'var(--color-brand-focused-secondaryContentColor)',
      },

      hovered: {
        secondaryContentColor: 'var(--color-brand-hovered-secondaryContentColor)',
      },

      pressed: {
        secondaryContentColor: 'var(--color-brand-pressed-secondaryContentColor)',
      },
    },
  },
});

export const useCompoundButtonClasses = (state: CompoundButtonState) => {
  useButtonClasses(state);
  useClasses(state);
};
