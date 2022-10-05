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

  fixed: {
    alignSelf: 'start',
  },
  scaled: {
    alignSelf: 'center',
  },
});

/**
 * Apply styling to the Persona slots based on the state
 */
export const usePersonaStyles_unstable = (state: PersonaState): PersonaState => {
  const { fixed, textPosition } = state;
  const styles = useStyles();
  const { primaryTextClassName, optionalTextClassName } = useTextClassNames(state);

  state.root.className = mergeClasses(personaClassNames.root, styles.root, styles[textPosition], state.root.className);

  if (state.avatar) {
    state.avatar.className = mergeClasses(
      personaClassNames.avatar,
      styles.coin,
      fixed ? styles.fixed : styles.scaled,
      state.avatar.className,
    );
  }

  if (state.presence) {
    state.presence.className = mergeClasses(
      personaClassNames.presence,
      styles.coin,
      fixed ? styles.fixed : styles.scaled,
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
  subtitle1: typographyStyles.subtitle1,
  title2: typographyStyles.title2,
  title3: typographyStyles.title3,
});

const useTextClassNames = (
  state: PersonaState,
): {
  primaryTextClassName: string;
  optionalTextClassName: string;
} => {
  const { fixed, numTextLines, presenceOnly } = state;
  const textStyles = useTextStyles();
  let primaryTextSize;
  let optionalTextSize;

  if (fixed) {
    if (state.avatar && state.avatar.size) {
      const { size } = state.avatar;

      if (size < 40) {
        primaryTextSize = textStyles.body1;
        optionalTextSize = textStyles.caption1;
      } else if (size < 64) {
        primaryTextSize = textStyles.subtitle2;
        optionalTextSize = textStyles.body1;
      } else if (size < 96) {
        primaryTextSize = textStyles.subtitle1;
        optionalTextSize = textStyles.caption1;
      } else {
        if (numTextLines > 1) {
          primaryTextSize = textStyles.title3;
        } else {
          primaryTextSize = textStyles.title2;
        }
        optionalTextSize = textStyles.body1;
      }
    } else if (presenceOnly && state.presence) {
      const { size } = state.presence;

      if (size === 'extra-small' || size === 'tiny') {
        if (numTextLines > 1) {
          primaryTextSize = textStyles.body1;
        } else {
          primaryTextSize = textStyles.caption1;
        }
        optionalTextSize = textStyles.caption1;
      } else {
        primaryTextSize = textStyles.body1;
        optionalTextSize = textStyles.caption1;
      }
    }
  } else {
    if (numTextLines > 1) {
      primaryTextSize = textStyles.body1;
    } else {
      primaryTextSize = textStyles.caption1;
    }
    optionalTextSize = textStyles.caption1;
  }

  return {
    primaryTextClassName: mergeClasses(textStyles.base, textStyles.primaryText, primaryTextSize),
    optionalTextClassName: mergeClasses(textStyles.base, textStyles.optionalText, optionalTextSize),
  };
};
