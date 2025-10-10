import { shorthands, mergeClasses, makeStyles } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { imageClassNames, type ImageState } from '@fluentui/react-image';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

const useStyles = makeStyles({
  // Base styles
  base: {
    ...shorthands.borderColor(semanticTokens.strokeCtrlOnNeutralRest),
    borderRadius: semanticTokens.cornerZero,

    boxSizing: 'border-box',
    display: 'inline-block',
  },

  // Bordered styles
  bordered: {
    ...shorthands.borderStyle('solid'),
    ...shorthands.borderWidth(semanticTokens.strokeWidthDefault),
  },

  // Shape variations
  circular: { borderRadius: semanticTokens.cornerCircular },
  rounded: { borderRadius: semanticTokens.cornerCtrlRest },
  square: {
    /* The square styles are exactly the same as the base styles. */
  },

  // Shadow styles
  shadow: {
    boxShadow: tokens.shadow4,
  },

  // Fit variations
  center: {
    objectFit: 'none',
    objectPosition: 'center',
    height: '100%',
    width: '100%',
  },
  contain: {
    objectFit: 'contain',
    objectPosition: 'center',
    height: '100%',
    width: '100%',
  },
  default: {
    /* The default styles are exactly the same as the base styles. */
  },
  cover: {
    objectFit: 'cover',
    objectPosition: 'center',
    height: '100%',
    width: '100%',
  },
  none: {
    objectFit: 'none',
    objectPosition: 'left top',
    height: '100%',
    width: '100%',
  },

  // Block styles
  block: {
    width: '100%',
  },
});

export const useSemanticImageStyles = (_state: unknown): ImageState => {
  'use no memo';

  const state = _state as ImageState;
  const styles = useStyles();

  state.root.className = mergeClasses(
    state.root.className,
    imageClassNames.root,
    styles.base,
    state.block && styles.block,
    state.bordered && styles.bordered,
    state.shadow && styles.shadow,
    styles[state.fit],
    styles[state.shape],
    getSlotClassNameProp_unstable(state.root),
  );

  return state;
};
