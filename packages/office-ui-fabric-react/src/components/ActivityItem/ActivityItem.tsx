/* tslint:disable */
import * as React from 'react';
/* tslint:enable */

import { autobind, BaseComponent, memoize } from '../../Utilities';
import { IActivityItemProps, IActivityItemStyles } from './ActivityItem.Props';
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
      renderTimeStamp = this.props.onRenderTimeStamp ? this.props.onRenderTimeStamp(this.props) : <div className={ this._classNames.timeStamp }>{ this.props.timeString }</div>;
    }

    return (
      <div className={ this._classNames.root } style={ this.props.style } >

        { this.props.onRenderIcon ? <div className={ this._classNames.activityTypeIcon }>{ this.props.onRenderIcon(this.props) }</div> : this._onRenderIcon(this.props) }

        <div className={ this._classNames.activityContent }>

          { this.props.activityDescription.map((item, index) => <span key={ index }>{ item }</span>) }

          <div>
            { this.props.commentElements && !this.props.isCompact && this._onRenderCommentText(this.props) }
            { renderTimeStamp }
          </div>

        </div>
      </div>
    );
  }

  @autobind
  private _onRenderIcon(props: IActivityItemProps): JSX.Element {
    let personaElement: JSX.Element;
    if (this.props.people[0].imageUrl || this.props.people[0].imageInitials) {
      let personaList = [];
      let showSize16Personas = (this.props.people.length > 1 || this.props.isCompact);
      let personaLimit = this.props.isCompact ? 3 : 4;
      this.props.people.filter((person, index) => index < personaLimit).forEach((person, index) => {
        personaList.push(
          <Persona
            {...person}
            // tslint:disable-next-line:no-string-literal
            key={ person['key'] ? person['key'] : index }
            className={ this._classNames.activityPersona }
            size={ showSize16Personas ? PersonaSize.size16 : PersonaSize.extraSmall }
            hidePersonaDetails={ true }
            style={
              this.props.isCompact && {
                display: 'inline-block',
                width: '8px',
                minWidth: '8px',
                overflow: 'visible'
              }
            } />
        );
      });
      personaElement = <div className={ this._classNames.personaContainer }>{ personaList }</div>;
    }
    return personaElement;
  }

  @autobind
  private _onRenderCommentText(props: IActivityItemProps): JSX.Element {
    return (
      <div className={ this._classNames.commentText }>
        { props.commentElements.map((item, index) => <span key={ index }>{ item }</span>) }
      </div>
    );
  }

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

      commentText: mergeStyles('ms-ActivityItem-commentText', styles.commentText) as string,
      timeStamp: mergeStyles('ms-ActivityItem-timeStamp', styles.timeStamp) as string
    };
  }
}