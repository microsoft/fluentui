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
  },

  // labelPosition="above"
  above: {
    gridTemplateAreas: `
      "label"
      "input"
      "statusText"
      "helperText"
    `,
  },

  // labelPosition="before"
  before: {
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

const useExtraTextStyles = makeStyles({
  base: {
    display: 'inline-flex',
    marginTop: tokens.spacingVerticalXXS,
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
  warning: {
    color: tokens.colorPaletteDarkOrangeForeground1,
  },
  success: {
    color: tokens.colorPaletteGreenForeground1,
  },
});

const useStatusIconStyles = makeStyles({
  base: {
    fontSize: '12px',
    lineHeight: '12px',
    alignSelf: 'center',
    marginRight: tokens.spacingHorizontalXS,
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
    rootStyles[state.labelPosition],
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
      state.statusIcon.className,
    );
  }

  const extraTextStyles = useExtraTextStyles();
  if (state.statusText) {
    state.statusText.className = mergeClasses(
      fieldClassNames.statusText,
      extraTextStyles.base,
      extraTextStyles.statusText,
      !!state.status && extraTextStyles[state.status],
      state.statusText.className,
    );
  }

  if (state.helperText) {
    state.helperText.className = mergeClasses(
      fieldClassNames.helperText,
      extraTextStyles.base,
      extraTextStyles.helperText,
      state.helperText.className,
    );
  }
};
