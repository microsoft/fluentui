/* tslint:disable */
import * as React from 'react';
/* tslint:enable */

import { autobind, BaseComponent, memoize } from '../../Utilities';
import { IActivityItemProps, IActivityItemStyles } from './ActivityItem.Props';
import { mergeStyles } from '../../Styling';
import { getStyles } from './ActivityItem.styles';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';

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
      onRenderTimeStamp = this._onRenderTimeStamp,
      styles: customStyles,
    } = this.props;

    this._styles = getStyles(undefined, customStyles);
    this._classNames = this._getClassNames(
      this._styles,
      this.props.className,
      this.props.iconContents,
      this.props.isCompact
    );

    let renderComment: JSX.Element;

    return (
      <div className={ this._classNames.root } style={ this.props.style } >

        { Array.isArray(this.props.iconContents) ? this._onRenderPersonaArray(this.props) : <div className={ this._classNames.activityTypeIcon }>{ this.props.iconContents }</div> }

        <div className={ this._classNames.activityContent }>
          { this.props.activityDescription.map((item, index) => <span key={ index }>{ item }</span>) }

          <div>
            { this.props.commentElements && !this.props.isCompact && this._onRenderCommentText(this.props) }
            { onRenderTimeStamp(this.props, this._onRenderTimeStamp) }
          </div>
        </div>

      </div>
    );
  }

  // If iconContents is an array of persona props, build the persona cluster element.
  @autobind
  private _onRenderPersonaArray(props: IActivityItemProps): JSX.Element {
    let personaElement: JSX.Element;
    let iconContents = props.iconContents;
    if (Array.isArray(iconContents) && (iconContents[0].imageUrl || iconContents[0].imageInitials)) {
      let personaList = [];
      let showSize16Personas = (iconContents.length > 1 || props.isCompact);
      let personaLimit = props.isCompact ? 3 : 4;
      iconContents.filter((person, index) => index < personaLimit).forEach((person, index) => {
        personaList.push(
          <Persona
            {...person}
            // tslint:disable-next-line:no-string-literal
            key={ person['key'] ? person['key'] : index }
            className={ this._classNames.activityPersona }
            size={ showSize16Personas ? PersonaSize.size16 : PersonaSize.extraSmall }
            hidePersonaDetails={ true }
            style={
              props.isCompact && {
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

  // Build a single JSX element from the strings/elements in the commentElements array.
  @autobind
  private _onRenderCommentText(props: IActivityItemProps): JSX.Element {
    return (
      <div className={ this._classNames.commentText }>
        { props.commentElements.map((item, index) => <span key={ index }>{ item }</span>) }
      </div>
    );
  }

  @autobind
  private _onRenderTimeStamp(props: IActivityItemProps): JSX.Element {
    if (!props.isCompact) {
      return (
        <div className={ this._classNames.timeStamp }>{ props.timeStamp }</div>
      );
    }
  }

  // Determine what classNames each element needs
  @memoize
  private _getClassNames(styles: IActivityItemStyles, className: string, iconContents: Array<IPersonaProps> | JSX.Element, isCompact: boolean): IActivityItemClassNames {
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
        !isCompact && Array.isArray(iconContents) && iconContents.length === 2 && styles.doublePersona
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