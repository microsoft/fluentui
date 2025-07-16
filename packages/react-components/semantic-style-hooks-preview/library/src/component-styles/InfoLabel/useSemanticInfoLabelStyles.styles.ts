import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses } from '@griffel/react';
import { infoLabelClassNames, type InfoLabelState } from '@fluentui/react-infolabel';
import * as semanticTokens from '@fluentui/semantic-tokens';

const useLabelStyles = makeStyles({
  base: {
    verticalAlign: 'top',
    cursor: 'inherit',
    color: 'inherit',
  },
});

const useInfoButtonStyles = makeStyles({
  base: {
    verticalAlign: 'top',

    // Negative margin to align with the text
    marginTop: `calc(0px - ${semanticTokens.gapBetweenContentXSmall})`,
    marginBottom: `calc(0px - ${semanticTokens.gapBetweenContentXSmall})`,
  },

  large: {
    // Negative margin to align with the text
    marginTop: '-1px',
    marginBottom: '-1px',
  },
});

/**
 * Apply styling to the InfoLabel slots based on the state
 */
export const useSemanticInfoLabelStyles = (_state: unknown): InfoLabelState => {
  'use no memo';

  const state = _state as InfoLabelState;

  state.root.className = mergeClasses(infoLabelClassNames.root, state.root.className);

  const labelStyles = useLabelStyles();
  state.label.className = mergeClasses(infoLabelClassNames.label, labelStyles.base, state.label.className);

  const infoButtonStyles = useInfoButtonStyles();
  if (state.infoButton) {
    state.infoButton.className = mergeClasses(
      state.infoButton.className,
      infoLabelClassNames.infoButton,
      infoButtonStyles.base,
      state.size === 'large' && infoButtonStyles.large,
      getSlotClassNameProp_unstable(state.infoButton),
    );
  }

  return state;
};
