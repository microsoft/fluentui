import { PersonaCoinView } from './PersonaCoin.view';
import { PersonaCoinStyles } from './PersonaCoin.styles';
import { IPersonaCoinProps } from './PersonaCoin.types';
import { createComponent } from '../../Foundation';

export const PersonaCoin: React.StatelessComponent<IPersonaCoinProps> = createComponent({
  displayName: 'PersonaCoin',
  view: PersonaCoinView,
  styles: PersonaCoinStyles
});
