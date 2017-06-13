/* tslint:disable */
import * as React from 'react';
/* tslint:enable */

import { BaseComponent, css, getNativeProps, htmlElementProperties } from '../../Utilities';
import { IActivityItemProps } from './ActivityItem.Props';
import { getStyles } from './ActivityItem.styles';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { Image } from '../Image/Image';

export class ActivityItem extends BaseComponent<IActivityItemProps, {}> {
  public render() {
    let {
      className,
      styles: customStyles
    } = this.props;
    let styles = getStyles(undefined, customStyles);

    return (
      <div
        className={ css('ms-ActivityItem', styles.root, this.props.className) }>
        <div className={ css('ms-ActivityItem-persona', styles.personaContainer) }>
          { this._createPersonas() }
        </div>
        <div className={ css('ms-ActivityItem-content', styles.activityContent) }>
          <div>
            <span className={ css('ms-ActivityItem', styles.nameText) }>
              { this.props.people[0].primaryText }
            </span>
            <span> Commented</span>
          </div>
          <div>
            <span className={ css('ms-ActivityItem-commentText', styles.commentText) }>
              { this.props.commentString }
            </span>
            <div className={ css('ms-ActivityItem-timeStamp', styles.timeStamp) }>
              { this.props.timeString }
            </div>
          </div>
        </div>
      </div>
    );
  }

  private _createPersonas() {
    let personaList = [];

    if (this.props.people.length === 1) {
      personaList.push(
        <Persona
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

}