import * as React from 'react';
import { styled } from '../../../Utilities';
import { IPersonaPresenceProps, IPersonaPresenceStyleProps, IPersonaPresenceStyles } from '../Persona.types';
import { PersonaPresenceBase } from './PersonaPresence.base';
import { getStyles } from './PersonaPresence.styles';

/**
 * PersonaPresence is used to render an individual's presence.
 */
export const PersonaPresence: React.FunctionComponent<IPersonaPresenceProps> = styled<
  IPersonaPresenceProps,
  IPersonaPresenceStyleProps,
  IPersonaPresenceStyles
>(PersonaPresenceBase, getStyles, undefined, { scope: 'PersonaPresence' });
