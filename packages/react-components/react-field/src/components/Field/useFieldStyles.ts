import { makeStyles, mergeClasses } from '@griffel/react';
import type { FieldComponent, FieldProps, FieldSlots, FieldState } from './Field.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens, typographyStyles } from '@fluentui/react-theme';

export const getFieldClassNames = (name: string): SlotClassNames<FieldSlots<FieldComponent>> => ({
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
    justifyItems: 'start',
  },

  horizontal: {
    gridTemplateRows: 'auto auto auto auto',
    gridTemplateColumns: '1fr 2fr',
  },

  secondColumn: {
    gridColumnStart: '2',
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
export const useFieldStyles_unstable = <T extends FieldComponent>(state: FieldState<T>) => {
  const classNames = state.classNames;
  const validationState: FieldProps<FieldComponent>['validationState'] = state.validationState;
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
      horizontal && rootStyles.secondColumn,
      state.control.className,
    );
  }

  const labelStyles = useLabelStyles();
  if (state.label) {
    state.label.className = mergeClasses(
      classNames.label,
      labelStyles.base,
      horizontal && labelStyles.horizontal,
      state.label.className,
    );
  }

  const validationMessageIconStyles = useValidationMessageIconStyles();
  if (state.validationMessageIcon) {
    state.validationMessageIcon.className = mergeClasses(
      classNames.validationMessageIcon,
      validationMessageIconStyles.base,
      !!validationState && validationMessageIconStyles[validationState],
      state.validationMessageIcon.className,
    );
  }

  const secondaryTextStyles = useSecondaryTextStyles();
  if (state.validationMessage) {
    state.validationMessage.className = mergeClasses(
      classNames.validationMessage,
      secondaryTextStyles.base,
      horizontal && rootStyles.secondColumn,
      validationState === 'error' && secondaryTextStyles.error,
      state.validationMessage.className,
    );
  }

  if (state.hint) {
    state.hint.className = mergeClasses(
      classNames.hint,
      secondaryTextStyles.base,
      horizontal && rootStyles.secondColumn,
      state.hint.className,
    );
  }
};
