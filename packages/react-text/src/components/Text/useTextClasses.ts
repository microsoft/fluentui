/* eslint-disable @typescript-eslint/naming-convention */
import { makeClasses } from '@fluentui/react-theme-provider';

const GlobalClassNames = {
  root: 'ms-Text',
};

export const useTextClasses = makeClasses({
  root: [
    GlobalClassNames.root,
    {
      fontSize: 'var(--text-fontSize)',
      fontWeight: 'var(--text-fontWeight)',
      lineHeight: 'var(--text-lineHeight)',
    },
  ],

  _variant_caption: {
    '--text-fontSize': 'var(--text-variant-caption-fontSize)',
    '--text-lineHeight': 'var(--text-variant-caption-lineHeight)',
    '--text-fontWeight': 'var(--text-variant-caption-fontWeight)',
  },
  _variant_body: {
    '--text-fontSize': 'var(--text-variant-body-fontSize)',
    '--text-lineHeight': 'var(--text-variant-body-lineHeight)',
    '--text-fontWeight': 'var(--text-variant-body-fontWeight)',
  },

  _variant_subHeadline: {
    '--text-fontSize': 'var(--text-variant-subHeadline-fontSize)',
    '--text-lineHeight': 'var(--text-variant-subHeadline-lineHeight)',
    '--text-fontWeight': 'var(--text-variant-subHeadline-fontWeight)',
  },
  _variant_headline: {
    '--text-fontSize': 'var(--text-variant-headline-fontSize)',
    '--text-lineHeight': 'var(--text-variant-headline-lineHeight)',
    '--text-fontWeight': 'var(--text-variant-headline-fontWeight)',
  },

  _variant_title3: {
    '--text-fontSize': 'var(--text-variant-title3-fontSize)',
    '--text-lineHeight': 'var(--text-variant-title3-lineHeight)',
    '--text-fontWeight': 'var(--text-variant-title3-fontWeight)',
  },
  _variant_title2: {
    '--text-fontSize': 'var(--text-variant-title2-fontSize)',
    '--text-lineHeight': 'var(--text-variant-title2-lineHeight)',
    '--text-fontWeight': 'var(--text-variant-title2-fontWeight)',
  },
  _variant_title1: {
    '--text-fontSize': 'var(--text-variant-title1-fontSize)',
    '--text-lineHeight': 'var(--text-variant-title1-lineHeight)',
    '--text-fontWeight': 'var(--text-variant-title1-fontWeight)',
  },

  _variant_largeTitle: {
    '--text-fontSize': 'var(--text-variant-largeTitle-fontSize)',
    '--text-lineHeight': 'var(--text-variant-largeTitle-lineHeight)',
    '--text-fontWeight': 'var(--text-variant-largeTitle-fontWeight)',
  },
  _variant_display: {
    '--text-fontSize': 'var(--text-variant-display-fontSize)',
    '--text-lineHeight': 'var(--text-variant-display-lineHeight)',
    '--text-fontWeight': 'var(--text-variant-display-fontWeight)',
  },
});
