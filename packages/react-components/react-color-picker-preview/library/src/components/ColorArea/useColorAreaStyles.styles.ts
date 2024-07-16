import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ColorAreaSlots, ColorAreaState } from './ColorArea.types';

export const colorAreaClassNames: SlotClassNames<ColorAreaSlots> = {
  root: 'fui-ColorArea',
  description: 'fui-ColorArea__description',
  light: 'fui-ColorArea__light',
  dark: 'fui-ColorArea__dark',
  thumb: 'fui-ColorArea__thumb',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    backgroundColor: 'red', // make as a parameter
    position: 'relative',
    marginBottom: '8px',
    border: `1px solid #ccc`,
    borderRadius: '2px',
    minWidth: '200px',
    minHeight: '200px',
    width: '200px',
    height: '200px',
    outline: 'none',
  },
  description: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    margin: '-1px',
    padding: '0px',
    border: '0px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  dark: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: 'linear-gradient(to bottom, transparent 0, #000 100%)',
  },
  light: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    // Intentionally DO NOT flip the color picker in RTL: its orientation is not very meaningful,
    // and getting all the math and styles flipped correctly is tricky
    background: 'linear-gradient(to right, white 0%, transparent 100%) /*@noflip*/',
  },
  thumb: {
    position: 'absolute',
    width: '20px',
    height: '20px',
    background: 'white',
    border: `1px solid #ccc`,
    borderRadius: '50%',
    boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.1)',
    transform: 'translate(-50%, -50%)',
    selectors: {
      ':before': {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        border: `2px solid #fff`,
        borderRadius: '50%',
        boxSizing: 'border-box',
        content: '""',
      },
    },
  },
});

/**
 * Apply styling to the ColorArea slots based on the state
 */
export const useColorAreaStyles_unstable = (state: ColorAreaState): ColorAreaState => {
  'use no memo';

  const styles = useStyles();
  state.root.className = mergeClasses(colorAreaClassNames.root, styles.root, state.root.className);

  if (state.description) {
    state.description.className = mergeClasses(styles.description, state.description.className);
  }

  if (state.dark) {
    state.dark.className = mergeClasses(styles.dark, state.dark.className);
  }

  if (state.light) {
    state.light.className = mergeClasses(styles.light, state.light.className);
  }

  if (state.thumb) {
    state.thumb.className = mergeClasses(styles.thumb, state.thumb.className);
  }

  return state;
};
