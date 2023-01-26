import { tokens, typographyStyles } from '@fluentui/react-theme';
import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import type { FieldMessageSlots, FieldMessageState } from './FieldMessage.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const fieldMessageClassNames: SlotClassNames<FieldMessageSlots> = {
  root: 'fui-FieldMessage',
  icon: 'fui-FieldMessage__icon',
};

const iconSize = '12px';

const useRootBaseClassName = makeResetStyles({
  marginTop: tokens.spacingVerticalXXS,
  color: tokens.colorNeutralForeground3,
  ...typographyStyles.caption1,
});

const useIconBaseClassName = makeResetStyles({
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

// Styles based on state
const useStyles = makeStyles({
  error: {
    color: tokens.colorPaletteRedForeground1,
  },
  warning: {
    color: tokens.colorPaletteDarkOrangeForeground1,
  },
  success: {
    color: tokens.colorPaletteGreenForeground1,
  },

  withIcon: {
    // Add a gutter for the icon, to allow multiple lines of text to line up to the right of the icon.
    paddingLeft: `calc(${iconSize} + ${tokens.spacingHorizontalXS})`,
  },
});

/**
 * Apply styling to the FieldMessage slots based on the state
 */
export const useFieldMessageStyles_unstable = (state: FieldMessageState): FieldMessageState => {
  const { validationState } = state;

  const styles = useStyles();
  const rootBaseClassName = useRootBaseClassName();
  state.root.className = mergeClasses(
    fieldMessageClassNames.root,
    rootBaseClassName,
    validationState === 'error' && styles.error,
    !!state.icon && styles.withIcon,
    state.root.className,
  );

  const iconBaseClassName = useIconBaseClassName();
  if (state.icon) {
    state.icon.className = mergeClasses(
      fieldMessageClassNames.icon,
      iconBaseClassName,
      validationState !== 'neutral' && styles[validationState],
      state.icon.className,
    );
  }

  return state;
};
