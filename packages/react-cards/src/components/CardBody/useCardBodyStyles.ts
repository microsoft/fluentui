import { ax, makeStylesCompat } from '@fluentui/react-make-styles';
import { CardSectionState } from '../CardSection/CardSection.types';

const useRootStyles = makeStylesCompat<CardSectionState>([
  [
    null,
    {
      display: 'flex',
      flexDirection: 'column',
      margin: 'var(--card-body-margin)',

      '--card-body-margin': 'var(--card-section-margin)',
    },
  ],

  [
    s => s.fitted,
    {
      '--card-body-margin': 'var(--card-body-fitted-margin)',
      '--card-body-fitted-margin': 'var(--card-section-fitted-margin)',
    },
  ],
]);

export function useCardBodyStyles(state: CardSectionState): CardSectionState {
  state.className = ax('ms-CardBody', useRootStyles(state), state.className);

  return state;
}
