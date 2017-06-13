/* tslint:disable */
import * as React from 'react';
/* tslint:enable */

import { IActivityItemProps } from './ActivityItem.Props';
import { Image } from '../Image/Image';
import { css, getNativeProps, htmlElementProperties } from '../../Utilities';
import { getStyles } from './ActivityItem.styles';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';

export function ActivityItem(props: IActivityItemProps): JSX.Element {
  let {
    activityType,
    people,
    className,
    styles: customStyles
  } = props;
  let styles = getStyles(undefined, customStyles);

  return (
    <div
      className={ css('ms-ActivityItem', styles.root, props.className) }>
      <div className={ css('ms-ActivityItem-persona', styles.personaContainer) }>
        <Persona
          primaryText={ props.people[0].primaryText }
          imageUrl={ props.people[0].imageUrl }
          size={ PersonaSize.extraSmall }
          hidePersonaDetails={ true } />
      </div>
      <div className={ css('ms-ActivityItem-content', styles.activityContent) }>
        <div>
          <span className={ css('ms-ActivityItem', styles.nameText) }>
            { props.people[0].primaryText }
          </span>
          <span>Commented</span>
        </div>
        <div>
          <span className={ css('ms-ActivityItem', styles.commentText) }>
            { props.commentString }
          </span>
          { props.timeString }
        </div>
      </div>
    </div>
  );

}