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
        React.createElement('span', { className: 'ms-activityItem-customComment' }, 'Hello world!')
      ],
      people: [
        {
          imageUrl: TestImages.personaFemale,
          primaryText: 'Annie Lindqvist',
        },
        {
          imageUrl: TestImages.personaMale,
          primaryText: 'Robert Larsson',
        }
      ],
      activityDescription: [
        'Testing',
        ' a string ',
        <span className={ css('ms-activityItem-nameText') }> and a Jsx element </span>,
        ' and another string',
        <span className={ css('ms-activityItem-linkText') } onClick={ this.onCustomClick } > and a clickable Jsx element.</span>,
      ],
      timeString: '11:32am PST 6/27/2017'
    };

    return (
      <div>
        <ActivityItem {...props} onRenderIcon={ this.onRenderIcon } onRenderTimeStamp={ this.onRenderTimeStamp } />
        <ActivityItem {...props} onRenderNameList={ this.onRenderNameList } onRenderIcon={ this.onRenderPersona } />
      </div>
    );
  }

  public onRenderIcon(props: IActivityItemProps): JSX.Element {
    return <Icon className={ css('ms-activityItem-customIcon') } iconName={ 'Emoji2' } />;
  }

  public onRenderPersona(props: IActivityItemProps): JSX.Element {
    return <Persona className={ css('ms-activityItem-customPersona') } {...props.people[0]} size={ PersonaSize.extraSmall } />;
  }

  public onRenderNameList(props: IActivityItemProps): JSX.Element {
    return <span>A few people</span>;
  }

  public onRenderTimeStamp(props: IActivityItemProps): JSX.Element {
    return <span>Back in the day</span>;
  }

  public onCustomClick(): void {
    alert('custom link clicked');
  }
}
