import { tokens, typographyStyles } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import type { FieldControl, FieldProps, FieldSlots, FieldState } from './Field.types';

export const getFieldClassNames = (name: string): SlotClassNames<FieldSlots<FieldControl>> => ({
  root: `fui-${name}`,
  control: `fui-${name}__control`,
  label: `fui-${name}__label`,
  validationMessage: `fui-${name}__validationMessage`,
  validationMessageIcon: `fui-${name}__validationMessageIcon`,
  hint: `fui-${name}__hint`,
});

// Size of the icon in the validation message
const iconSize = '12px';

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  base: {
    display: 'grid',
  },

  // In horizontal layout, the field is a grid with the label taking up the entire first column.
  // The last row is slack space in case the label is taller than the rest of the content.
  horizontal: {
    gridTemplateColumns: '33% 1fr',
    gridTemplateRows: 'auto auto auto 1fr',
  },

  // In horizontal layout without a label, replace the label's column with padding.
  // This lets grid auto-flow properly place the other children, and keeps fields with and without labels aligned.
  horizontalNoLabel: {
    paddingLeft: '33%',
    gridTemplateColumns: '1fr',
  },
});

const useLabelStyles = makeStyles({
  base: {
    paddingTop: tokens.spacingVerticalXXS,
    paddingBottom: tokens.spacingVerticalXXS,
  },

  large: {
    paddingTop: '1px',
    paddingBottom: '1px',
  },

  vertical: {
    marginBottom: tokens.spacingVerticalXXS,
  },

  verticalLarge: {
    marginBottom: tokens.spacingVerticalXS,
  },

  horizontal: {
    marginRight: tokens.spacingHorizontalM,
    gridRowStart: '1',
    gridRowEnd: '-1',
  },
});

const useSecondaryTextBaseClassName = makeResetStyles({
  marginTop: tokens.spacingVerticalXXS,
  color: tokens.colorNeutralForeground3,
  ...typographyStyles.caption1,
});

const useSecondaryTextStyles = makeStyles({
  error: {
    color: tokens.colorPaletteRedForeground1,
  },

  withIcon: {
    // Add a gutter for the icon, to allow multiple lines of text to line up to the right of the icon.
    paddingLeft: `calc(${iconSize} + ${tokens.spacingHorizontalXS})`,
  },
});

const useValidationMessageIconBaseClassName = makeResetStyles({
  display: 'inline-block',
  fontSize: iconSize,
  // Negative left margin puts the icon in the gutter of the validation message div's withIcon style.
  marginLeft: `calc(-${iconSize} - ${tokens.spacingHorizontalXS})`,
  marginRight: tokens.spacingHorizontalXS,
  // Line height of 0 prevents the verticalAlign from affecting the line height of the text.
  lineHeight: '0',
  // Negative verticalAlign shifts the inline icon down to align with the text (effectively top padding).
  verticalAlign: '-1px',
});

const useValidationMessageIconStyles = makeStyles({
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
    horizontal && !state.label && rootStyles.horizontalNoLabel,
    state.root.className,
  );

  if (state.control) {
    state.control.className = mergeClasses(classNames.control, state.control.className);
  }

  const labelStyles = useLabelStyles();
  if (state.label) {
    state.label.className = mergeClasses(
      classNames.label,
      labelStyles.base,
      horizontal && labelStyles.horizontal,
      !horizontal && labelStyles.vertical,
      state.label.size === 'large' && labelStyles.large,
      !horizontal && state.label.size === 'large' && labelStyles.verticalLarge,
      state.label.className,
    );
  }

  const validationMessageIconBaseClassName = useValidationMessageIconBaseClassName();
  const validationMessageIconStyles = useValidationMessageIconStyles();
  if (state.validationMessageIcon) {
    state.validationMessageIcon.className = mergeClasses(
      classNames.validationMessageIcon,
      validationMessageIconBaseClassName,
      !!validationState && validationMessageIconStyles[validationState],
      state.validationMessageIcon.className,
    );
  }

  const secondaryTextBaseClassName = useSecondaryTextBaseClassName();
  const secondaryTextStyles = useSecondaryTextStyles();
  if (state.validationMessage) {
    state.validationMessage.className = mergeClasses(
      classNames.validationMessage,
      secondaryTextBaseClassName,
      validationState === 'error' && secondaryTextStyles.error,
      !!state.validationMessageIcon && secondaryTextStyles.withIcon,
      state.validationMessage.className,
    );
  }

  if (state.hint) {
    state.hint.className = mergeClasses(classNames.hint, secondaryTextBaseClassName, state.hint.className);
  }
};
