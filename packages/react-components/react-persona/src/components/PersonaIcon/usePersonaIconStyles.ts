import { makeStyles, mergeClasses } from '@griffel/react';
import type { PersonaIconSlots, PersonaIconState } from './PersonaIcon.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const personaIconClassNames: SlotClassNames<PersonaIconSlots> = {
  root: 'fui-PersonaIcon',
  // TODO: add class names for all slots on PersonaIconSlots.
  // Should be of the form `<slotName>: 'fui-PersonaIcon__<slotName>`
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
 * Apply styling to the PersonaIcon slots based on the state
 */
export const usePersonaIconStyles_unstable = (state: PersonaIconState): PersonaIconState => {
  const styles = useStyles();
  state.root.className = mergeClasses(personaIconClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
