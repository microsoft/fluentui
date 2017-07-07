/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { ActivityItem } from '../ActivityItem';
import './ActivityItemExample.scss';
import { Icon } from '../../../Icon';

export class ActivityItemIconExample extends React.Component<React.Props<ActivityItemIconExample>, {}> {
  public render() {
    let activityExampleList = [];
    activityItemIconExamples.forEach((item) => {
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

const activityItemIconExamples = [
  {
    key: 1,
    activityDescription: [
      React.createElement('span', { className: 'ms-activityItem-nameText' }, 'Robert Larsson'),
      ' edited ',
      React.createElement('a', { className: 'ms-activityItem-linkText', onClick: () => alert('The edited document was clicked') }, 'DocumentName.docx')
    ],
    iconContents: React.createElement(Icon, { iconName: 'Edit' }),
    timeString: '4 days ago'
  },
  {
    key: 2,
    activityDescription: [
      React.createElement('span', { className: 'ms-activityItem-nameText' }, 'Robert Larsson'),
      ' moved ',
      React.createElement('a', { className: 'ms-activityItem-linkText', onClick: () => alert('The moved document was clicked') }, 'AnotherDocument.pptx'),
      ' from ',
      React.createElement('a', { className: 'ms-activityItem-linkText', onClick: () => alert('The source folder was clicked') }, 'Source Folder'),
      ' to ',
      React.createElement('a', { className: 'ms-activityItem-linkText', onClick: () => alert('The destination folder was clicked') }, 'Destination Folder')
    ],
    iconContents: React.createElement(Icon, { iconName: 'FabricMovetoFolder' }),
    timeString: '4 days ago'
  },
  {
    key: 3,
    activityDescription: [
      React.createElement('span', { className: 'ms-activityItem-nameText' }, 'Robert Larsson'),
      ' renamed ',
      React.createElement('a', { className: 'ms-activityItem-linkText', onClick: () => alert('The old document name was clicked') }, 'OldDocumentTitle.xlsx'),
      ' to ',
      React.createElement('a', { className: 'ms-activityItem-linkText', onClick: () => alert('The new document name was clicked') }, 'NewDocumentTitle.xlsx')
    ],
    iconContents: React.createElement(Icon, { iconName: 'Rename' }),
    timeString: ' 4 days ago'
  },
  {
    key: 4,
    activityDescription: [
      React.createElement('span', { className: 'ms-activityItem-nameText' }, 'Robert Larsson'),
      ' shared ',
      React.createElement('a', { className: 'ms-activityItem-linkText', onClick: () => alert('The shared document name was clicked') }, 'DocumentName.docx'),
      ' with ',
      React.createElement('a', { className: 'ms-activityItem-linkText', onClick: () => alert('The share recipient was clicked') }, 'Annie Lindqvist')
    ],
    iconContents: React.createElement(Icon, { iconName: 'Share' }),
    timeString: '4 days ago'
  },
  {
    key: 5,
    activityDescription: [
      React.createElement('span', { className: 'ms-activityItem-nameText' }, 'Robert Larsson'),
      ' added ',
      React.createElement('a', { className: 'ms-activityItem-linkText', onClick: () => alert('The new document name was clicked') }, 'NewDocument.xlsx'),
      ' in ',
      React.createElement('a', { className: 'ms-activityItem-linkText', onClick: () => alert('The new document folder was clicked') }, 'Folder Name')
    ],
    iconContents: React.createElement(Icon, { iconName: 'Add' }),
    timeString: '4 days ago'
  },
  {
    key: 6,
    activityDescription: [
      React.createElement('span', { className: 'ms-activityItem-nameText' }, 'Robert Larsson'),
      ' deleted ',
      React.createElement('span', { className: 'ms-activityItem-linkText' }, 'DeletedDocument.pptx'),
      ' from ',
      React.createElement('a', { className: 'ms-activityItem-linkText', onClick: () => alert('The folder deleted from was clicked') }, 'Folder Name')
    ],
    iconContents: React.createElement(Icon, { iconName: 'Delete' }),
    timeString: '4 days ago'
  },
  {
    key: 7,
    activityDescription: [
      React.createElement('span', { className: 'ms-activityItem-nameText' }, 'Robert Larsson'),
      ' restored ',
      React.createElement('span', { className: 'ms-activityItem-linkText', onClick: () => alert('The restored file was clicked') }, 'RestoredDocument.docx')
    ],
    iconContents: React.createElement(Icon, { iconName: 'Refresh' }),
    timeString: '4 days ago'
  },
  {
    key: 8,
    activityDescription: [
      React.createElement('span', { className: 'ms-activityItem-nameText' }, 'Robert Larsson'),
      ' created Version 2.0 on'
    ],
    iconContents: React.createElement(Icon, { iconName: 'FabricMovetoFolder' }),
    timeString: '6/20/17 at 8:41pm'
  }
];