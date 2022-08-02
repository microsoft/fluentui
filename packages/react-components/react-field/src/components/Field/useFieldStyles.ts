import { makeStyles, mergeClasses } from '@griffel/react';
import type { FieldSlots, FieldState } from './Field.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens, typographyStyles } from '@fluentui/react-theme';

export const fieldClassNames: SlotClassNames<FieldSlots> = {
  root: 'fui-Field',
  label: 'fui-Field__label',
  statusText: 'fui-Field__statusText',
  statusIcon: 'fui-Field__statusIcon',
  helperText: 'fui-Field__helperText',
};

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  base: {
    display: 'inline-grid',
    gridAutoFlow: 'row',
    justifyItems: 'start',
  },

  labelBefore: {
    gridTemplateRows: 'repeat(4, auto)',
    gridTemplateColumns: 'repeat(2, auto)',
  },
});

const useLabelStyles = makeStyles({
  above: {
    marginBottom: tokens.spacingVerticalXXS,
  },

  before: {
    marginRight: tokens.spacingHorizontalM,
    gridRowStart: '1',
    gridRowEnd: '-1',
  },
});

const useSecondaryTextStyles = makeStyles({
  base: {
    display: 'inline-flex',
    marginTop: tokens.spacingVerticalXXS,
    color: tokens.colorNeutralForeground3,
    ...typographyStyles.caption1,
  },

  error: {
    color: tokens.colorPaletteRedForeground1,
  },
});

const useStatusIconStyles = makeStyles({
  base: {
    fontSize: '12px',
    lineHeight: '12px',
    alignSelf: 'center',
    marginRight: tokens.spacingHorizontalXS,
  },

  error: {
    color: tokens.colorPaletteRedForeground1,
  },
  warning: {
    color: tokens.colorPaletteDarkOrangeForeground1,
  },
  success: {
    color: tokens.colorPaletteGreenForeground1,
  },
});

/**
 * Apply styling to the Field slots based on the state
 */
export const useFieldStyles_unstable = (state: FieldState) => {
  const rootStyles = useRootStyles();
  state.root.className = mergeClasses(
    fieldClassNames.root,
    rootStyles.base,
    state.label && state.labelPosition === 'before' && rootStyles.labelBefore,
    state.root.className,
  );

  const labelStyles = useLabelStyles();
  if (state.label) {
    state.label.className = mergeClasses(
      fieldClassNames.label,
      labelStyles[state.labelPosition],
      state.label.className,
    );
  }

  const statusIconStyles = useStatusIconStyles();
  if (state.statusIcon) {
    state.statusIcon.className = mergeClasses(
      fieldClassNames.statusIcon,
      statusIconStyles.base,
      !!state.status && statusIconStyles[state.status],
      state.statusIcon.className,
    );
  }

  const secondaryTextStyles = useSecondaryTextStyles();
  if (state.statusText) {
    state.statusText.className = mergeClasses(
      fieldClassNames.statusText,
      secondaryTextStyles.base,
      state.status === 'error' && secondaryTextStyles.error,
      state.statusText.className,
    );
  }

  if (state.helperText) {
    state.helperText.className = mergeClasses(
      fieldClassNames.helperText,
      secondaryTextStyles.base,
      state.helperText.className,
    );
  }
};
