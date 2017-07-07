/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { css } from 'office-ui-fabric-react/lib/Utilities';
import { ActivityItem } from '../ActivityItem';
import { Icon } from '../../../Icon';
import { Persona, PersonaSize } from '../../../Persona';
import './ActivityItemExample.scss';
import { TestImages } from '../../../common/TestImages';
import { IActivityItemProps } from '../ActivityItem.Props';

export class ActivityItemCustomExample extends React.Component<React.Props<ActivityItemCustomExample>, {}> {
  public render() {
    let activityExampleList = [];
    let props = {
      commentElements: [
        React.createElement('span', { className: 'ms-activityItem-customComment' }, 'This activity item has every element created by a custom renderer.')
      ],
      iconContents: <Persona className={ css('ms-activityItem-customPersona') } imageInitials={ 'CR' } size={ PersonaSize.extraSmall } />,
      activityDescription: [
        'A description made from a string, ',
        <span className={ css('ms-activityItem-nameText') }>a Jsx element </span>,
        ' and another string ',
        <span className={ css('ms-activityItem-linkText') } onClick={ this.onCustomClick } > and a clickable Jsx element.</span>,
      ],
      timeString: '11:32am PST 6/27/2017'
    };

    return (
      <div>
        <ActivityItem {...props} onRenderTimeStamp={ this.onRenderTimeStamp } />
      </div>
    );
  }

  public onRenderTimeStamp(props: IActivityItemProps): JSX.Element {
    return <div style={ { background: '#333333', color: '#eeeeee', padding: '4px' } }>Custom timestamp</div>;
  }

  public onCustomClick(): void {
    alert('custom link clicked');
  }
}
