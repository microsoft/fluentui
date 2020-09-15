import { makeClasses } from '@fluentui/react-theme-provider';
import { CardSectionState } from '../CardSection/CardSection.types';

const GlobalClassNames = {
  root: 'ms-CardFooter',
};

export const useCardFooterClasses = makeClasses<CardSectionState>({
  root: [
    GlobalClassNames.root,
    {
      display: 'flex',
      flexDirection: 'column',
      margin: 'var(--card-footer-margin)',

      '--card-footer-margin': 'var(--card-section-margin)',
    },
  ],

  _fitted: {
    '--card-footer-margin': 'var(--card-footer-fitted-margin)',
    '--card-footer-fitted-margin': 'var(--card-section-fitted-margin)',
  },
});
