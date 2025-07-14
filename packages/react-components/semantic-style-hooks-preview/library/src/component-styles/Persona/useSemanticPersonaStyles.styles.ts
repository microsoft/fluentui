import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { personaClassNames, type PersonaState } from '@fluentui/react-persona';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import * as semanticTokens from '@fluentui/semantic-tokens';

const avatarSpacing = `--fui-Persona__avatar--spacing`;

const useRootClassName = makeResetStyles({
  display: 'inline-grid',
  gridAutoRows: 'max-content',
  gridAutoFlow: 'column',
  justifyItems: 'start',
  gridTemplateColumns: 'max-content [middle] auto',
});

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  beforeAfterCenter: {
    // This template is needed to make sure the Avatar is centered when it takes up more space than the text lines
    gridTemplateRows:
      '1fr [primary] max-content [secondary] max-content [tertiary] max-content [quaternary] max-content 1fr',
  },

  after: {
    // Intentionally empty
  },
  before: {
    justifyItems: 'end',
    gridTemplateColumns: 'auto [middle] max-content',
  },
  below: {
    gridAutoFlow: 'unset',
    justifyItems: 'center',
    gridTemplateColumns: 'unset',
  },

  media: {
    gridRowStart: 'span 5',
  },

  mediaBeforeAfterCenter: {
    gridRowStart: 'span 6',
  },

  start: {
    alignSelf: 'start',
  },
  center: {
    alignSelf: 'center',
  },

  afterAlignToPrimary: {
    alignSelf: 'center',
    gridRowStart: 'unset',
    gridColumnEnd: 'middle',
  },
  beforeAlignToPrimary: {
    alignSelf: 'center',
    gridRowStart: 'unset',
    gridColumnStart: 'middle',
  },

  secondLineSpacing: {
    marginTop: '-2px',
  },

  primary: { gridRowStart: 'primary' },
  secondary: { gridRowStart: 'secondary' },
  tertiary: { gridRowStart: 'tertiary' },
  quaternary: { gridRowStart: 'quaternary' },
});

const useAvatarSpacingStyles = makeStyles({
  'extra-small': {
    [avatarSpacing]: semanticTokens.gapInsideCtrlToLabel,
  },
  small: {
    [avatarSpacing]: semanticTokens.gapInsideCtrlLgToLabel,
  },
  medium: {
    [avatarSpacing]: semanticTokens.gapInsideCtrlLgToLabel,
  },
  large: {
    [avatarSpacing]: tokens.spacingHorizontalMNudge,
  },
  'extra-large': {
    [avatarSpacing]: tokens.spacingHorizontalMNudge,
  },
  huge: {
    [avatarSpacing]: semanticTokens.paddingCtrlHorizontalDefault,
  },
  after: {
    marginRight: `var(${avatarSpacing})`,
  },
  below: {
    marginBottom: `var(${avatarSpacing})`,
  },
  before: {
    marginLeft: `var(${avatarSpacing})`,
  },
});

const usePresenceSpacingStyles = makeStyles({
  small: {
    [avatarSpacing]: semanticTokens.gapInsideCtrlToLabel,
  },
});

/**
 * Apply styling to the Persona slots based on the state
 */
export const useSemanticPersonaStyles = (_state: unknown): PersonaState => {
  'use no memo';

  const state = _state as PersonaState;

  const { presenceOnly, size, textAlignment, textPosition } = state;

  const alignToPrimary = presenceOnly && textAlignment === 'start' && size !== 'extra-large' && size !== 'huge';
  const alignBeforeAfterCenter = textPosition !== 'below' && textAlignment === 'center';
  const { primaryTextClassName, optionalTextClassName } = useTextClassNames(state, alignToPrimary);

  const rootClassName = useRootClassName();
  const styles = useStyles();
  const avatarSpacingStyles = useAvatarSpacingStyles();
  const presenceSpacingStyles = { ...avatarSpacingStyles, ...usePresenceSpacingStyles() };

  state.root.className = mergeClasses(
    state.root.className,
    personaClassNames.root,
    rootClassName,
    alignBeforeAfterCenter && styles.beforeAfterCenter,
    styles[textPosition],
    getSlotClassNameProp_unstable(state.root),
  );

  if (state.avatar) {
    state.avatar.className = mergeClasses(
      state.avatar.className,
      personaClassNames.avatar,
      textPosition !== 'below' && styles.media,
      alignBeforeAfterCenter && styles.mediaBeforeAfterCenter,
      styles[textAlignment],
      avatarSpacingStyles[size],
      avatarSpacingStyles[textPosition],
      getSlotClassNameProp_unstable(state.avatar),
    );
  }

  if (state.presence) {
    state.presence.className = mergeClasses(
      state.presence.className,
      personaClassNames.presence,
      textPosition !== 'below' && styles.media,
      alignBeforeAfterCenter && styles.mediaBeforeAfterCenter,
      styles[textAlignment],
      presenceSpacingStyles[size],
      presenceSpacingStyles[textPosition],
      textPosition === 'after' && alignToPrimary && styles.afterAlignToPrimary,
      textPosition === 'before' && alignToPrimary && styles.beforeAlignToPrimary,
      getSlotClassNameProp_unstable(state.presence),
    );
  }

  if (state.primaryText) {
    state.primaryText.className = mergeClasses(
      state.primaryText.className,
      personaClassNames.primaryText,
      alignBeforeAfterCenter && styles.primary,
      primaryTextClassName,
      getSlotClassNameProp_unstable(state.primaryText),
    );
  }

  if (state.secondaryText) {
    state.secondaryText.className = mergeClasses(
      state.secondaryText.className,
      personaClassNames.secondaryText,
      alignBeforeAfterCenter && styles.secondary,
      optionalTextClassName,
      styles.secondLineSpacing,
      getSlotClassNameProp_unstable(state.secondaryText),
    );
  }

  if (state.tertiaryText) {
    state.tertiaryText.className = mergeClasses(
      state.tertiaryText.className,
      personaClassNames.tertiaryText,
      alignBeforeAfterCenter && styles.tertiary,
      optionalTextClassName,
      getSlotClassNameProp_unstable(state.tertiaryText),
    );
  }

  if (state.quaternaryText) {
    state.quaternaryText.className = mergeClasses(
      state.quaternaryText.className,
      personaClassNames.quaternaryText,
      alignBeforeAfterCenter && styles.quaternary,
      optionalTextClassName,
      getSlotClassNameProp_unstable(state.quaternaryText),
    );
  }

  return state;
};

const usePrimaryTextBaseClassName = makeResetStyles({
  display: 'block',
  color: semanticTokens.foregroundContentNeutralPrimary,
  fontFamily: semanticTokens.textStyleDefaultRegularFontFamily,
  fontSize: semanticTokens.ctrlAvatarTextFontSize,
  fontWeight: semanticTokens.textStyleDefaultRegularWeight,
  lineHeight: semanticTokens.textGlobalBody3LineHeight,
});

const useOptionalTextBaseClassName = makeResetStyles({
  display: 'block',
  color: semanticTokens.foregroundContentNeutralSecondary,
  fontFamily: semanticTokens.textStyleDefaultRegularFontFamily,
  fontSize: semanticTokens.textGlobalCaption1FontSize,
  fontWeight: semanticTokens.textStyleDefaultRegularWeight,
  lineHeight: semanticTokens.textGlobalCaption1LineHeight,
});

const useTextStyles = makeStyles({
  beforeAlignToPrimary: {
    gridColumnEnd: 'middle',
  },
  afterAlignToPrimary: {
    gridColumnStart: 'middle',
  },

  body1: {
    fontFamily: semanticTokens.textStyleDefaultRegularFontFamily,
    fontSize: semanticTokens.ctrlAvatarTextFontSize,
    fontWeight: semanticTokens.textStyleDefaultRegularWeight,
    lineHeight: semanticTokens.textGlobalBody3LineHeight,
  },
  caption1: {
    fontFamily: semanticTokens.textStyleDefaultRegularFontFamily,
    fontSize: semanticTokens.textGlobalCaption1FontSize,
    fontWeight: semanticTokens.textStyleDefaultRegularWeight,
    lineHeight: semanticTokens.textGlobalCaption1LineHeight,
  },
  subtitle2: {
    fontFamily: semanticTokens.textStyleDefaultRegularFontFamily,
    fontSize: semanticTokens.textGlobalBody2FontSize,
    fontWeight: semanticTokens.textStyleDefaultHeaderWeight,
    lineHeight: semanticTokens.textGlobalBody2LineHeight,
  },
});

const useTextClassNames = (
  state: PersonaState,
  alignToPrimary: boolean,
): {
  primaryTextClassName: string;
  optionalTextClassName: string;
} => {
  const { presenceOnly, size, textPosition } = state;
  const primaryTextBaseClassName = usePrimaryTextBaseClassName();
  const optionalTextBaseClassName = useOptionalTextBaseClassName();
  const textStyles = useTextStyles();

  let primaryTextSize;
  let alignToPrimaryClassName;

  if (presenceOnly) {
    if (size === 'extra-small') {
      primaryTextSize = state.numTextLines <= 1 && textStyles.caption1;
    } else if (size === 'extra-large' || size === 'huge') {
      primaryTextSize = textStyles.subtitle2;
    }

    if (alignToPrimary) {
      if (textPosition === 'before') {
        alignToPrimaryClassName = textStyles.beforeAlignToPrimary;
      } else if (textPosition === 'after') {
        alignToPrimaryClassName = textStyles.afterAlignToPrimary;
      }
    }
  } else {
    if (size === 'huge') {
      primaryTextSize = textStyles.subtitle2;
    } else if (size === 'extra-large') {
      primaryTextSize = textStyles.subtitle2;
    }
  }

  return {
    primaryTextClassName: mergeClasses(primaryTextBaseClassName, primaryTextSize, alignToPrimaryClassName),
    optionalTextClassName: mergeClasses(
      optionalTextBaseClassName,
      !presenceOnly && size === 'huge' && textStyles.body1,
      alignToPrimaryClassName,
    ),
  };
};
