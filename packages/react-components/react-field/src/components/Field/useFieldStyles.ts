import { tokens, typographyStyles } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses } from '@griffel/react';
import type { FieldControl, FieldProps, FieldSlots, FieldState } from './Field.types';

export const getFieldClassNames = (name: string): SlotClassNames<FieldSlots<FieldControl>> => ({
  root: `fui-${name}`,
  control: `fui-${name}__control`,
  label: `fui-${name}__label`,
  validationMessage: `fui-${name}__validationMessage`,
  validationMessageIcon: `fui-${name}__validationMessageIcon`,
  hint: `fui-${name}__hint`,
});

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  base: {
    display: 'grid',
    gridAutoFlow: 'row',
    gridTemplateColumns: 'auto 1fr',
    justifyItems: 'start',
  },

  horizontal: {
    gridTemplateRows: 'auto auto auto auto',
    gridTemplateColumns: '1fr auto 2fr',
  },

  fullWidth: {
    gridColumnStart: '1',
    gridColumnEnd: '-1',
  },

  secondColumn: {
    gridColumnStart: '2',
    gridColumnEnd: '-1',
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
    display: 'block',
    alignSelf: 'start',
    fontSize: '12px',
    lineHeight: '12px',
    marginRight: tokens.spacingHorizontalXS,
    marginTop: tokens.spacingVerticalXS,
  },

  horizontal: {
    gridColumnStart: 2,
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
export const useFieldStyles_unstable = <T extends FieldControl>(state: FieldState<T>) => {
  const classNames = state.classNames;
  const validationState: FieldProps<FieldControl>['validationState'] = state.validationState;
  const horizontal = state.orientation === 'horizontal';

  const rootStyles = useRootStyles();
  state.root.className = mergeClasses(
    classNames.root,
    rootStyles.base,
    horizontal && rootStyles.horizontal,
    state.root.className,
  );

  if (state.control) {
    state.control.className = mergeClasses(
      classNames.control,
      !horizontal && rootStyles.fullWidth,
      horizontal && rootStyles.secondColumn,
      state.control.className,
    );
  }

  const labelStyles = useLabelStyles();
  if (state.label) {
    state.label.className = mergeClasses(
      classNames.label,
      labelStyles.base,
      !horizontal && rootStyles.fullWidth,
      horizontal && labelStyles.horizontal,
      state.label.className,
    );
  }

  const validationMessageIconStyles = useValidationMessageIconStyles();
  if (state.validationMessageIcon) {
    state.validationMessageIcon.className = mergeClasses(
      classNames.validationMessageIcon,
      validationMessageIconStyles.base,
      horizontal && validationMessageIconStyles.horizontal,
      !!validationState && validationMessageIconStyles[validationState],
      state.validationMessageIcon.className,
    );
  }

  const secondaryTextStyles = useSecondaryTextStyles();
  if (state.validationMessage) {
    state.validationMessage.className = mergeClasses(
      classNames.validationMessage,
      secondaryTextStyles.base,
      validationState === 'error' && secondaryTextStyles.error,
      state.validationMessage.className,
    );
  }

  if (state.hint) {
    state.hint.className = mergeClasses(
      classNames.hint,
      secondaryTextStyles.base,
      rootStyles.fullWidth,
      horizontal && rootStyles.secondColumn,
      state.hint.className,
    );
  }
};
