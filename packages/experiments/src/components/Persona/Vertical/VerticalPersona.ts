import { VerticalPersonaView } from './VerticalPersona.view';
import { VerticalPersonaStyles, VerticalPersonaTokens } from './VerticalPersona.styles';
import { IVerticalPersonaProps } from './VerticalPersona.types';
import { createComponent } from '../../../Foundation';

export const VerticalPersona: React.StatelessComponent<IVerticalPersonaProps> = createComponent(VerticalPersonaView, {
  displayName: 'VerticalPersona',
  styles: VerticalPersonaStyles,
  tokens: VerticalPersonaTokens
});
