import * as React from 'react';
import { IDocumentCardActivityProps, IDocumentCardActivityPerson } from './DocumentCard.Props';
import './DocumentCardActivity.scss';
import { css } from '../../utilities/css';
import Image from '../Image/Image';

export default class DocumentCardActivity extends React.Component<IDocumentCardActivityProps, any> {
  public render() {
    let { activity, people } = this.props;

    return (
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
        { people.length > 1 ? <Image className='ms-DocumentCardActivity-avatar' src={ people[1].profileImageSrc }/> : '' }
        <Image className='ms-DocumentCardActivity-avatar' src={ people[0].profileImageSrc }/>
      </div>
    );
  }

  private _getNameString(people: IDocumentCardActivityPerson[]): string {
    let nameString = people[0].name;

    if (people.length === 2) {
      nameString += ' +' + (people.length - 1) + ' other';
    } else if (people.length > 2) {
      nameString += ' +' + (people.length - 1) + ' others';
    }

    return nameString;
  }
}
