import { PersonaCoinView } from './PersonaCoin.view';
import { PersonaCoinStyles } from './PersonaCoin.styles';
import { IPersonaCoinProps, IPersonaCoinStyles } from './PersonaCoin.types';
import { createStatelessComponent } from '../../Foundation';

export const PersonaCoin: React.StatelessComponent<IPersonaCoinProps> = createStatelessComponent<IPersonaCoinProps, IPersonaCoinStyles>({
  displayName: 'PersonaCoin',
  view: PersonaCoinView,
  styles: PersonaCoinStyles
});
