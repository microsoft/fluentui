import { VerticalPersonaView } from './VerticalPersona.view';
import { VerticalPersonaStyles } from './VerticalPersona.styles';
import { IVerticalPersonaProps, IVerticalPersonaStyles } from './VerticalPersona.types';
import { createStatelessComponent } from '../../../Foundation';

export const VerticalPersona: React.StatelessComponent<IVerticalPersonaProps> = createStatelessComponent<
  IVerticalPersonaProps,
  IVerticalPersonaStyles
>({
  displayName: 'VerticalPersona',
  view: VerticalPersonaView,
  styles: VerticalPersonaStyles
});
