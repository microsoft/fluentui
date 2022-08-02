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

// TODO replace with shorthands.gridArea when it is available
// https://github.com/microsoft/griffel/issues/120
const gridArea = (area: string) => ({
  gridRowStart: area,
  gridRowEnd: area,
  gridColumnStart: area,
  gridColumnEnd: area,
});

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  base: {
    display: 'inline-grid',
    gridTemplateAreas: `
      "input"
      "statusText"
      "helperText"
    `,
  },

  'label-above': {
    gridTemplateAreas: `
      "label"
      "input"
      "statusText"
      "helperText"
    `,
  },

  'label-before': {
    gridTemplateAreas: `
      "label input"
      "label statusText"
      "label helperText"
    `,
  },
});

const useLabelStyles = makeStyles({
  base: {
    ...gridArea('label'),
  },

  above: {
    marginBottom: tokens.spacingVerticalXXS,
  },

  before: {
    marginRight: tokens.spacingHorizontalM,
  },
});

const useSecondaryTextStyles = makeStyles({
  base: {
    display: 'inline-flex',
    marginTop: tokens.spacingVerticalXXS,
    color: tokens.colorNeutralForeground3,
    ...typographyStyles.caption1,
  },

  statusText: {
    ...gridArea('statusText'),
  },
  helperText: {
    ...gridArea('helperText'),
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
    state.label ? rootStyles[`label-${state.labelPosition}`] : undefined,
    state.root.className,
  );

  const labelStyles = useLabelStyles();
  if (state.label) {
    state.label.className = mergeClasses(
      fieldClassNames.label,
      labelStyles.base,
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
      secondaryTextStyles.statusText,
      state.status === 'error' && secondaryTextStyles.error,
      state.statusText.className,
    );
  }

  if (state.helperText) {
    state.helperText.className = mergeClasses(
      fieldClassNames.helperText,
      secondaryTextStyles.base,
      secondaryTextStyles.helperText,
      state.helperText.className,
    );
  }
};
