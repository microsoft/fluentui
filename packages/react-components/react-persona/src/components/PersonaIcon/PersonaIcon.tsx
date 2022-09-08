import * as React from 'react';
import { usePersonaIcon_unstable } from './usePersonaIcon';
import { renderPersonaIcon_unstable } from './renderPersonaIcon';
import { usePersonaIconStyles_unstable } from './usePersonaIconStyles';
import type { PersonaIconProps } from './PersonaIcon.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * PersonaIcon component - TODO: add more docs
 */
export const PersonaIcon: ForwardRefComponent<PersonaIconProps> = React.forwardRef((props, ref) => {
  const state = usePersonaIcon_unstable(props, ref);

  usePersonaIconStyles_unstable(state);
  return renderPersonaIcon_unstable(state);
});

PersonaIcon.displayName = 'PersonaIcon';
