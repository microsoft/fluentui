import * as React from 'react';
import { VerticalPersonaView } from './VerticalPersona.view';
import { VerticalPersonaStyles, VerticalPersonaTokens } from './VerticalPersona.styles';
import { createComponent } from '@fluentui/foundation-legacy';
import type { IVerticalPersonaProps } from './VerticalPersona.types';

export const VerticalPersona: React.FunctionComponent<IVerticalPersonaProps> = createComponent(VerticalPersonaView, {
  displayName: 'VerticalPersona',
  styles: VerticalPersonaStyles,
  tokens: VerticalPersonaTokens,
});
