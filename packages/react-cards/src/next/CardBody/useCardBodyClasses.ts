import { makeClasses } from '@fluentui/react-theme-provider';
import { CardSectionState } from '../CardSection/CardSection.types';

const GlobalClassNames = {
  root: 'ms-CardBody',
};

export const useCardBodyClasses = makeClasses<CardSectionState>({
  root: [
    GlobalClassNames.root,
    {
      display: 'flex',
      flexDirection: 'column',
      margin: 'var(--card-body-margin)',

      '--card-body-margin': 'var(--card-section-margin)',
    },
  ],

  _fitted: {
    '--card-body-margin': 'var(--card-body-fitted-margin)',
    '--card-body-fitted-margin': 'var(--card-section-fitted-margin)',
  },
});
