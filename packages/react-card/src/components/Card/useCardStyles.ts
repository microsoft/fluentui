import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import type { CardState } from './Card.types';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: theme => ({
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',

    boxShadow: theme.shadow4,
    color: theme.colorNeutralForeground1,
    backgroundColor: theme.colorNeutralBackground1,

    // Size: medium
    // TODO: Validate if we should use a token instead + the unit of said token
    // TODO: Explore alternate way of applying padding
    padding: '12px',
    gap: '12px',
    borderRadius: theme.borderRadiusMedium,

    '> .fluentui-react-card-preview': {
      marginLeft: '-12px',
      marginRight: '-12px',
      '&:first-child': {
        marginTop: '-12px',
      },
    },
  }),

  interactive: theme => ({
    cursor: 'pointer',
    ':hover': {
      backgroundColor: theme.colorNeutralBackground1Hover,
    },
    ':active': {
      backgroundColor: theme.colorNeutralBackground1Pressed,
    },
  }),
});

/**
 * Apply styling to the Card slots based on the state
 */
export const useCardStyles = (state: CardState): CardState => {
  const styles = useStyles();
  state.root.className = mergeClasses(
    styles.root,
    (state.root.onClick ||
      state.root.onMouseUp ||
      state.root.onMouseDown ||
      state.root.onPointerUp ||
      state.root.onPointerDown ||
      state.root.onTouchStart ||
      state.root.onTouchEnd) &&
      styles.interactive,
    state.root.className,
  );

  return state;
};
