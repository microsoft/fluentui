/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { css } from 'office-ui-fabric-react/lib/Utilities';
import { ActivityItem } from '../ActivityItem';
import { Icon } from '../../../Icon';
import { Persona, PersonaSize } from '../../../Persona';
import './ActivityItemExample.scss';
import { TestImages } from '../../../common/TestImages';
import { activityItemPersonaExamples } from './ActivityItemExampleData';
import { IActivityItemProps, ActivityType } from '../ActivityItem.Props';


export class ActivityItemCustomExample extends React.Component<React.Props<ActivityItemCustomExample>, {}> {
  public render() {
    let activityExampleList = [];
    let props = {
      activityType: ActivityType.CommentInDocument,
      commentString: 'Hello world!',
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
      timeString: '11:32am PST 6/27/2017'
    };

    return (
      <div>
        <ActivityItem {...props} onRenderDescription={ this.onRenderDescription } onRenderIcon={ this.onRenderIcon } onRenderTimeStamp={ this.onRenderTimeStamp } />
        <ActivityItem {...props} onRenderNameList={ this.onRenderNameList } onRenderIcon={ this.onRenderPersona } onRenderComment={ this.onRenderComment } />
      </div>
    );
  }

  public onRenderIcon(props: IActivityItemProps): JSX.Element {
    return <Icon className={ css('ms-activityItem-customIcon') } iconName={ 'Emoji2' } />;
  }

  public onRenderPersona(props: IActivityItemProps): JSX.Element {
    return <Persona className={ css('ms-activityItem-customPersona') } {...props.people[0]} size={ PersonaSize.extraSmall } />;
  }

  public onRenderDescription(props: IActivityItemProps): JSX.Element {
    return <span> did an activity with a custom description</span>;
  }

  public onRenderComment(props: IActivityItemProps): JSX.Element {
    return (
      <div className={ css('ms-activityItem-customComment') }>
        <Icon className={ css('ms-activityItem-customCommentIcon') } iconName={ 'RightDoubleQuote' } />
        <div>{ props.commentString }</div>
      </div>
    );
  }

  public onRenderNameList(props: IActivityItemProps): JSX.Element {
    return <span>A few people</span>;
  }

  public onRenderTimeStamp(props: IActivityItemProps): JSX.Element {
    return <span>Back in the day</span>;
  }
}
