import { makeStyles, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';

/**
 * Styles for the root slot
 */
export const useDrawerBaseStyles = makeStyles({
  root: {
    ...shorthands.padding(0),
    ...shorthands.overflow('hidden'),
    ...shorthands.borderRadius(0),
    ...shorthands.border(0),

    maxWidth: '100vw',
    height: 'auto',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: tokens.colorNeutralBackground1,
  },

  /* Positioning */
  start: {
    left: 0,
    right: 'auto',
  },
  end: {
    right: 0,
    left: 'auto',
  },

  /* Sizes */
  small: {
    width: '320px',
  },
  medium: {
    width: '592px',
  },
  large: {
    width: '940px',
  },
  full: {
    width: '100vw',
    maxWidth: '100vw',
  },
});
