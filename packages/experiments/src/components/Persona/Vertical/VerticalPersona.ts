import { VerticalPersonaView } from './VerticalPersona.view';
import { VerticalPersonaStyles } from './VerticalPersona.styles';
import { IVerticalPersonaProps } from './VerticalPersona.types';
import { createComponent } from '../../../Foundation';

export const VerticalPersona: React.StatelessComponent<IVerticalPersonaProps> = createComponent({
  displayName: 'VerticalPersona',
  view: VerticalPersonaView,
  styles: VerticalPersonaStyles
});
