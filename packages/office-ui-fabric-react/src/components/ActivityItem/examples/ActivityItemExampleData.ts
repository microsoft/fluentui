/* tslint:disable-next-line:no-unused-variable */
import * as React from 'react';

import { IActivityItemProps } from '../ActivityItem.Props';
import { TestImages } from '../../../common/TestImages';
import { Icon } from '../../../Icon';

export const activityItemCompactExamples: (IActivityItemProps & { key: string | number })[] = [
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

export const activityItemPersonaExamples: (IActivityItemProps & { key: string | number })[] = [
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

export const activityItemCommentExamples: (IActivityItemProps & { key: string | number })[] = [
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

export const activityItemIconExamples: (IActivityItemProps & { key: string | number })[] = [
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