import { makeStyles, mergeClasses } from '@griffel/react';
import type { PersonaAvatarSlots, PersonaAvatarState } from './PersonaAvatar.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const personaAvatarClassNames: SlotClassNames<PersonaAvatarSlots> = {
  root: 'fui-PersonaAvatar',
  // TODO: add class names for all slots on PersonaAvatarSlots.
  // Should be of the form `<slotName>: 'fui-PersonaAvatar__<slotName>`
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    // TODO Add default styles for the root element
  },

  // TODO add additional classes for different states and/or slots
});

/**
 * Apply styling to the PersonaAvatar slots based on the state
 */
export const usePersonaAvatarStyles_unstable = (state: PersonaAvatarState): PersonaAvatarState => {
  const styles = useStyles();
  state.root.className = mergeClasses(personaAvatarClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
