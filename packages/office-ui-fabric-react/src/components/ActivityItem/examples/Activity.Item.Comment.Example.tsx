/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { ActivityItem } from '../ActivityItem';
import './ActivityItemExample.scss';
import { Icon } from '../../../Icon';

export class ActivityItemCommentExample extends React.Component<React.Props<ActivityItemCommentExample>, {}> {
  public render() {
    let activityExampleList = [];
    activityItemCommentExamples.forEach((item) => {
      let props = item;
      activityExampleList.push(
        <ActivityItem {...props} />
      );
    });

    return (
      <div>
        { activityExampleList }
      </div>
    );
  }
}

const activityItemCommentExamples = [
  {
    key: 1,
    activityDescription: [
      React.createElement('span', { className: 'ms-activityItem-nameText' }, 'Robert Larsson'),
      ' commented on this'
    ],
    commentElements: ['This is a basic comment.'],
    iconContents: React.createElement(Icon, { iconName: 'Message' }),
    timeString: '3 days ago'
  },
  {
    key: 2,
    activityDescription: [
      React.createElement('span', { className: 'ms-activityItem-nameText' }, 'Annie Lindqvist'),
      ' mentioned you'
    ],
    commentElements: [
      'This is an at mention message. ',
      React.createElement('a', { className: 'ms-activityItem-linkText', onClick: () => alert('The mentioned name was clicked') }, '@Your Name'),
      ' was mentioned in the middle of it.'
    ],
    iconContents: React.createElement(Icon, { iconName: 'Accounts' }),
    timeString: '3 days ago'
  },
  {
    key: 3,
    activityDescription: [
      React.createElement('span', { className: 'ms-activityItem-nameText' }, 'Robert Larsson'),
      ' mentioned you'
    ],
    commentElements: [
      React.createElement('span', { className: 'ms-activityItem-nameText' }, '@Your Name'),
      ' was mentioned at the start of this message. ',
      React.createElement('span', { className: 'ms-activityItem-nameText' }, '@Another Name'),
      ' was mentioned in the middle of it.'
    ],
    iconContents: React.createElement(Icon, { iconName: 'Accounts' }),
    timeString: '3 days ago'
  }
];