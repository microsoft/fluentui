/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { ActivityItem } from '../ActivityItem';
import './ActivityItemExample.scss';
import { TestImages } from '../../../common/TestImages';
import { Icon } from '../../../Icon';

export class ActivityItemCompactExample extends React.Component<React.Props<ActivityItemCompactExample>, {}> {
  public render() {
    let activityExampleList = [];
    activityItemCompactExamples.forEach((item) => {
      let props = item;
      activityExampleList.push(
        <ActivityItem {...props} isCompact={ true } style={ { width: '200px' } } />
      );
    });

    return (
      <div>
        { activityExampleList }
      </div>
    );
  }
}

const activityItemCompactExamples = [
  {
    key: 1,
    activityDescription: [
      React.createElement('span', { className: 'ms-activityItem-nameText' }, 'Robert Larsson'),
      ' commented'
    ],
    iconContents: [
      {
        imageUrl: TestImages.personaMale
      }
    ],
    commentElements: ['This comment text should be invisible in the compact variant'],
    timeString: 'Just now'
  },
  {
    key: 2,
    activityDescription: [
      React.createElement('span', { className: 'ms-activityItem-nameText' }, 'Robert Larsson'),
      ' +1 other mentioned you'
    ],
    iconContents: [
      {
        imageInitials: 'RL',
        primaryText: 'Robert Larsson'
      },
      {
        imageUrl: TestImages.personaMale
      }
    ],
    timeString: 'Just now'
  },
  {
    key: 3,
    activityDescription: [
      React.createElement('span', { className: 'ms-activityItem-nameText' }, 'Robert Larsson'),
      ' commented'
    ],
    iconContents: React.createElement(Icon, { iconName: 'MessageFill' }),
    timeString: 'Just now'
  },
  {
    key: 4,
    activityDescription: [
      React.createElement('span', { className: 'ms-activityItem-nameText' }, 'Annie Lindqvist'),
      ' edited this'
    ],
    iconContents: React.createElement(Icon, { iconName: 'Edit' }),
    timeString: 'Just now'
  },
  {
    key: 5,
    activityDescription: [
      React.createElement('span', { className: 'ms-activityItem-nameText' }, 'Annie Lindqvist'),
      ' +3 others commented'
    ],
    iconContents: [
      {
        imageInitials: 'AL',
        primaryText: 'Annie Lindqvist'
      },
      {
        imageUrl: TestImages.personaMale
      },
      {
        imageInitials: 'RC',
        primaryText: 'Rosie Costa'
      },
      {
        imageInitials: 'AR',
        primaryText: 'Aaron Reid'
      }
    ],
    timeString: 'Just now'
  },
];
