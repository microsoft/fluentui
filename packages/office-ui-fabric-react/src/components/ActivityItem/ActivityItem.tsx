/* tslint:disable */
import * as React from 'react';
/* tslint:enable */

import { autobind, BaseComponent, css, getNativeProps, htmlElementProperties, memoize } from '../../Utilities';
import { IActivityItemProps, IActivityItemStyles, ActivityType } from './ActivityItem.Props';
import { mergeStyles } from '../../Styling';
import { getStyles } from './ActivityItem.styles';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { Image } from '../Image/Image';
import { Icon } from '../../Icon';

interface IActivityItemClassNames {
  root?: string;
  activityContent?: string;
  personaContainer?: string;
  activityPersona?: string;
  activityTypeIcon?: string;
  nameText?: string;
  docLink?: string;
  commentText?: string;
  timeStamp?: string;
}

export class ActivityItem extends BaseComponent<IActivityItemProps, {}> {

  private _classNames: IActivityItemClassNames;

  constructor(props: IActivityItemProps) {
    super(props);
  }

  public render() {
    let {
      className,
      styles: customStyles
    } = this.props;

    this._classNames = this._getClassNames(
      getStyles(undefined, customStyles),
      this.props.className,
      this.props.people.length
    );

    return (
      <div className={ this._classNames.root }>

        { this._onRenderPersonas(this.props) }

        <div className={ this._classNames.activityContent }>
          <div>
            { this._onRenderNameList(this.props, this.props.people.length) }
            { this._onRenderActivityDescription(this.props) }
          </div>
          <div>
            <span className={ this._classNames.commentText }>
              { this.props.commentString }
            </span>
            <div className={ this._classNames.timeStamp }>
              { this.props.timeString }
            </div>
          </div>
        </div>

      </div>
    );
  }

  @autobind
  private _onRenderPersonas(props: IActivityItemProps): JSX.Element {
    if (this.props.people[0].imageUrl) {
      // Render as personas if we have images available
      let personaList = [];

      this.props.people.forEach((person, index) => {
        personaList.push(
          <Persona
            key={ person['key'] ? person['key'] : index }
            className={ this._classNames.activityPersona }
            primaryText={ person.primaryText }
            imageUrl={ person.imageUrl }
            size={ this.props.people.length > 1 ? PersonaSize.size16 : PersonaSize.extraSmall }
            hidePersonaDetails={ true } />
        );
      });

      return (<div className={ this._classNames.personaContainer }>{ personaList }</div>);
    } else {
      // Otherwise render the activity type icon
      let iconString = ActivityType[props.activityType];;
      switch (props.activityType) {
        case ActivityType.CommentInDocument:
          iconString = 'Message';
          break;
        case ActivityType.Mention:
          iconString = 'Accounts';
          break;
        case ActivityType.Move:
          iconString = 'FabricMovetoFolder';
          break;
        case ActivityType.Restore:
          iconString = 'Refresh';
          break;
      }
      return (<div className={ this._classNames.activityTypeIcon }><Icon iconName={ iconString } /></div>);
    }
  }

  @autobind
  private _onRenderNameList(props: IActivityItemProps, length: number): JSX.Element {
    if (length === 1) {
      return (
        <span className={ this._classNames.nameText }>{ this.props.people[0].primaryText }</span>
      )
    } else if (length === 2) {
      return (
        <span>
          <span className={ this._classNames.nameText }>{ this.props.people[0].primaryText }</span>
          <span> and </span>
          <span className={ this._classNames.nameText }>{ this.props.people[1].primaryText }</span>
        </span>
      )
    } else {
      return (
        <span>
          <span className={ this._classNames.nameText }>{ this.props.people[0].primaryText }</span>
          <span>, </span>
          <span className={ this._classNames.nameText }>{ this.props.people[1].primaryText }</span>
          <span> and </span>
          <span className={ this._classNames.nameText }>{ this.props.people.length === 3 ? '1 other' : `${this.props.people.length - 2} others` }</span>
        </span>
      )
    }
  }

  @autobind
  private _onRenderActivityDescription(props: IActivityItemProps): JSX.Element {
    switch (props.activityType) {

      case ActivityType.Message:
        return (
          <span> commented</span>
        );

      case ActivityType.CommentInDocument:
        return (
          <span> commented in the document</span>
        );

      case ActivityType.Mention:
        return (
          <span> mentioned you</span>
        );

      case ActivityType.Edit:
        if (props.fileActivity && props.fileActivity.fileName) {
          return (
            <span> edited {
              props.fileActivity.fileHref ?
                (<a className={ this._classNames.docLink } href={ props.fileActivity.fileHref }>{ props.fileActivity.fileName }</a>) :
                (<span className={ this._classNames.nameText }>{ props.fileActivity.fileName }</span>)
            }</span>
          );
        } else {
          return (
            <span> edited a file</span>
          );
        }

      case ActivityType.Move:
        if (props.fileActivity && props.fileActivity.fileName && props.fileActivity.sourceFolderName && props.fileActivity.destinationFolderName) {
          return (
            <span> moved {
              props.fileActivity.fileHref ?
                (<a className={ this._classNames.docLink } href={ props.fileActivity.fileHref }>{ props.fileActivity.fileName }</a>) :
                (<span className={ this._classNames.nameText }>{ props.fileActivity.fileName }</span>)
            } from {
                props.fileActivity.sourceFolderHref ?
                  (<a className={ this._classNames.docLink } href={ props.fileActivity.sourceFolderHref }>{ props.fileActivity.sourceFolderName }</a>
                  ) : (
                    <span className={ this._classNames.nameText }>{ props.fileActivity.sourceFolderName }</span>)
              } to {
                props.fileActivity.destinationFolderHref ?
                  (<a className={ this._classNames.docLink } href={ props.fileActivity.destinationFolderHref }>{ props.fileActivity.destinationFolderName }</a>) :
                  (<span className={ this._classNames.nameText }>{ props.fileActivity.destinationFolderName }</span>)
              }</span>
          );
        } else {
          return (
            <span> moved a file</span>
          );
        }

      case ActivityType.Rename:
        return (
          <span> renamed OldFileName.ext to NewFileName.ext</span>
        );

      case ActivityType.Share:
        return (
          <span> shared FileName.ext with Persona</span>
        );

      case ActivityType.Add:
        return (
          <span> added an item FileName.ext in Folder</span>
        );

      case ActivityType.Delete:
        return (
          <span> deleted FileName.ext</span>
        );

      case ActivityType.Restore:
        return (
          <span> restored FileName.ext</span>
        );

      case ActivityType.Version:
        return (
          <span> Version X.0 was created on</span>
        );

      case ActivityType.Custom:
        return (
          <span> custom renderer goes here</span>
        );

      default:
        return;
    }
  }

  @memoize
  private _getClassNames(styles: IActivityItemStyles, className: string, numberOfPeople: number): IActivityItemClassNames {
    return {
      root: mergeStyles(
        'ms-ActivityItem',
        styles.root,
        className
      ) as string,

      activityContent: mergeStyles(
        'ms-ActivityItem-activityContent',
        styles.activityContent
      ) as string,

      personaContainer: mergeStyles(
        'ms-ActivityItem-personaContainer',
        styles.personaContainer
      ) as string,

      activityTypeIcon: mergeStyles(
        'ms-ActivityItem-activityTypeIcon',
        styles.activityTypeIcon
      ) as string,

      activityPersona: mergeStyles(
        'ms-ActivityItem-activityPersona',
        styles.activityPersona,
        numberOfPeople === 2 && styles.doublePersona
      ) as string,

      nameText: mergeStyles(
        'ms-ActivityItem-nameText',
        styles.nameText
      ) as string,

      docLink: mergeStyles(
        'ms-ActivityItem-docLink',
        styles.docLink
      ) as string,

      commentText: mergeStyles(
        'ms-ActivityItem-commentText',
        styles.commentText
      ) as string,

      timeStamp: mergeStyles(
        'ms-ActivityItem-timeStamp',
        styles.timeStamp
      ) as string
    };
  }

}