import * as React from 'react';
import { styled } from '../../../Utilities';
import { PersonaCoinBase } from './PersonaCoin.base';
import { getStyles } from './PersonaCoin.styles';
import type { IPersonaCoinProps, IPersonaCoinStyleProps, IPersonaCoinStyles } from '../Persona.types';

/**
 * PersonaCoin is used to render an individual's avatar and presence.
 */
export const PersonaCoin: React.FunctionComponent<IPersonaCoinProps> = styled<
  IPersonaCoinProps,
  IPersonaCoinStyleProps,
  IPersonaCoinStyles
>(PersonaCoinBase, getStyles, undefined, {
  scope: 'PersonaCoin',
});
