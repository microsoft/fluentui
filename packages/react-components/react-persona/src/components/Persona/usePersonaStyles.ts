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
  root: {
    display: 'inline-grid',
    gridAutoColumns: 'max-content',
    gridAutoRows: 'max-content',
  },
  after: {
    gridAutoFlow: 'column',
    justifyItems: 'start',
    columnGap: '8px',
  },
  before: {
    gridAutoFlow: 'column',
    justifyItems: 'end',
    columnGap: '8px',
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
  '2-extra-large': {
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
    [horizontalCoinSpacingVar]: tokens.spacingHorizontalSNudge,
  },
  large: {
    [horizontalCoinSpacingVar]: tokens.spacingHorizontalSNudge,
  },
  'extra-large': {
    [horizontalCoinSpacingVar]: tokens.spacingHorizontalSNudge,
  },
  '2-extra-large': {
    [horizontalCoinSpacingVar]: tokens.spacingHorizontalSNudge,
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

const usePresenceVerticalSpacingStyles = makeStyles({
  'extra-small': {
    marginTop: tokens.spacingHorizontalSNudge,
  },
  small: {
    marginTop: tokens.spacingHorizontalSNudge,
  },
  medium: {
    marginTop: tokens.spacingHorizontalSNudge,
  },
  large: {
    marginTop: tokens.spacingHorizontalSNudge,
  },
  'extra-large': {
    marginTop: tokens.spacingHorizontalSNudge,
  },
  '2-extra-large': {
    marginTop: tokens.spacingHorizontalSNudge,
  },
});

/**
 * Apply styling to the Persona slots based on the state
 */
export const usePersonaStyles_unstable = (state: PersonaState): PersonaState => {
  const { size, textAlignment, textPosition } = state;
  const { primaryTextClassName, optionalTextClassName } = useTextClassNames(state);

  const styles = useStyles();
  const avatarSpacingStyles = useAvatarSpacingStyles();
  const presenceVerticalSpacingStyles = usePresenceVerticalSpacingStyles();
  const presenceHorizontalSpacingStyles = usePresenceHorizontalSpacingStyles();

  state.root.className = mergeClasses(personaClassNames.root, styles.root, styles[textPosition], state.root.className);

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
      textAlignment === 'start' && presenceVerticalSpacingStyles[size],
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

  body1: typographyStyles.body1,
  caption1: typographyStyles.caption1,
  subtitle2: typographyStyles.subtitle2,
});

const useTextClassNames = (
  state: PersonaState,
): {
  primaryTextClassName: string;
  optionalTextClassName: string;
} => {
  const { presenceOnly, size } = state;
  const multiline = state.numTextLines > 1;
  const textStyles = useTextStyles();
  let primaryTextSize;
  let optionalTextSize;

  if (presenceOnly) {
    switch (size) {
      case 'extra-small':
        primaryTextSize = multiline ? textStyles.body1 : textStyles.caption1;
        optionalTextSize = textStyles.caption1;
        break;
      case 'small':
      case 'medium':
      case 'large':
      case 'extra-large':
      case '2-extra-large':
        primaryTextSize = textStyles.body1;
        optionalTextSize = textStyles.caption1;
        break;
    }
  } else {
    switch (size) {
      case 'extra-small':
      case 'small':
      case 'medium':
      case 'large':
        primaryTextSize = textStyles.body1;
        optionalTextSize = textStyles.caption1;
        break;
      case 'extra-large':
        primaryTextSize = textStyles.subtitle2;
        optionalTextSize = textStyles.caption1;
        break;
      case '2-extra-large':
        primaryTextSize = textStyles.subtitle2;
        optionalTextSize = textStyles.body1;
        break;
    }
  }

  return {
    primaryTextClassName: mergeClasses(textStyles.base, textStyles.primaryText, primaryTextSize),
    optionalTextClassName: mergeClasses(textStyles.base, textStyles.optionalText, optionalTextSize),
  };
};
