import * as React from 'react';
import { IDocumentCardActivityProps, IDocumentCardActivityPerson } from './DocumentCard.Props';
import { Image } from '../../Image';
import {
  PERSONA_INITIALS_COLOR,
  PersonaInitialsColor
} from '../../Persona';
import { css } from '../../utilities/css';
import './DocumentCardActivity.scss';

export class DocumentCardActivity extends React.Component<IDocumentCardActivityProps, any> {
  public render() {
    let { activity, people } = this.props;

    return (
      people && people.length > 0 &&
      <div className={css('ms-DocumentCardActivity', {
        'ms-DocumentCardActivity--multiplePeople': people.length > 1
      })}>
        { this._renderAvatars(people) }
        <div className='ms-DocumentCardActivity-details'>
          <span className='ms-DocumentCardActivity-name'>{ this._getNameString(people) }</span>
          <span className='ms-DocumentCardActivity-activity'>{ activity }</span>
        </div>
      </div>
    );
  }

  private _renderAvatars(people: IDocumentCardActivityPerson[]): React.ReactElement<{}> {
    return (
      <div className='ms-DocumentCardActivity-avatars'>
        { people.length > 1 ? this._renderAvatar(people[1]) : null }
        { this._renderAvatar(people[0]) }
      </div>
    );
  }

  private _renderAvatar(person: IDocumentCardActivityPerson) {
    let initialsColor = person.initialsColor ? person.initialsColor : PersonaInitialsColor.blue;

    return (
      <div className='ms-DocumentCardActivity-avatar'>
        { person.initials && (
          <div className={ css('ms-Persona-initials', PERSONA_INITIALS_COLOR[initialsColor]) } role='presentation'>
            { person.initials }
          </div>
        ) }
        { person.profileImageSrc && (
          <Image src={ person.profileImageSrc } role='presentation' alt=''/>
        ) }
      </div>
    );
  }

  private _getNameString(people: IDocumentCardActivityPerson[]): string {
    let nameString = people[0].name;

    if (people.length >= 2) {
      nameString += ' +' + (people.length - 1);
    }

    return nameString;
  }
}
