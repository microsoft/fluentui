import { ax, makeStyles } from '@fluentui/react-make-styles';
import { CardSectionState } from '../CardSection/CardSection.types';

const useRootStyles = makeStyles<CardSectionState>([
  [
    null,
    {
      display: 'flex',
      flexDirection: 'column',
      margin: 'var(--card-footer-margin)',

      '--card-footer-margin': 'var(--card-section-margin)',
    },
  ],
  [
    s => s.fitted,
    {
      '--card-footer-margin': 'var(--card-footer-fitted-margin)',
      '--card-footer-fitted-margin': 'var(--card-section-fitted-margin)',
    },
  ],
]);

export function useCardFooterStyles(state: CardSectionState): CardSectionState {
  state.className = ax('ms-CardFooter', useRootStyles(state), state.className);

  return state;
}
