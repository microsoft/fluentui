import { ax, makeStyles } from '@fluentui/react-make-styles';
import { CardSectionState } from '../CardSection/CardSection.types';

const useRootStyles = makeStyles<CardSectionState>([
  [
    null,
    {
      display: 'flex',
      flexDirection: 'column',
      margin: 'var(--card-preview-margin)',

      '--card-preview-margin': 'var(--card-section-margin)',
    },
  ],
  [
    s => s.fitted,
    {
      '--card-preview-margin': 'var(--card-preview-fitted-margin)',
      '--card-preview-fitted-margin': 'var(--card-section-fitted-margin)',
    },
  ],
]);

export function useCardPreviewStyles(state: CardSectionState): CardSectionState {
  state.className = ax('ms-CardPreview', useRootStyles(state), state.className);

  return state;
}
