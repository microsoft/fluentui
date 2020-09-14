import { makeClasses } from '@fluentui/react-theme-provider';
import { CardSectionState } from '../CardSection/CardSection.types';

const GlobalClassNames = {
  root: 'ms-CardPreview',
};

export const useCardPreviewClasses = makeClasses<CardSectionState>({
  root: [
    GlobalClassNames.root,
    {
      display: 'flex',
      flexDirection: 'column',
      margin: 'var(--card-preview-margin)',

      '--card-preview-margin': 'var(--card-section-margin)',
    },
  ],

  _fitted: {
    '--card-preview-margin': 'var(--card-preview-fitted-margin)',
    '--card-preview-fitted-margin': 'var(--card-section-fitted-margin)',
  },
});
