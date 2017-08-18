/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { ActivityItem } from '../ActivityItem';
import { TestImages } from '../../../common/TestImages';
import { Icon } from '../../../Icon';

const activityItemExamples = [
  {
    key: 1,
    activityDescription: [
      <span key={ 1 } className={ 'ms-activityItem-nameText' }>Tahlia	Whittle</span>,
      <span key={ 2 }> edited this file</span>
    ],
    activityPersonas: [
      {
        imageUrl: TestImages.personaFemale
      }
    ],
    isCompact: true
  },
  {
    key: 2,
    activityDescription: [
      <span key={ 1 } className={ 'ms-activityItem-nameText' }>Patrick Loton</span>,
      <span key={ 2 }> and </span>,
      <span key={ 3 } className={ 'ms-activityItem-nameText' }> 6 others</span>
    ],
    activityPersonas: [
      {
        imageInitials: 'PT',
        primaryText: 'Robert Larsson'
      },
      {
        imageUrl: TestImages.personaMale
      },
      {
        imageInitials: 'EC',
        primaryText: 'Eduarda Costa'
      }
    ],
    isCompact: true
  },
  {
    key: 3,
    activityDescription: [
      <span key={ 1 } className={ 'ms-activityItem-nameText' }>Sabrina De Luca</span>,
      <span key={ 2 }> added this file</span>
    ],
    activityIcon: React.createElement(Icon, { iconName: 'Add' }),
    isCompact: true
  },
  {
    key: 4,
    activityDescription: [
      <span key={ 1 } className={ 'ms-activityItem-nameText' }>Chuan Rojumanong</span>,
      <span key={ 2 }> shared this file</span>
    ],
    activityIcon: React.createElement(Icon, { iconName: 'Share' }),
    isCompact: true
  }
];

export class ActivityItemCompactExample extends React.Component<React.Props<ActivityItemCompactExample>, {}> {
  public render() {
    let activityExampleList: Array<JSX.Element> = [];
    activityItemExamples.forEach((item) => {
      let props = item;
      activityExampleList.push(
        <ActivityItem {...props} key={ item.key } className={ 'ms-activityItem-exampleRoot' } />
      );
    });

    return (
      <div>
        { activityExampleList }
      </div>
    );
  }
}
