import { ax, makeStyles } from '@fluentui/react-make-styles';
import { CardSectionState } from '../CardSection/CardSection.types';

export const useRootStyles = makeStyles<CardSectionState>([
  [
    null,
    {
      display: 'flex',
      flexDirection: 'column',
      margin: 'var(--card-header-margin)',

      '--card-header-margin': 'var(--card-section-margin)',
    },
  ],

  [
    (s) => s.fitted,
    {
      '--card-header-margin': 'var(--card-header-fitted-margin)',
      '--card-header-fitted-margin': 'var(--card-section-fitted-margin)',
    },
  ],
]);

export function useCardHeaderStyles(state: CardSectionState): CardSectionState {
  state.className = ax('ms-CardHeader', useRootStyles(state), state.className);

  return state;
}
