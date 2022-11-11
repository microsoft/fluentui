import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import type { PersonaSlots, PersonaState } from './Persona.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const personaClassNames: SlotClassNames<PersonaSlots> = {
  root: 'fui-Persona',
  avatar: 'fui-Persona__avatar',
  presence: 'fui-Persona__presence',
  primaryText: 'fui-Persona__primaryText',
  secondaryText: 'fui-Persona__secondaryText',
  tertiaryText: 'fui-Persona__tertiaryText',
  quaternaryText: 'fui-Persona__quaternaryText',
};

const horizontalCoinSpacingVar = `--fui-Persona__coin--horizontalSpacing`;

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  base: {
    display: 'inline-grid',
    gridAutoColumns: 'max-content',
    gridAutoRows: 'max-content',
  },
  after: {
    gridAutoFlow: 'column',
    justifyItems: 'start',
  },
  before: {
    gridAutoFlow: 'column',
    justifyItems: 'end',
  },
  below: {
    justifyItems: 'center',
  },
  coin: {
    gridRowStart: 'span 5',
  },

  start: {
    alignSelf: 'start',
  },
  center: {
    alignSelf: 'center',
  },

  // These alignToPrimary styles are needed due to presence being too small to center with the primary text.
  alignToPrimary: {
    gridTemplateColumns: `max-content [middle] max-content`,
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
});

const useAvatarSpacingStyles = makeStyles({
  'extra-small': {
    [horizontalCoinSpacingVar]: tokens.spacingHorizontalSNudge,
  },
  small: {
    [horizontalCoinSpacingVar]: tokens.spacingHorizontalS,
  },
  medium: {
    [horizontalCoinSpacingVar]: tokens.spacingHorizontalS,
  },
  large: {
    [horizontalCoinSpacingVar]: tokens.spacingHorizontalMNudge,
  },
  'extra-large': {
    [horizontalCoinSpacingVar]: tokens.spacingHorizontalMNudge,
  },
  huge: {
    [horizontalCoinSpacingVar]: tokens.spacingHorizontalM,
  },
  after: {
    marginRight: `var(${horizontalCoinSpacingVar})`,
  },
  below: {
    marginBottom: `var(${horizontalCoinSpacingVar})`,
  },
  before: {
    marginLeft: `var(${horizontalCoinSpacingVar})`,
  },
});

const usePresenceHorizontalSpacingStyles = makeStyles({
  'extra-small': {
    [horizontalCoinSpacingVar]: tokens.spacingHorizontalSNudge,
  },
  small: {
    [horizontalCoinSpacingVar]: tokens.spacingHorizontalSNudge,
  },
  medium: {
    [horizontalCoinSpacingVar]: tokens.spacingHorizontalS,
  },
  large: {
    [horizontalCoinSpacingVar]: tokens.spacingHorizontalMNudge,
  },
  'extra-large': {
    [horizontalCoinSpacingVar]: tokens.spacingHorizontalMNudge,
  },
  huge: {
    [horizontalCoinSpacingVar]: tokens.spacingHorizontalM,
  },
  after: {
    marginRight: `var(${horizontalCoinSpacingVar})`,
  },
  below: {
    marginBottom: `var(${horizontalCoinSpacingVar})`,
  },
  before: {
    marginLeft: `var(${horizontalCoinSpacingVar})`,
  },
});

/**
 * Apply styling to the Persona slots based on the state
 */
export const usePersonaStyles_unstable = (state: PersonaState): PersonaState => {
  const { size, textAlignment, textPosition } = state;
  const alignToPrimary = textAlignment === 'start' && size !== 'extra-large' && size !== 'huge';
  const { primaryTextClassName, optionalTextClassName } = useTextClassNames(state, alignToPrimary);

  const styles = useStyles();
  const avatarSpacingStyles = useAvatarSpacingStyles();
  const presenceHorizontalSpacingStyles = usePresenceHorizontalSpacingStyles();

  state.root.className = mergeClasses(
    personaClassNames.root,
    styles.base,
    styles[textPosition],
    textPosition !== 'below' && alignToPrimary && styles.alignToPrimary,
    state.root.className,
  );

  if (state.avatar) {
    state.avatar.className = mergeClasses(
      personaClassNames.avatar,
      styles.coin,
      styles[textAlignment],
      avatarSpacingStyles[size],
      avatarSpacingStyles[textPosition],
      state.avatar.className,
    );
  }

  if (state.presence) {
    state.presence.className = mergeClasses(
      personaClassNames.presence,
      styles.coin,
      styles[textAlignment],
      presenceHorizontalSpacingStyles[size],
      presenceHorizontalSpacingStyles[textPosition],
      textPosition === 'after' && alignToPrimary && styles.afterAlignToPrimary,
      textPosition === 'before' && alignToPrimary && styles.beforeAlignToPrimary,
      state.presence.className,
    );
  }

  if (state.primaryText) {
    state.primaryText.className = mergeClasses(
      personaClassNames.primaryText,
      primaryTextClassName,
      state.primaryText.className,
    );
  }

  if (state.secondaryText) {
    state.secondaryText.className = mergeClasses(
      personaClassNames.secondaryText,
      optionalTextClassName,
      state.secondaryText.className,
    );
  }

  if (state.tertiaryText) {
    state.tertiaryText.className = mergeClasses(
      personaClassNames.tertiaryText,
      optionalTextClassName,
      state.tertiaryText.className,
    );
  }

  if (state.quaternaryText) {
    state.quaternaryText.className = mergeClasses(
      personaClassNames.quaternaryText,
      optionalTextClassName,
      state.quaternaryText.className,
    );
  }

  return state;
};

const useTextStyles = makeStyles({
  base: {
    display: 'block',
  },
  primaryText: {
    color: tokens.colorNeutralForeground1,
  },
  optionalText: {
    color: tokens.colorNeutralForeground2,
  },

  beforeAlignToPrimary: {
    gridColumnEnd: 'middle',
  },
  afterAlignToPrimary: {
    gridColumnStart: 'middle',
  },

  body1: typographyStyles.body1,
  caption1: typographyStyles.caption1,
  subtitle2: typographyStyles.subtitle2,
});

const useTextClassNames = (
  state: PersonaState,
  alignToPrimary: boolean,
): {
  primaryTextClassName: string;
  optionalTextClassName: string;
} => {
  const { presenceOnly, size, textPosition } = state;
  const textStyles = useTextStyles();

  let primaryTextSize;
  let optionalTextSize;
  let alignToPrimaryClassName;

  if (presenceOnly) {
    if (size === 'extra-small') {
      primaryTextSize = state.numTextLines > 1 ? textStyles.body1 : textStyles.caption1;
      optionalTextSize = textStyles.caption1;
    } else if (size === 'extra-large' || size === 'huge') {
      primaryTextSize = textStyles.subtitle2;
      optionalTextSize = textStyles.caption1;
    } else {
      primaryTextSize = textStyles.body1;
      optionalTextSize = textStyles.caption1;
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
      optionalTextSize = textStyles.body1;
    } else if (size === 'extra-large') {
      primaryTextSize = textStyles.subtitle2;
      optionalTextSize = textStyles.caption1;
    } else {
      primaryTextSize = textStyles.body1;
      optionalTextSize = textStyles.caption1;
    }
  }

  return {
    primaryTextClassName: mergeClasses(
      textStyles.base,
      textStyles.primaryText,
      primaryTextSize,
      alignToPrimaryClassName,
    ),
    optionalTextClassName: mergeClasses(
      textStyles.base,
      textStyles.optionalText,
      optionalTextSize,
      alignToPrimaryClassName,
    ),
  };
};
