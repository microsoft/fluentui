import { shorthands, makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { cardPreviewClassName } from '../CardPreview/index';
import type { CardState } from './Card.types';

export const cardClassName = 'fui-Card';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.overflow('hidden'),

    boxShadow: tokens.shadow4,
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,

    // Size: medium
    // TODO: Validate if we should use a token instead + the unit of said token
    // TODO: Explore alternate way of applying padding
    ...shorthands.padding('12px'),
    ...shorthands.gap('12px'),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),

    [`> .${cardPreviewClassName}`]: {
      marginLeft: '-12px',
      marginRight: '-12px',
      '&:first-child': {
        marginTop: '-12px',
      },
    },
  },

  interactive: {
    cursor: 'pointer',
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
    ':active': {
      backgroundColor: tokens.colorNeutralBackground1Pressed,
    },
  },
});

/**
 * Apply styling to the Card slots based on the state
 */
export const useCardStyles_unstable = (state: CardState): CardState => {
  const styles = useStyles();
  state.root.className = mergeClasses(
    cardClassName,
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
