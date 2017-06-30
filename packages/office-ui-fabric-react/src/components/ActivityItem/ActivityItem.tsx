/* tslint:disable */
import * as React from 'react';
/* tslint:enable */

import { autobind, BaseComponent, memoize } from '../../Utilities';
import { IActivityItemProps, IActivityItemStyles, ActivityType } from './ActivityItem.Props';
import { ActivityDescription } from './ActivityDescription';
import { mergeStyles } from '../../Styling';
import { getStyles } from './ActivityItem.styles';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { Icon } from '../../Icon';

export interface IActivityItemClassNames {
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
  private _styles: IActivityItemStyles;

  constructor(props: IActivityItemProps) {
    super(props);
  }

  public render() {
    let {
      className,
      styles: customStyles
    } = this.props;

    this._styles = getStyles(undefined, customStyles);
    this._classNames = this._getClassNames(
      this._styles,
      this.props.className,
      this.props.people.length,
      this.props.isCompact
    );

    let renderComment: JSX.Element;
    let renderTimeStamp: JSX.Element;
    if (!this.props.isCompact) {
      renderComment = this.props.onRenderComment ? this.props.onRenderComment(this.props) : this._onRenderCommentText(this.props);
      renderTimeStamp = this.props.onRenderTimeStamp ? this.props.onRenderTimeStamp(this.props) : <div className={ this._classNames.timeStamp }>{ this.props.timeString }</div>;
    }

    return (
      <div className={ this._classNames.root } style={ this.props.style } >

        { this.props.onRenderIcon ? this.props.onRenderIcon(this.props) : this._onRenderIcon(this.props) }

        <div className={ this._classNames.activityContent }>
          { this.props.onRenderNameList ? this.props.onRenderNameList(this.props) : this._onRenderNameList(this.props, this.props.people.length) }
          <ActivityDescription {...this.props} _classNames={ this._classNames } />

          <div>
            { renderComment }
            { renderTimeStamp }
          </div>
        </div>

      </div>
    );
  }

  // Render up to four personas if they're available, otherwise show an icon based on what activityType is set.
  @autobind
  private _onRenderIcon(props: IActivityItemProps): JSX.Element {
    let personaElement: JSX.Element;
    if (this.props.people[0].imageUrl || this.props.people[0].imageInitials) {
      let personaList = [];
      let showSize16Personas = (this.props.people.length > 1 || this.props.isCompact);
      this.props.people.filter((person, index) => index < 4).forEach((person, index) => {
        personaList.push(
          <Persona
            {...person}
            // tslint:disable-next-line:no-string-literal
            key={ person['key'] ? person['key'] : index }
            className={ this._classNames.activityPersona }
            size={ showSize16Personas ? PersonaSize.size16 : PersonaSize.extraSmall }
            hidePersonaDetails={ true }
            style={ this.props.isCompact && { display: 'inline-block', width: '8px', minWidth: '8px', overflow: 'visible' } } />
        );
      });
      personaElement = <div className={ this._classNames.personaContainer }>{ personaList }</div>;
    } else {
      let iconString = ActivityType[props.activityType];

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
        case ActivityType.Delete:
          iconString = 'Trash';
          break;
        case ActivityType.Restore:
          iconString = 'Refresh';
          break;
      }

      if (props.isCompact && (props.activityType === ActivityType.CommentInDocument || props.activityType === ActivityType.Message)) {
        iconString = 'MessageFill';
      }

      personaElement = <div className={ this._classNames.activityTypeIcon }><Icon iconName={ iconString } /></div>;
    }
    return personaElement;
  }

  // Render the list of names involved in the activity. Shows up to the first two names before just referring to the number of other names.
  @autobind
  private _onRenderNameList(props: IActivityItemProps, length: number): JSX.Element {
    let nameListElement: JSX.Element;
    if (length === 1) {
      nameListElement = this._onRenderNameElement(this.props.people[0].primaryText);
    } else if (length === 2) {
      nameListElement = (
        <span>
          { this._onRenderNameElement(this.props.people[0].primaryText) }
          <span> and </span>
          { this._onRenderNameElement(this.props.people[1].primaryText) }
        </span>
      );
    } else {
      nameListElement = (
        <span>
          { this._onRenderNameElement(this.props.people[0].primaryText) }
          <span>, </span>
          { this._onRenderNameElement(this.props.people[1].primaryText) }
          <span> and </span>
          { this._onRenderNameElement(this.props.people.length === 3 ? '1 other' : `${this.props.people.length - 2} others`) }
        </span>
      );
    }
    return nameListElement;
  }

  // Renders a single name.
  @autobind
  private _onRenderNameElement(primaryText: string): JSX.Element {
    return (<span className={ this._classNames.nameText }>{ primaryText }</span>);
  }

  // Render the comment text and attempt to highlight the mentioned name if one was used.
  @autobind
  private _onRenderCommentText(props: IActivityItemProps): JSX.Element {
    let commentElement: JSX.Element = <div className={ this._classNames.commentText }>{ props.commentString }</div>;
    if (props.mentionedName && props.commentString.indexOf(props.mentionedName) !== -1) {
      let parsedComment = props.commentString.split(props.mentionedName);
      let nameElement = props.onMentionedClick ?
        (<a onClick={ (ev) => props.onMentionedClick(ev, props) } className={ this._classNames.docLink }>{ props.mentionedName }</a>) :
        (this._onRenderNameElement(props.mentionedName));

      commentElement = (
        <div className={ this._classNames.commentText }>
          { parsedComment[0] }
          { nameElement }
          { parsedComment[1] }
        </div>
      );
    }
    return commentElement;
  }

  // Determine the class lists for each className.
  @memoize
  private _getClassNames(styles: IActivityItemStyles, className: string, numberOfPeople: number, isCompact: boolean): IActivityItemClassNames {
    return {

      root: mergeStyles(
        'ms-ActivityItem',
        styles.root,
        className
      ) as string,

      personaContainer: mergeStyles(
        'ms-ActivityItem-personaContainer',
        styles.personaContainer,
        isCompact && styles.isCompactPersonaContainer
      ) as string,

      activityPersona: mergeStyles(
        'ms-ActivityItem-activityPersona',
        styles.activityPersona,
        isCompact && styles.isCompactPersona,
        !isCompact && numberOfPeople === 2 && styles.doublePersona
      ) as string,

      activityTypeIcon: mergeStyles(
        'ms-ActivityItem-activityTypeIcon',
        styles.activityTypeIcon,
        isCompact && styles.isCompactIcon
      ) as string,

      activityContent: mergeStyles(
        'ms-ActivityItem-activityContent',
        styles.activityContent,
        isCompact && styles.isCompactContent
      ) as string,

      nameText: mergeStyles('ms-ActivityItem-nameText', styles.nameText) as string,
      docLink: mergeStyles('ms-ActivityItem-docLink', styles.docLink) as string,
      commentText: mergeStyles('ms-ActivityItem-commentText', styles.commentText) as string,
      timeStamp: mergeStyles('ms-ActivityItem-timeStamp', styles.timeStamp) as string
    };
  }
}