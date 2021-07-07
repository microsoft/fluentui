import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { CheckboxState } from './Checkbox.types';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: theme => ({
    display: 'flex',
    alignSelf: 'flex-start',
    padding: '4px',
    border: `2px solid transparent`,
    borderRadius: '4px',
    alignItems: 'center',
    ':global([data-keyboard-nav]) :focus-within': {
      border: `2px solid ${theme.alias.color.neutral.neutralForeground1}`,
    },
  }),

  input: {
    opacity: 0,
    margin: 0,
    padding: 0,
    cursor: 'pointer',
  },

  medium: {
    width: '16px',
    height: '16px',
  },

  large: {
    width: '20px',
    height: '20px',
  },

  checkbox: theme => ({
    borderRadius: theme.global.borderRadius.small,
    borderStyle: 'solid',
    boxSizing: 'border-box',
    display: 'flex',
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
  }),

  circular: theme => ({
    borderRadius: theme.global.borderRadius.circular,
  }),

  disabled: theme => ({
    borderColor: theme.alias.color.neutral.neutralStrokeDisabled,
    borderWidth: theme.global.strokeWidth.thin,
  }),

  unchecked: theme => ({
    borderColor: theme.alias.color.neutral.neutralStrokeAccessible,
    borderWidth: theme.global.strokeWidth.thin,
    ':hover': {
      borderColor: theme.alias.color.neutral.neutralStrokeAccessibleHover,
    },
    ':active': {
      borderColor: theme.alias.color.neutral.neutralStrokeAccessiblePressed,
    },
  }),

  checked: theme => ({
    backgroundColor: theme.alias.color.neutral.compoundBrandBackground,
    borderWidth: 0,
    ':hover': {
      backgroundColor: theme.alias.color.neutral.compoundBrandBackgroundHover,
    },
    ':active': {
      backgroundColor: theme.alias.color.neutral.compoundBrandBackgroundPressed,
    },
  }),

  mixed: theme => ({
    bordercolor: theme.alias.color.neutral.compoundBrandStroke,
    borderWidth: theme.global.strokeWidth.thin,
    ':hover': {
      borderColor: theme.alias.color.neutral.compoundBrandStrokeHover,
    },
    ':active': {
      borderColor: theme.alias.color.neutral.compoundBrandStrokePressed,
    },
  }),

  start: theme => ({
    // TODO: change this to Spacing horizontal M
    marginLeft: '12px',
  }),

  end: theme => ({
    // TODO: change this to Spacing horizontal M
    marginRight: '12px',
  }),
});

const useIconStyles = makeStyles({
  icon: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  disabled: theme => ({
    opacity: 1,
    color: theme.alias.color.neutral.neutralForegroundDisabled,
  }),

  medium: {
    width: '8px',
    height: '8px',
  },

  large: {
    width: '10px',
    height: '10px',
  },

  unchecked: theme => ({
    opacity: 0,
    ':hover': {
      opacity: 0,
    },
    ':active': {
      opacity: 0,
    },
  }),

  // TODO: change to NeutralForegroundOnBrand once it's added
  checked: theme => ({
    opacity: 1,
    color: theme.alias.color.neutral.neutralForegroundInverted,
    ':hover': {
      opacity: 1,
      color: theme.alias.color.neutral.neutralForegroundInverted,
    },
    ':active': {
      opacity: 1,
      color: theme.alias.color.neutral.neutralForegroundInverted,
    },
  }),

  mixed: theme => ({
    opacity: 1,
    color: theme.alias.color.neutral.compoundBrandForeground1,
    ':hover': {
      opacity: 1,
      color: theme.alias.color.neutral.compoundBrandForeground1Hover,
    },
    ':active': {
      opacity: 1,
      color: theme.alias.color.neutral.compoundBrandForeground1Pressed,
    },
  }),
});

const useLabelStyles = makeStyles({
  label: {
    userSelect: 'none',
    cursor: 'pointer',
  },

  disabled: theme => ({
    color: theme.alias.color.neutral.neutralForegroundDisabled,
    cursor: 'default',
  }),

  unchecked: theme => ({
    color: theme.alias.color.neutral.neutralForeground3,
    ':hover': {
      color: theme.alias.color.neutral.neutralForeground2,
    },
    ':active': {
      color: theme.alias.color.neutral.neutralForeground1,
    },
  }),

  checked: theme => ({
    color: theme.alias.color.neutral.neutralForeground1,
    ':hover': {
      color: theme.alias.color.neutral.neutralForeground1,
    },
    ':active': {
      color: theme.alias.color.neutral.neutralForeground1,
    },
  }),

  mixed: theme => ({
    color: theme.alias.color.neutral.neutralForeground3,
    ':hover': {
      color: theme.alias.color.neutral.neutralForeground3,
    },
    ':active': {
      color: theme.alias.color.neutral.neutralForeground3,
    },
  }),
});

/**
 * Apply styling to the Checkbox slots based on the state
 */
export const useCheckboxStyles = (state: CheckboxState): CheckboxState => {
  const mapCheckedStyle = (styles: Record<'mixed' | 'checked' | 'unchecked', string>, checked: typeof state.checked) =>
    checked === 'mixed' ? styles.mixed : checked ? styles.checked : styles.unchecked;
  const styles = useStyles();

  state.className = mergeClasses(styles.root, state.className);

  if (state.inputProps) {
    state.inputProps.className = mergeClasses(styles.input, state.size && styles[state.size]);
  }

  state.checkboxClassName = mergeClasses(
    styles[state.size],
    styles.checkbox,
    state.disabled && styles.disabled,
    state.circular && styles.circular,
    !state.disabled && mapCheckedStyle(styles, state.checked),
    !!state.children.children && styles[state.labelPosition],
  );

  const iconStyles = useIconStyles();

  state.iconClassName = mergeClasses(
    iconStyles.icon,
    state.disabled && iconStyles.disabled,
    state.disabled && !state.checked && iconStyles.unchecked,
    iconStyles[state.size],
    !state.disabled && mapCheckedStyle(iconStyles, state.checked),
  );

  const labelStyles = useLabelStyles();

  if (state.children) {
    state.children.className = mergeClasses(
      labelStyles.label,
      !state.disabled && mapCheckedStyle(labelStyles, state.checked),
      state.disabled && labelStyles.disabled,
    );
  }

  return state;
};
