import * as React from 'react';
import { styled } from '../../../Utilities';
import { IPersonaCoinProps, IPersonaCoinStyleProps, IPersonaCoinStyles } from '../Persona.types';
import { PersonaCoinBase } from './PersonaCoin.base';
import { getStyles } from './PersonaCoin.styles';

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
