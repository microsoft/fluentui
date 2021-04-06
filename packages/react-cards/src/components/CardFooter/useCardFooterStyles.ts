import { ax, makeStyles } from '@fluentui/react-make-styles';
import { CardSectionState } from '../CardSection/CardSection.types';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'var(--card-footer-margin)',

    '--card-footer-margin': 'var(--card-section-margin)',
  },
  fitted: {
    '--card-footer-margin': 'var(--card-footer-fitted-margin)',
    '--card-footer-fitted-margin': 'var(--card-section-fitted-margin)',
  },
});

export function useCardFooterStyles(state: CardSectionState): CardSectionState {
  const styles = useStyles();
  state.className = ax('ms-CardFooter', styles.root, state.fitted && styles.fitted, state.className);

  return state;
}
