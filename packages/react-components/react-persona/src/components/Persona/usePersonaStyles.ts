import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import type { PersonaSlots, PersonaState } from './Persona.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const personaClassNames: SlotClassNames<PersonaSlots> = {
  root: 'fui-Persona',
  avatar: 'fui-Persona-avatar',
  presence: 'fui-Persona-presence',
  primaryText: 'fui-Persona-primaryText',
  secondaryText: 'fui-Persona-secondaryText',
  tertiaryText: 'fui-Persona-tertiaryText',
  quaternaryText: 'fui-Persona-quaternaryText',
};

export const COIN_GRID_AREA = 'coin';
export const PRIMARY_TEXT_GRID_AREA = 'primary-text';
export const SECONDARY_TEXT_GRID_AREA = 'secondary-text';
export const TERTIARY_TEXT_GRID_AREA = 'tertiary-text';
export const QUATERNARY_TEXT_GRID_AREA = 'quaternary-text';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'inline-grid',
    gridAutoColumns: 'max-content',
    gridAutoRows: 'max-content',
  },
});

const useGridStyles = makeStyles({
  after: {
    gridTemplateAreas: `
    "${COIN_GRID_AREA} ${PRIMARY_TEXT_GRID_AREA}"
    "${COIN_GRID_AREA} ${SECONDARY_TEXT_GRID_AREA}"
    "${COIN_GRID_AREA} ${TERTIARY_TEXT_GRID_AREA}"
    "${COIN_GRID_AREA} ${QUATERNARY_TEXT_GRID_AREA}"
    `,
    justifyItems: 'start',
    columnGap: '8px',
  },
  below: {
    gridTemplateAreas: `
    "${COIN_GRID_AREA}"
    "${PRIMARY_TEXT_GRID_AREA}"
    "${SECONDARY_TEXT_GRID_AREA}"
    "${TERTIARY_TEXT_GRID_AREA}"
    "${QUATERNARY_TEXT_GRID_AREA}"
    `,
    justifyItems: 'center',
  },
  before: {
    gridTemplateAreas: `
    "${PRIMARY_TEXT_GRID_AREA} ${COIN_GRID_AREA}"
    "${SECONDARY_TEXT_GRID_AREA} ${COIN_GRID_AREA}"
    "${TERTIARY_TEXT_GRID_AREA} ${COIN_GRID_AREA}"
    "${QUATERNARY_TEXT_GRID_AREA} ${COIN_GRID_AREA}"
    `,
    justifyItems: 'end',
    columnGap: '8px',
  },

  coin: {
    ...shorthands.gridArea(COIN_GRID_AREA),
  },
  primaryText: {
    ...shorthands.gridArea(PRIMARY_TEXT_GRID_AREA),
  },
  secondaryText: {
    ...shorthands.gridArea(SECONDARY_TEXT_GRID_AREA),
  },
  tertiaryText: {
    ...shorthands.gridArea(TERTIARY_TEXT_GRID_AREA),
  },
  quaternaryText: {
    ...shorthands.gridArea(QUATERNARY_TEXT_GRID_AREA),
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
  const { textPosition, sizing } = state;
  const styles = useStyles();
  const gridStyles = useGridStyles();
  const coinClassName = mergeClasses(gridStyles.coin, gridStyles[sizing]);
  const { primaryTextClassName, optionalTextClassName } = useTextClassNames(state);

  state.root.className = mergeClasses(
    personaClassNames.root,
    styles.root,
    gridStyles[textPosition],
    state.root.className,
  );

  if (state.avatar) {
    state.avatar.className = mergeClasses(personaClassNames.avatar, coinClassName, state.avatar.className);
  }

  if (state.presence) {
    state.presence.className = mergeClasses(personaClassNames.presence, coinClassName, state.presence.className);
  }

  if (state.primaryText) {
    state.primaryText.className = mergeClasses(
      personaClassNames.primaryText,
      gridStyles.primaryText,
      primaryTextClassName,
      state.primaryText.className,
    );
  }

  if (state.secondaryText) {
    state.secondaryText.className = mergeClasses(
      personaClassNames.secondaryText,
      gridStyles.secondaryText,
      optionalTextClassName,
      state.secondaryText.className,
    );
  }

  if (state.tertiaryText) {
    state.tertiaryText.className = mergeClasses(
      personaClassNames.tertiaryText,
      gridStyles.tertiaryText,
      optionalTextClassName,
      state.tertiaryText.className,
    );
  }

  if (state.quaternaryText) {
    state.quaternaryText.className = mergeClasses(
      personaClassNames.quaternaryText,
      gridStyles.quaternaryText,
      optionalTextClassName,
      state.quaternaryText.className,
    );
  }

  return state;
};

const useTextStyles = makeStyles({
  base: {
    display: 'block',
    height: 'fit-content',
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
  const { sizing, numTextLines } = state;
  const textStyles = useTextStyles();
  const primaryTextClassNames: string[] = [textStyles.base, textStyles.primaryText];
  const optionalTextClassNames: string[] = [textStyles.base, textStyles.optionalText];

  if (sizing === 'fixed') {
    if (state.avatar && state.avatar.size) {
      const size = state.avatar.size;

      if (size < 40) {
        primaryTextClassNames.push(textStyles.body1);
        optionalTextClassNames.push(textStyles.caption1);
      } else if (size < 64) {
        primaryTextClassNames.push(textStyles.subtitle2);
        optionalTextClassNames.push(textStyles.body1);
      } else if (size < 96) {
        primaryTextClassNames.push(textStyles.subtitle1);
        optionalTextClassNames.push(textStyles.caption1);
      } else {
        if (numTextLines > 1) {
          primaryTextClassNames.push(textStyles.title3);
        } else {
          primaryTextClassNames.push(textStyles.title2);
        }
        optionalTextClassNames.push(textStyles.body1);
      }
    } else if (state.presence) {
      const size = state.presence.size;

      if (size === 'extra-small' || size === 'tiny') {
        if (numTextLines > 1) {
          primaryTextClassNames.push(textStyles.body1);
        } else {
          primaryTextClassNames.push(textStyles.caption1);
        }
        optionalTextClassNames.push(textStyles.caption1);
      } else {
        primaryTextClassNames.push(textStyles.body1);
        optionalTextClassNames.push(textStyles.caption1);
      }
    }
  } else {
    if (numTextLines > 1) {
      primaryTextClassNames.push(textStyles.body1);
    } else {
      primaryTextClassNames.push(textStyles.caption1);
    }
    optionalTextClassNames.push(textStyles.caption1);
  }

  return {
    primaryTextClassName: mergeClasses(...primaryTextClassNames),
    optionalTextClassName: mergeClasses(...optionalTextClassNames),
  };
};
