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

const useRootStyles = makeStyles({
  // In vertical layout, the field is a simple stack.
  vertical: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
  },

  // In horizontal layout, the field is a grid with the label taking up the entire first column.
  // The last row is slack space in case the label is taller than the rest of the content.
  horizontal: {
    display: 'grid',
    justifyItems: 'start',
    gridTemplateColumns: '33% 1fr',
    gridTemplateRows: 'auto auto auto 1fr',
  },

  // In horizontal layout without a label, replace the label's column with padding.
  // This lets grid auto-flow properly place the control, and keeps fields with and without labels aligned.
  horizontalNoLabel: {
    paddingLeft: '33%',
    gridTemplateColumns: '1fr',
  },
});

const useLabelStyles = makeStyles({
  base: {
    marginTop: tokens.spacingVerticalXXS,
    marginBottom: tokens.spacingVerticalXXS,
  },

  horizontal: {
    marginRight: tokens.spacingHorizontalM,
    gridRowStart: '1',
    gridRowEnd: '-1',
    alignSelf: 'start',
    justifySelf: 'stretch',
  },
});

const useMessageTextBaseClassName = makeResetStyles({
  position: 'relative',
  marginTop: tokens.spacingVerticalXXS,
  color: tokens.colorNeutralForeground3,
  ...typographyStyles.caption1,
});

const useMessageTextStyles = makeStyles({
  error: {
    color: tokens.colorPaletteRedForeground1,
  },

  withIcon: {
    paddingLeft: `calc(${iconSize} + ${tokens.spacingHorizontalXS})`,
  },
});

const useIconBaseClassName = makeResetStyles({
  position: 'absolute',
  left: 0,
  top: tokens.spacingVerticalXXS,
  width: iconSize,
  height: iconSize,
  fontSize: iconSize,
  lineHeight: iconSize,
});

const useIconStyles = makeStyles({
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
    horizontal ? rootStyles.horizontal : rootStyles.vertical,
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
      state.label.className,
    );
  }

  const iconBaseClassName = useIconBaseClassName();
  const iconStyles = useIconStyles();
  if (state.validationMessageIcon) {
    state.validationMessageIcon.className = mergeClasses(
      classNames.validationMessageIcon,
      iconBaseClassName,
      !!validationState && iconStyles[validationState],
      state.validationMessageIcon.className,
    );
  }

  const messageTextBaseClassName = useMessageTextBaseClassName();
  const messageTextStyles = useMessageTextStyles();
  if (state.validationMessage) {
    state.validationMessage.className = mergeClasses(
      classNames.validationMessage,
      messageTextBaseClassName,
      validationState === 'error' && messageTextStyles.error,
      !!state.validationMessageIcon && messageTextStyles.withIcon,
      state.validationMessage.className,
    );
  }

  if (state.hint) {
    state.hint.className = mergeClasses(classNames.hint, messageTextBaseClassName, state.hint.className);
  }
};
