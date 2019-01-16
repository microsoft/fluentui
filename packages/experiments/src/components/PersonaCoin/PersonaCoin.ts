import { PersonaCoinView } from './PersonaCoin.view';
import { PersonaCoinStyles } from './PersonaCoin.styles';
import { IPersonaCoinProps, IPersonaCoinStyles, IPersonaCoinTokens } from './PersonaCoin.types';
import { createStatelessComponent } from '../../Foundation';

export const PersonaCoin: React.StatelessComponent<IPersonaCoinProps> = createStatelessComponent<
  IPersonaCoinProps,
  IPersonaCoinTokens,
  IPersonaCoinStyles
>({
  displayName: 'PersonaCoin',
  view: PersonaCoinView,
  styles: PersonaCoinStyles
});
