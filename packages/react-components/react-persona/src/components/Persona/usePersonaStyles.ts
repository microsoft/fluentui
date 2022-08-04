import { makeStyles, mergeClasses } from '@griffel/react';
import type { PersonaSlots, PersonaState } from './Persona.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const personaClassNames: SlotClassNames<PersonaSlots> = {
  root: 'fui-Persona',
  // TODO: add class names for all slots on PersonaSlots.
  // Should be of the form `<slotName>: 'fui-Persona__<slotName>`
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
 * Apply styling to the Persona slots based on the state
 */
export const usePersonaStyles_unstable = (state: PersonaState): PersonaState => {
  const styles = useStyles();
  state.root.className = mergeClasses(personaClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
