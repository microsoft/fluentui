import * as React from 'react';
import { VerticalPersonaView } from './VerticalPersona.view';
import { VerticalPersonaStyles, VerticalPersonaTokens } from './VerticalPersona.styles';
import { IVerticalPersonaProps } from './VerticalPersona.types';
import { createComponent } from '@uifabric/foundation';

export const VerticalPersona: React.FunctionComponent<IVerticalPersonaProps> = createComponent(VerticalPersonaView, {
  displayName: 'VerticalPersona',
  styles: VerticalPersonaStyles,
  tokens: VerticalPersonaTokens,
});
