import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { PersonaIconState, PersonaIconSlots } from './PersonaIcon.types';

/**
 * Render the final JSX of PersonaIcon
 */
export const renderPersonaIcon_unstable = (state: PersonaIconState) => {
  const { slots, slotProps } = getSlots<PersonaIconSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};
