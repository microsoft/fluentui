import * as React from 'react';
import {
  autobind,
  css
} from '../../Utilities';
import { Icon } from '../../Icon';
import {
  IPersonaProps,
  PersonaPresence as PersonaPresenceEnum
} from './Persona.Props';
import * as stylesImport from './Persona.scss';
const styles: any = stylesImport;

export class PersonaPresence extends React.Component<IPersonaProps, {}> {
  constructor(props: IPersonaProps) {
    super(props);
  }

  public render(): JSX.Element | null {
    let { presence } = this.props;

    if (presence === PersonaPresenceEnum.none) {
      return null;
    }

    return (
      <div className={ css('ms-Persona-presence', styles.presence) }>
        <Icon className={ css('ms-Persona-presenceIcon', styles.presenceIcon) } iconName={ this._determineIcon() } />
      </div>
    );
  }

  @autobind
  private _determineIcon(): string | undefined {
    let { presence } = this.props;

    if (presence !== PersonaPresenceEnum.none) {
      let userPresence = PersonaPresenceEnum[presence as PersonaPresenceEnum];

      switch (userPresence) {
        case 'online':
          userPresence = 'SkypeCheck';
          break;
        case 'away':
          userPresence = 'SkypeClock';
          break;
        case 'dnd':
          userPresence = 'SkypeMinus';
          break;
        default:
          userPresence = '';
      }

      return userPresence;
    }
  }
}