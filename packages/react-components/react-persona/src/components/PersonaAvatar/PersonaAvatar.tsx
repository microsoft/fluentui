import * as React from 'react';
import { usePersonaAvatar_unstable } from './usePersonaAvatar';
import { renderPersonaAvatar_unstable } from './renderPersonaAvatar';
import { usePersonaAvatarStyles_unstable } from './usePersonaAvatarStyles';
import type { PersonaAvatarProps } from './PersonaAvatar.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * PersonaAvatar component - TODO: add more docs
 */
export const PersonaAvatar: ForwardRefComponent<PersonaAvatarProps> = React.forwardRef((props, ref) => {
  const state = usePersonaAvatar_unstable(props, ref);

  usePersonaAvatarStyles_unstable(state);
  return renderPersonaAvatar_unstable(state);
});

PersonaAvatar.displayName = 'PersonaAvatar';
