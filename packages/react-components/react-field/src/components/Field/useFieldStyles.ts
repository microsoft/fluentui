import { tokens, typographyStyles } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses } from '@griffel/react';
import type { FieldSlots, FieldState } from './Field.types';

export const fieldClassNames: SlotClassNames<FieldSlots> = {
  root: `fui-Field`,
  control: `fui-Field__control`,
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
    gridTemplateColumns: 'auto 1fr',
    gridTemplateAreas: `
      "label label"
      "control control"
      "validationIcon validationMessage"
      "hint hint"
    `,
    justifyItems: 'start',
  },

  horizontal: {
    gridTemplateColumns: '33% auto 1fr',
    gridTemplateAreas: `
      "label control control"
      "label validationIcon validationMessage"
      "label hint hint"
      "label . ."
    `,
  },

  label: {
    gridColumnStart: 'label',
    gridColumnEnd: 'label',
    gridRowStart: 'label',
    gridRowEnd: 'label',
  },

  control: {
    gridColumnStart: 'control',
    gridColumnEnd: 'control',
  },

  validationIcon: {
    gridColumnStart: 'validationIcon',
    gridColumnEnd: 'validationIcon',
  },

  validationMessage: {
    gridColumnStart: 'validationMessage',
    gridColumnEnd: 'validationMessage',
  },

  hint: {
    gridColumnStart: 'hint',
    gridColumnEnd: 'hint',
  },
});

const useLabelStyles = makeStyles({
  base: {
    marginTop: tokens.spacingVerticalXXS,
    marginBottom: tokens.spacingVerticalXXS,
  },

  horizontal: {
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
    display: 'block',
    alignSelf: 'start',
    fontSize: '12px',
    lineHeight: '12px',
    marginRight: tokens.spacingHorizontalXS,
    marginTop: tokens.spacingVerticalXS,
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

  if (state.control) {
    state.control.className = mergeClasses(fieldClassNames.control, rootStyles.control, state.control.className);
  }
  const labelStyles = useLabelStyles();
  if (state.label) {
    state.label.className = mergeClasses(
      fieldClassNames.label,
      rootStyles.label,
      labelStyles.base,
      state.label.className,
    );
  }

  const validationMessageIconStyles = useValidationMessageIconStyles();
  if (state.validationMessageIcon) {
    state.validationMessageIcon.className = mergeClasses(
      fieldClassNames.validationMessageIcon,
      rootStyles.validationIcon,
      validationMessageIconStyles.base,
      !!validationState && validationMessageIconStyles[validationState],
      state.validationMessageIcon.className,
    );
  }

  const secondaryTextStyles = useSecondaryTextStyles();
  if (state.validationMessage) {
    state.validationMessage.className = mergeClasses(
      fieldClassNames.validationMessage,
      rootStyles.validationMessage,
      secondaryTextStyles.base,
      validationState === 'error' && secondaryTextStyles.error,
      state.validationMessage.className,
    );
  }

  if (state.hint) {
    state.hint.className = mergeClasses(
      fieldClassNames.hint,
      secondaryTextStyles.base,
      rootStyles.hint,
      state.hint.className,
    );
  }
};
