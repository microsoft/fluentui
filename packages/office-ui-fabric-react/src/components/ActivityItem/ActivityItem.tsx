/* tslint:disable */
import * as React from 'react';
/* tslint:enable */

import { autobind, BaseComponent, css, getNativeProps, htmlElementProperties, memoize } from '../../Utilities';
import { IActivityItemProps, IActivityItemStyles } from './ActivityItem.Props';
import { mergeStyles } from '../../Styling';
import { getStyles } from './ActivityItem.styles';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { Image } from '../Image/Image';

export class ActivityItem extends BaseComponent<IActivityItemProps, {}> {

  private _classNames: any;
  private _styles: any;

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
      this.props.people.length
    );

    return (
      <div
        className={ this._classNames.root }>
        <div className={ this._classNames.personaContainer }>
          { this._onRenderPersonas(this.props) }
        </div>
        <div className={ this._classNames.activityContent }>
          <div>
            <span className={ this._classNames.nameText }>
              { this.props.people[0].primaryText }
            </span>
            <span> Commented</span>
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
  private _onRenderPersonas(props: IActivityItemProps): Array<JSX.Element> {
    let {
      styles
    } = props;
    let personaList = [];

    if (this.props.people.length === 1) {
      personaList.push(
        <Persona
          key={ 0 }
          className={ this._classNames.activityPersona }
          primaryText={ this.props.people[0].primaryText }
          imageUrl={ this.props.people[0].imageUrl }
          size={ PersonaSize.extraSmall }
          hidePersonaDetails={ true } />
      );
    } else if (this.props.people.length > 1) {
      this.props.people.forEach((person) => {
        personaList.push(
          <Persona
            key={ person.primaryText }
            className={ this._classNames.activityPersona }
            primaryText={ person.primaryText }
            imageUrl={ person.imageUrl }
            size={ PersonaSize.extraExtraSmall }
            hidePersonaDetails={ true } />
        );
      });
    } else {
      personaList.push('icon');
    }

    return (personaList);
  }

  @memoize
  private _getClassNames(styles: IActivityItemStyles, className: string, numberOfPeople: number): any {
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

      activityPersona: mergeStyles(
        'ms-ActivityItem-activityPersona',
        styles.activityPersona,
        numberOfPeople > 1 ? styles.multiPersona : ''
      ) as string,

      commentText: mergeStyles(
        'ms-ActivityItem-commentText',
        styles.commentText
      ) as string,

      nameText: mergeStyles(
        'ms-ActivityItem-nameText',
        styles.nameText
      ) as string,

      timeStamp: mergeStyles(
        'ms-ActivityItem-timeStamp',
        styles.timeStamp
      ) as string
    };
  }

}