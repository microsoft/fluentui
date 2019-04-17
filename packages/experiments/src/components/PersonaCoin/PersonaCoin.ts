import { PersonaCoinView } from './PersonaCoin.view';
import { PersonaCoinStyles } from './PersonaCoin.styles';
import { IPersonaCoinProps } from './PersonaCoin.types';
import { createComponent } from '../../Foundation';
import { PersonaCoinState } from './PersonaCoin.state';

export const PersonaCoin: React.StatelessComponent<IPersonaCoinProps> = createComponent({
  displayName: 'PersonaCoin',
  view: PersonaCoinView,
  styles: PersonaCoinStyles,
  state: PersonaCoinState
});
