import { tokens, typographyStyles } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses } from '@griffel/react';
import type { FieldSlots, FieldState } from './Field.types';

export const fieldClassNames: SlotClassNames<FieldSlots> = {
  root: `fui-Field`,
  label: `fui-Field__label`,
  validationMessage: `fui-Field__validationMessage`,
  validationMessageIcon: `fui-Field__validationMessageIcon`,
  hint: `fui-Field__hint`,
};

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  base: {
    display: 'grid',
    gridAutoFlow: 'row',
    justifyItems: 'start',
  },

  horizontal: {
    gridTemplateRows: 'auto auto auto auto',
    gridTemplateColumns: '1fr 2fr',
  },
});

const useLabelStyles = makeStyles({
  base: {
    marginTop: tokens.spacingVerticalXXS,
    marginBottom: tokens.spacingVerticalXXS,
  },

  horizontal: {
    gridRowStart: '1',
    gridRowEnd: '-1',
    marginRight: tokens.spacingHorizontalM,
    alignSelf: 'start',
    justifySelf: 'stretch',
  },
});

const useSecondaryTextStyles = makeStyles({
  base: {
    marginTop: tokens.spacingVerticalXXS,
    color: tokens.colorNeutralForeground3,
    ...typographyStyles.caption1,
  },

  error: {
    color: tokens.colorPaletteRedForeground1,
  },
});

const useValidationMessageIconStyles = makeStyles({
  base: {
    fontSize: '12px',
    lineHeight: '12px',
    verticalAlign: 'middle',
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
  const { validationState } = state;
  const horizontal = state.orientation === 'horizontal';

  const rootStyles = useRootStyles();
  state.root.className = mergeClasses(
    fieldClassNames.root,
    rootStyles.base,
    horizontal && rootStyles.horizontal,
    state.root.className,
  );

  const labelStyles = useLabelStyles();
  if (state.label) {
    state.label.className = mergeClasses(
      fieldClassNames.label,
      labelStyles.base,
      horizontal && labelStyles.horizontal,
      state.label.className,
    );
  }

  const validationMessageIconStyles = useValidationMessageIconStyles();
  if (state.validationMessageIcon) {
    state.validationMessageIcon.className = mergeClasses(
      fieldClassNames.validationMessageIcon,
      validationMessageIconStyles.base,
      !!validationState && validationMessageIconStyles[validationState],
      state.validationMessageIcon.className,
    );
  }

  const secondaryTextStyles = useSecondaryTextStyles();
  if (state.validationMessage) {
    state.validationMessage.className = mergeClasses(
      fieldClassNames.validationMessage,
      secondaryTextStyles.base,
      validationState === 'error' && secondaryTextStyles.error,
      state.validationMessage.className,
    );
  }

  if (state.hint) {
    state.hint.className = mergeClasses(fieldClassNames.hint, secondaryTextStyles.base, state.hint.className);
  }
};
