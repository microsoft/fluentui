import * as React from 'react';
import { styled } from '../../../Utilities';
import { PersonaPresenceBase } from './PersonaPresence.base';
import { getStyles } from './PersonaPresence.styles';
import type { IPersonaPresenceProps, IPersonaPresenceStyleProps, IPersonaPresenceStyles } from '../Persona.types';

/**
 * PersonaPresence is used to render an individual's presence.
 */
export const PersonaPresence: React.FunctionComponent<IPersonaPresenceProps> = styled<
  IPersonaPresenceProps,
  IPersonaPresenceStyleProps,
  IPersonaPresenceStyles
>(PersonaPresenceBase, getStyles, undefined, { scope: 'PersonaPresence' });
