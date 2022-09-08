import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { PersonaAvatarState, PersonaAvatarSlots } from './PersonaAvatar.types';

/**
 * Render the final JSX of PersonaAvatar
 */
export const renderPersonaAvatar_unstable = (state: PersonaAvatarState) => {
  const { slots, slotProps } = getSlots<PersonaAvatarSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};
