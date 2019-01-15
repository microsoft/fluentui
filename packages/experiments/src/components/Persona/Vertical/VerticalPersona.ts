import { VerticalPersonaView } from './VerticalPersona.view';
import { VerticalPersonaStyles, VerticalPersonaTokens } from './VerticalPersona.styles';
import { IVerticalPersonaProps, IVerticalPersonaStyles, IVerticalPersonaTokens } from './VerticalPersona.types';
import { createStatelessComponent } from '../../../Foundation';

export const VerticalPersona: React.StatelessComponent<IVerticalPersonaProps> = createStatelessComponent<
  IVerticalPersonaProps,
  IVerticalPersonaStyles,
  IVerticalPersonaTokens
>({
  displayName: 'VerticalPersona',
  view: VerticalPersonaView,
  styles: VerticalPersonaStyles,
  tokens: VerticalPersonaTokens
});
