import { tokens } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses } from '@griffel/react';
import type { InfoLabelSlots, InfoLabelState } from './InfoLabel.types';

export const infoLabelClassNames: SlotClassNames<InfoLabelSlots> = {
  root: 'fui-InfoLabel',
  label: 'fui-InfoLabel__label',
  infoButton: 'fui-InfoLabel__infoButton',
};

const useRootStyles = makeStyles({
  base: {
    // This padding must match the negative margin on infoButton
    paddingTop: tokens.spacingVerticalXXS,
    paddingBottom: tokens.spacingVerticalXXS,
  },

  large: {
    // This padding must match the negative margin on infoButton
    paddingTop: '1px',
    paddingBottom: '1px',
  },
});

const useLabelStyles = makeStyles({
  base: {
    verticalAlign: 'top',
  },
});

const useInfoButtonStyles = makeStyles({
  base: {
    verticalAlign: 'top',

    // Negative margin to offset the labelWrapper's padding
    marginTop: `calc(0px - ${tokens.spacingVerticalXXS})`,
    marginBottom: `calc(0px - ${tokens.spacingVerticalXXS})`,
  },

  large: {
    // Negative margin to offset the labelWrapper's padding
    marginTop: '-1px',
    marginBottom: '-1px',
  },
});

/**
 * Apply styling to the InfoLabel slots based on the state
 */
export const useInfoLabelStyles_unstable = (state: InfoLabelState): InfoLabelState => {
  const rootStyles = useRootStyles();
  state.root.className = mergeClasses(
    infoLabelClassNames.root,
    rootStyles.base,
    state.size === 'large' && rootStyles.large,
    state.root.className,
  );

  const labelStyles = useLabelStyles();
  state.label.className = mergeClasses(infoLabelClassNames.label, labelStyles.base, state.label.className);

  const infoButtonStyles = useInfoButtonStyles();
  if (state.infoButton) {
    state.infoButton.className = mergeClasses(
      infoLabelClassNames.infoButton,
      infoButtonStyles.base,
      state.size === 'large' && infoButtonStyles.large,
      state.infoButton.className,
    );
  }

  return state;
};
