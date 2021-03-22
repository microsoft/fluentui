import { ax, makeStyles } from '@fluentui/react-make-styles';
import { CardSectionState } from '../CardSection/CardSection.types';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'var(--card-body-margin)',

    '--card-body-margin': 'var(--card-section-margin)',
  },
  fitted: {
    '--card-body-margin': 'var(--card-body-fitted-margin)',
    '--card-body-fitted-margin': 'var(--card-section-fitted-margin)',
  },
});

export function useCardBodyStyles(state: CardSectionState): CardSectionState {
  const styles = useStyles();
  state.className = ax('ms-CardBody', styles.root, state.fitted && styles.fitted, state.className);

  return state;
}
