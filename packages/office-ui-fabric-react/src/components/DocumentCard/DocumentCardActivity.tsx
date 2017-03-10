import * as React from 'react';
import { css } from '../../Utilities';
import { IDocumentCardActivityProps, IDocumentCardActivityPerson } from './DocumentCard.Props';
import { Image } from '../../Image';
import styles from './DocumentCard.scss';

export class DocumentCardActivity extends React.Component<IDocumentCardActivityProps, any> {
  public render() {
    let { activity, people } = this.props;

    return (
      people && people.length > 0 &&
      <div className={ css('ms-DocumentCardActivity', styles.activity, {
        ['ms-DocumentCardActivity--multiplePeople ' + styles.activityIsMultiplePeople]: people.length > 1
      }) }>
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
        { person.initials && (
          <div className={ css('ms-Persona-initials', styles.avatarInitials) } role='presentation'>
            { person.initials }
          </div>
        ) }
        { person.profileImageSrc && (
          <Image src={ person.profileImageSrc } role='presentation' alt='' />
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
