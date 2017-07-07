/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { ActivityItem } from '../ActivityItem';
import './ActivityItemExample.scss';
import { TestImages } from '../../../common/TestImages';
import { Icon } from '../../../Icon';

export class ActivityItemPersonaExample extends React.Component<React.Props<ActivityItemPersonaExample>, {}> {
  public render() {
    let activityExampleList = [];
    activityItemPersonaExamples.forEach((item) => {
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

const activityItemPersonaExamples = [
  {
    key: 1,
    activityDescription: [
      React.createElement('span', { className: 'ms-activityItem-nameText' }, 'Robert Larsson'),
      ' commented on this'
    ],
    iconContents: [
      {
        imageUrl: TestImages.personaMale
      }
    ],
    commentElements: ['This is the text of the comment! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet turpis auctor eros laoreet cursus. Cras dictum auctor fringilla. Sed porttitor justo et nisl lacinia sodales.'],
    timeString: 'Just now'
  },
  {
    key: 2,
    activityDescription: [
      React.createElement('span', { className: 'ms-activityItem-nameText' }, 'Annie Lindqvist'),
      ' and ',
      React.createElement('span', { className: 'ms-activityItem-nameText' }, 'Robert Larsson'),
      ' commented in the document'
    ],
    iconContents: [
      {
        imageUrl: TestImages.personaFemale
      },
      {
        imageUrl: TestImages.personaMale
      }
    ],
    timeString: '1 hour ago'
  },
  {
    key: 3,
    activityDescription: [
      React.createElement('span', { className: 'ms-activityItem-nameText' }, 'Annie Lindqvist'),
      ', ',
      React.createElement('span', { className: 'ms-activityItem-nameText' }, 'Robert Larsson'),
      ' and ',
      React.createElement('span', { className: 'ms-activityItem-nameText' }, '1 other'),
      ' edited ',
      React.createElement('a', { className: 'ms-activityItem-linkText', onClick: () => alert('The edited document was clicked') }, 'DocumentName.docx')
    ],
    iconContents: [
      {
        imageInitials: 'AL',
        primaryText: 'Annie Lindqvist'
      },
      {
        imageInitials: 'RL',
        primaryText: 'Robert Larsson'
      },
      {
        imageInitials: 'RK',
        primaryText: 'Roko Kolar'
      }
    ],
    timeString: '8:37am'
  },
  {
    key: 4,
    activityDescription: [
      React.createElement('span', { className: 'ms-activityItem-nameText' }, 'Annie Lindqvist'),
      ', ',
      React.createElement('span', { className: 'ms-activityItem-nameText' }, 'Robert Larsson'),
      ' and ',
      React.createElement('span', { className: 'ms-activityItem-nameText' }, '2 others'),
      ' mentioned you'
    ],
    iconContents: [
      {
        imageUrl: TestImages.personaFemale
      },
      {
        imageUrl: TestImages.personaMale
      },
      {
        imageUrl: TestImages.personaMale
      },
      {
        imageInitials: 'RK',
        primaryText: 'Roko Kolar'
      }
    ],
    timeString: 'Yesterday'
  },
  {
    key: 5,
    activityDescription: [
      React.createElement('span', { className: 'ms-activityItem-nameText' }, 'Annie Lindqvist'),
      ', ',
      React.createElement('span', { className: 'ms-activityItem-nameText' }, 'Robert Larsson'),
      ' and ',
      React.createElement('span', { className: 'ms-activityItem-nameText' }, '6 others'),
      ' commented on this'
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
        imageInitials: 'RL',
        primaryText: 'Robert Larson'
      },
      {
        imageUrl: TestImages.personaFemale
      },
      {
        imageUrl: TestImages.personaFemale
      },
      {
        imageUrl: TestImages.personaMale
      },
      {
        imageUrl: TestImages.personaMale
      },
      {
        imageUrl: TestImages.personaFemale
      }
    ],
    timeString: '2 days ago'
  }
];