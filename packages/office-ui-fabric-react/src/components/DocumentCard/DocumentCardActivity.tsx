import * as React from 'react';
import { BaseComponent, css } from '../../Utilities';
import { IDocumentCardActivityProps, IDocumentCardActivityPerson } from './DocumentCard.Props';
import { Persona, PersonaSize } from '../../Persona';
import * as stylesImport from './DocumentCard.scss';
const styles: any = stylesImport;

export class DocumentCardActivity extends BaseComponent<IDocumentCardActivityProps, any> {
  public render() {
    let { activity, people } = this.props;

    return (
      people && people.length > 0 &&
      <div
        className={ css('ms-DocumentCardActivity', styles.activity, {
          ['ms-DocumentCardActivity--multiplePeople ' + styles.activityIsMultiplePeople]: people.length > 1
        }) }
      >
        { this._renderAvatars(people) }
        <div className={ css('ms-DocumentCardActivity-details', styles.activityDetails) }>
          <span className={ css('ms-DocumentCardActivity-name', styles.name) }>{ this._getNameString(people) }</span>
          <span className={ css('ms-DocumentCardActivity-activity', styles.activityActivity) }>{ activity }</span>
        </div>
      </div>
    );
  }

  private _renderAvatars(people: IDocumentCardActivityPerson[]): React.ReactElement<{}> {
    return (
      <div className={ css('ms-DocumentCardActivity-avatars', styles.avatars) }>
        { people.length > 1 ? this._renderAvatar(people[1]) : null }
        { this._renderAvatar(people[0]) }
      </div>
    );
  }

  private _renderAvatar(person: IDocumentCardActivityPerson) {

    return (
      <div className={ css('ms-DocumentCardActivity-avatar', styles.avatar) }>
        <Persona
          imageInitials={ person.initials }
          primaryText={ person.name }
          hidePersonaDetails={ true }
          imageUrl={ person.profileImageSrc }
          initialsColor={ person.initialsColor }
          role='persentation'
          size={ PersonaSize.extraSmall }
        />

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
