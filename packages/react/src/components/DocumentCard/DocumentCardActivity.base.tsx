import * as React from 'react';
import { classNamesFunction, initializeComponentRef } from '../../Utilities';
import { PersonaSize } from '../../Persona';
import { PersonaCoin } from '../../PersonaCoin';
import type {
  IDocumentCardActivityProps,
  IDocumentCardActivityPerson,
  IDocumentCardActivityStyleProps,
  IDocumentCardActivityStyles,
} from './DocumentCardActivity.types';
import type { IProcessedStyleSet } from '../../Styling';

const getClassNames = classNamesFunction<IDocumentCardActivityStyleProps, IDocumentCardActivityStyles>();

/**
 * {@docCategory DocumentCard}
 */
export class DocumentCardActivityBase extends React.Component<IDocumentCardActivityProps, any> {
  private _classNames: IProcessedStyleSet<IDocumentCardActivityStyles>;

  constructor(props: IDocumentCardActivityProps) {
    super(props);

    initializeComponentRef(this);
  }

  public render(): JSX.Element | null {
    const { activity, people, styles, theme, className } = this.props;

    this._classNames = getClassNames(styles!, {
      theme: theme!,
      className,
      multiplePeople: people.length > 1,
    });

    if (!people || people.length === 0) {
      return null;
    }

    return (
      <div className={this._classNames.root}>
        {this._renderAvatars(people)}
        <div className={this._classNames.details}>
          <span className={this._classNames.name}>{this._getNameString(people)}</span>
          <span className={this._classNames.activity}>{activity}</span>
        </div>
      </div>
    );
  }

  private _renderAvatars(people: IDocumentCardActivityPerson[]): React.ReactElement<{}> {
    return (
      <div className={this._classNames.avatars}>
        {people.length > 1 ? this._renderAvatar(people[1]) : null}
        {this._renderAvatar(people[0])}
      </div>
    );
  }

  private _renderAvatar(person: IDocumentCardActivityPerson): JSX.Element {
    return (
      <div className={this._classNames.avatar}>
        <PersonaCoin
          imageInitials={person.initials}
          text={person.name}
          imageUrl={person.profileImageSrc}
          initialsColor={person.initialsColor}
          allowPhoneInitials={person.allowPhoneInitials}
          role="presentation"
          size={PersonaSize.size32}
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
