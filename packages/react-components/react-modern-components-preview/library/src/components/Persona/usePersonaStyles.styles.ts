import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { PersonaSlots, PersonaState } from './Persona.types';
import styles from './Persona.module.css';

export const personaClassNames: SlotClassNames<PersonaSlots> = {
  root: 'fui-Persona',
  avatar: 'fui-Persona__avatar',
  primaryText: 'fui-Persona__primaryText',
  secondaryText: 'fui-Persona__secondaryText',
  tertiaryText: 'fui-Persona__tertiaryText',
  quaternaryText: 'fui-Persona__quaternaryText',
};

/**
 * Apply styling to the Persona slots based on the state.
 */
export const usePersonaStyles = (state: PersonaState): PersonaState => {
  state.root.className = clsx(personaClassNames.root, styles.root, state.root.className);

  if (state.avatar) {
    state.avatar.className = clsx(personaClassNames.avatar, styles.avatar, state.avatar.className);
  }
  if (state.primaryText) {
    state.primaryText.className = clsx(personaClassNames.primaryText, styles.primaryText, state.primaryText.className);
  }
  if (state.secondaryText) {
    state.secondaryText.className = clsx(
      personaClassNames.secondaryText,
      styles.secondaryText,
      state.secondaryText.className,
    );
  }
  if (state.tertiaryText) {
    state.tertiaryText.className = clsx(
      personaClassNames.tertiaryText,
      styles.tertiaryText,
      state.tertiaryText.className,
    );
  }
  if (state.quaternaryText) {
    state.quaternaryText.className = clsx(
      personaClassNames.quaternaryText,
      styles.quaternaryText,
      state.quaternaryText.className,
    );
  }

  return state;
};
