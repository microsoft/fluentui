import { makeStyles, mergeClasses, tokens } from '@fluentui/react-components';
import { type CardState } from '@fluentui/react-components';

const useCardStyle = makeStyles({
  root: {
    backgroundColor: tokens.colorNeutralBackground3,
    width: '620px',
    maxWidth: '100%',
    margin: 'auto',
  },
});

export const useCardStyles = (state: unknown) => {
  const cardStyles = useCardStyle();
  const componentState = state as CardState;
  componentState.root.className = mergeClasses(componentState.root.className, cardStyles.root);
};
