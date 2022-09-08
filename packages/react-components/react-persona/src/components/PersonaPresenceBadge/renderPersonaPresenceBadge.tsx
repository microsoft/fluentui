import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { PersonaPresenceBadgeState, PersonaPresenceBadgeSlots } from './PersonaPresenceBadge.types';

/**
 * Render the final JSX of PersonaPresenceBadge
 */
export const renderPersonaPresenceBadge_unstable = (state: PersonaPresenceBadgeState) => {
  const { slots, slotProps } = getSlots<PersonaPresenceBadgeSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};
