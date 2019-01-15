import { PersonaCoinView } from './PersonaCoin.view';
import { PersonaCoinStyles } from './PersonaCoin.styles';
import { PersonaCoinState } from './PersonaCoin.state';
import { IPersonaCoinProps, IPersonaCoinViewProps, IPersonaCoinStyles } from './PersonaCoin.types';
import { createComponent } from '../../Foundation';

export const PersonaCoin: React.StatelessComponent<IPersonaCoinProps> = createComponent<
  IPersonaCoinProps,
  IPersonaCoinViewProps,
  IPersonaCoinStyles
>({
  displayName: 'PersonaCoin',
  view: PersonaCoinView,
  styles: PersonaCoinStyles,
  state: PersonaCoinState
});
