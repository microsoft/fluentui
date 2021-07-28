import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import { CardSectionState } from '../CardSection/CardSection.types';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'var(--card-header-margin)',

    '--card-header-margin': 'var(--card-section-margin)',
  },
  fitted: {
    '--card-header-margin': 'var(--card-header-fitted-margin)',
    '--card-header-fitted-margin': 'var(--card-section-fitted-margin)',
  },
});

export function useCardHeaderStyles(state: CardSectionState): CardSectionState {
  const styles = useStyles();
  state.className = mergeClasses('ms-CardHeader', styles.root, state.fitted && styles.fitted, state.className);

  return state;
}
