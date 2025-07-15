import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import { type FieldState, fieldClassNames } from '@fluentui/react-field';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import * as semanticTokens from '@fluentui/semantic-tokens';

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
  vertical: {
    paddingTop: semanticTokens._ctrlFieldPaddingCtrlTextTop,
    paddingBottom: semanticTokens._ctrlFieldPaddingCtrlTextBottom,
    marginBottom: semanticTokens.gapBetweenContentXSmall,
  },

  verticalLarge: {
    paddingTop: semanticTokens._ctrlFieldPaddingCtrlLgTextTop,
    paddingBottom: semanticTokens._ctrlFieldPaddingCtrlLgTextBottom,
    marginBottom: semanticTokens._ctrlFieldGapBetweenContentXSmall,
  },

  horizontal: {
    paddingTop: semanticTokens._ctrlFieldPaddingCtrlTextTopHorizontal,
    paddingBottom: semanticTokens._ctrlFieldPaddingCtrlTextBottomHorizontal,
    marginRight: semanticTokens._ctrlFieldPaddingCtrlTextSide,
    gridRowStart: '1',
    gridRowEnd: '-1',
  },

  horizontalSmall: {
    paddingTop: semanticTokens._ctrlFieldPaddingCtrlSmTextTop,
    paddingBottom: semanticTokens._ctrlFieldPaddingCtrlSmTextBottom,
  },

  horizontalLarge: {
    // To align the label text with the Input text, it should be centered within the 40px height of the Input.
    // This is (40px - lineHeightBase400) / 2 = 9px. Hardcoded since there is no 9px padding token.
    paddingTop: semanticTokens._ctrlFieldPaddingCtrlLgTextTopHorizontal,
    paddingBottom: semanticTokens._ctrlFieldPaddingCtrlLgTextBottomHorizontal,
  },
});

const useSecondaryTextBaseClassName = makeResetStyles({
  marginTop: semanticTokens.gapBetweenContentXSmall,
  color: semanticTokens._ctrlFieldForegroundCtrlNeutralSecondaryRest,
  fontFamily: semanticTokens.textStyleDefaultRegularFontFamily,
  fontWeight: semanticTokens.textStyleDefaultRegularWeight,
  fontSize: semanticTokens.textRampMetadataFontSize,
  lineHeight: semanticTokens.textRampMetadataLineHeight,
});

const useSecondaryTextStyles = makeStyles({
  error: {
    color: semanticTokens._ctrlFieldStatusDangerTintForeground,
  },

  withIcon: {
    // Add a gutter for the icon, to allow multiple lines of text to line up to the right of the icon.
    paddingLeft: `calc(${iconSize} + ${semanticTokens.gapBetweenTextSmall})`,
  },
});

const useValidationMessageIconBaseClassName = makeResetStyles({
  display: 'inline-block',
  fontSize: iconSize,
  // Negative left margin puts the icon in the gutter of the validation message div's withIcon style.
  marginLeft: `calc(-${iconSize} - ${semanticTokens.gapBetweenTextSmall})`,
  marginRight: semanticTokens.gapBetweenTextSmall,
  // Line height of 0 prevents the verticalAlign from affecting the line height of the text.
  lineHeight: '0',
  // Negative verticalAlign shifts the inline icon down to align with the text (effectively top padding).
  verticalAlign: '-1px',
});

const useValidationMessageIconStyles = makeStyles({
  error: {
    color: semanticTokens._ctrlFieldStatusDangerTintForeground,
  },
  warning: {
    color: semanticTokens._ctrlFieldStatusWarningTintForeground,
  },
  success: {
    color: semanticTokens._ctrlFieldStatusSuccessTintForeground,
  },
});

/**
 * Apply styling to the Field slots based on the state
 */
export const useSemanticFieldStyles = (_state: unknown): FieldState => {
  'use no memo';

  const state = _state as FieldState;
  const { validationState, size } = state;
  const horizontal = state.orientation === 'horizontal';

  const rootStyles = useRootStyles();
  state.root.className = mergeClasses(
    state.root.className,
    fieldClassNames.root,
    rootStyles.base,
    horizontal && rootStyles.horizontal,
    horizontal && !state.label && rootStyles.horizontalNoLabel,
    getSlotClassNameProp_unstable(state.root),
  );

  const labelStyles = useLabelStyles();
  if (state.label) {
    state.label.className = mergeClasses(
      state.label.className,
      fieldClassNames.label,
      horizontal && labelStyles.horizontal,
      horizontal && size === 'small' && labelStyles.horizontalSmall,
      horizontal && size === 'large' && labelStyles.horizontalLarge,
      !horizontal && labelStyles.vertical,
      !horizontal && size === 'large' && labelStyles.verticalLarge,
      getSlotClassNameProp_unstable(state.label),
    );
  }

  const validationMessageIconBaseClassName = useValidationMessageIconBaseClassName();
  const validationMessageIconStyles = useValidationMessageIconStyles();
  if (state.validationMessageIcon) {
    state.validationMessageIcon.className = mergeClasses(
      state.validationMessageIcon.className,
      fieldClassNames.validationMessageIcon,
      validationMessageIconBaseClassName,
      validationState !== 'none' && validationMessageIconStyles[validationState],
      getSlotClassNameProp_unstable(state.validationMessageIcon),
    );
  }

  const secondaryTextBaseClassName = useSecondaryTextBaseClassName();
  const secondaryTextStyles = useSecondaryTextStyles();
  if (state.validationMessage) {
    state.validationMessage.className = mergeClasses(
      state.validationMessage.className,
      fieldClassNames.validationMessage,
      secondaryTextBaseClassName,
      validationState === 'error' && secondaryTextStyles.error,
      !!state.validationMessageIcon && secondaryTextStyles.withIcon,
      getSlotClassNameProp_unstable(state.validationMessage),
    );
  }

  if (state.hint) {
    state.hint.className = mergeClasses(fieldClassNames.hint, secondaryTextBaseClassName, state.hint.className);
  }

  return state;
};
