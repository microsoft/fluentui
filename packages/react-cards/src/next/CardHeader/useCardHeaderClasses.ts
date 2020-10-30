import { makeClasses } from '@fluentui/react-theme-provider';
import { CardSectionState } from '../CardSection/CardSection.types';

const GlobalClassNames = {
  root: 'ms-CardHeader',
};

export const useCardHeaderClasses = makeClasses<CardSectionState>({
  root: [
    GlobalClassNames.root,
    {
      display: 'flex',
      flexDirection: 'column',
      margin: 'var(--card-header-margin)',

      '--card-header-margin': 'var(--card-section-margin)',
    },
  ],

  _fitted: {
    '--card-header-margin': 'var(--card-header-fitted-margin)',
    '--card-header-fitted-margin': 'var(--card-section-fitted-margin)',
  },
});
