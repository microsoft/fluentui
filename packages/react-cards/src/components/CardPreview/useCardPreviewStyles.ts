import { ax, makeStyles } from '@fluentui/react-make-styles';
import { CardSectionState } from '../CardSection/CardSection.types';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'var(--card-preview-margin)',

    '--card-preview-margin': 'var(--card-section-margin)',
  },
  fitted: {
    '--card-preview-margin': 'var(--card-preview-fitted-margin)',
    '--card-preview-fitted-margin': 'var(--card-section-fitted-margin)',
  },
});

export function useCardPreviewStyles(state: CardSectionState): CardSectionState {
  const styles = useStyles();
  state.className = ax('ms-CardPreview', styles.root, state.fitted && styles.fitted, state.className);
  return state;
}
