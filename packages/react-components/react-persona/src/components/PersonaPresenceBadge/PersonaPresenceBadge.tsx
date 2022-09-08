import * as React from 'react';
import { usePersonaPresenceBadge_unstable } from './usePersonaPresenceBadge';
import { renderPersonaPresenceBadge_unstable } from './renderPersonaPresenceBadge';
import { usePersonaPresenceBadgeStyles_unstable } from './usePersonaPresenceBadgeStyles';
import type { PersonaPresenceBadgeProps } from './PersonaPresenceBadge.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * PersonaPresenceBadge component - TODO: add more docs
 */
export const PersonaPresenceBadge: ForwardRefComponent<PersonaPresenceBadgeProps> = React.forwardRef((props, ref) => {
  const state = usePersonaPresenceBadge_unstable(props, ref);

  usePersonaPresenceBadgeStyles_unstable(state);
  return renderPersonaPresenceBadge_unstable(state);
});

PersonaPresenceBadge.displayName = 'PersonaPresenceBadge';
