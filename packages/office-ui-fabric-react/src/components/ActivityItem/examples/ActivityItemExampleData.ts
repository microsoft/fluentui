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
    people: [
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
      React.createElement('span', { className: 'ms-activityItem-nameText' }, 'Annie Lindqvist'),
      ' +1 other mentioned you'
    ],
    people: [
      {
        imageInitials: 'AL'
      },
      {
        imageUrl: TestImages.personaMale,
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
    onRenderIcon: (props: IActivityItemProps) => { return React.createElement(Icon, { iconName: 'MessageFill' }) },
    people: [
      {
        primaryText: 'Robert Larsson'
      }
    ],
    timeString: 'Just now'
  },
  {
    key: 4,
    activityDescription: [
      React.createElement('span', { className: 'ms-activityItem-nameText' }, 'Annie Lindqvist'),
      ' edited this'
    ],
    onRenderIcon: (props: IActivityItemProps) => { return React.createElement(Icon, { iconName: 'Edit' }) },
    people: [
      {
        primaryText: 'Robert Larsson'
      }
    ],
    timeString: 'Just now'
  },
  {
    key: 5,
    activityDescription: [
      React.createElement('span', { className: 'ms-activityItem-nameText' }, 'Annie Lindqvist'),
      ' +3 others commented'
    ],
    people: [
      {
        imageInitials: 'AL'
      },
      {
        imageUrl: TestImages.personaMale
      },
      {
        imageInitials: 'RC'
      },
      {
        imageInitials: 'AR'
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
    people: [
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
    people: [
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
    people: [
      {
        imageInitials: 'AL'
      },
      {
        imageInitials: 'RL'
      },
      {
        imageInitials: 'RC'
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
    people: [
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
    people: [
      {
        imageInitials: 'AL'
      },
      {
        imageUrl: TestImages.personaMale
      },
      {
        imageUrl: TestImages.personaMale
      },
      {
        imageInitials: 'AL'
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
    onRenderIcon: (props: IActivityItemProps) => { return React.createElement(Icon, { iconName: 'Message' }) },
    people: [
      {
        primaryText: 'Robert Larsson'
      }
    ],
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
    onRenderIcon: (props: IActivityItemProps) => { return React.createElement(Icon, { iconName: 'Accounts' }) },
    people: [
      {
        primaryText: 'Robert Larsson'
      }
    ],
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
    onRenderIcon: (props: IActivityItemProps) => { return React.createElement(Icon, { iconName: 'Accounts' }) },
    people: [
      {
        primaryText: 'Robert Larsson'
      }
    ],
    timeString: '3 days ago'
  }
];

export const activityItemIconExamples: (IActivityItemProps & { key: string | number })[] = [
  {
    key: 1,
    people: [
      {
        primaryText: 'Robert Larsson'
      }
    ],
    activityDescription: [
      React.createElement('span', { className: 'ms-activityItem-nameText' }, 'Robert Larsson'),
      ' edited ',
      React.createElement('a', { className: 'ms-activityItem-linkText', onClick: () => alert('The edited document was clicked') }, 'DocumentName.docx')
    ],
    onRenderIcon: (props: IActivityItemProps) => { return React.createElement(Icon, { iconName: 'Edit' }) },
    timeString: '4 days ago'
  },
  {
    key: 2,
    people: [
      {
        primaryText: 'Robert Larsson'
      }
    ],
    activityDescription: [
      React.createElement('span', { className: 'ms-activityItem-nameText' }, 'Robert Larsson'),
      ' moved ',
      React.createElement('a', { className: 'ms-activityItem-linkText', onClick: () => alert('The moved document was clicked') }, 'AnotherDocument.pptx'),
      ' from ',
      React.createElement('a', { className: 'ms-activityItem-linkText', onClick: () => alert('The source folder was clicked') }, 'Source Folder'),
      ' to ',
      React.createElement('a', { className: 'ms-activityItem-linkText', onClick: () => alert('The destination folder was clicked') }, 'Destination Folder')
    ],
    onRenderIcon: (props: IActivityItemProps) => { return React.createElement(Icon, { iconName: 'FabricMovetoFolder' }) },
    timeString: '4 days ago'
  },
  {
    key: 3,
    people: [
      {
        primaryText: 'Robert Larsson'
      }
    ],
    activityDescription: [
      React.createElement('span', { className: 'ms-activityItem-nameText' }, 'Robert Larsson'),
      ' renamed ',
      React.createElement('a', { className: 'ms-activityItem-linkText', onClick: () => alert('The old document name was clicked') }, 'OldDocumentTitle.xlsx'),
      ' to ',
      React.createElement('a', { className: 'ms-activityItem-linkText', onClick: () => alert('The new document name was clicked') }, 'NewDocumentTitle.xlsx')
    ],
    onRenderIcon: (props: IActivityItemProps) => { return React.createElement(Icon, { iconName: 'Rename' }) },
    timeString: ' 4 days ago'
  },
  {
    key: 4,
    people: [
      {
        primaryText: 'Robert Larsson'
      }
    ],
    activityDescription: [
      React.createElement('span', { className: 'ms-activityItem-nameText' }, 'Robert Larsson'),
      ' shared ',
      React.createElement('a', { className: 'ms-activityItem-linkText', onClick: () => alert('The shared document name was clicked') }, 'DocumentName.docx'),
      ' with ',
      React.createElement('a', { className: 'ms-activityItem-linkText', onClick: () => alert('The share recipient was clicked') }, 'Annie Lindqvist')
    ],
    onRenderIcon: (props: IActivityItemProps) => { return React.createElement(Icon, { iconName: 'Share' }) },
    timeString: '4 days ago'
  },
  {
    key: 5,
    people: [
      {
        primaryText: 'Robert Larsson'
      }
    ],
    activityDescription: [
      React.createElement('span', { className: 'ms-activityItem-nameText' }, 'Robert Larsson'),
      ' added ',
      React.createElement('a', { className: 'ms-activityItem-linkText', onClick: () => alert('The new document name was clicked') }, 'NewDocument.xlsx'),
      ' in ',
      React.createElement('a', { className: 'ms-activityItem-linkText', onClick: () => alert('The new document folder was clicked') }, 'Folder Name')
    ],
    onRenderIcon: (props: IActivityItemProps) => { return React.createElement(Icon, { iconName: 'Add' }) },
    timeString: '4 days ago'
  },
  {
    key: 6,
    people: [
      {
        primaryText: 'Robert Larsson'
      }
    ],
    activityDescription: [
      React.createElement('span', { className: 'ms-activityItem-nameText' }, 'Robert Larsson'),
      ' deleted ',
      React.createElement('span', { className: 'ms-activityItem-linkText' }, 'DeletedDocument.pptx'),
      ' from ',
      React.createElement('a', { className: 'ms-activityItem-linkText', onClick: () => alert('The folder deleted from was clicked') }, 'Folder Name')
    ],
    onRenderIcon: (props: IActivityItemProps) => { return React.createElement(Icon, { iconName: 'Trash' }) },
    timeString: '4 days ago'
  },
  {
    key: 7,
    people: [
      {
        primaryText: 'Robert Larsson'
      }
    ],
    activityDescription: [
      React.createElement('span', { className: 'ms-activityItem-nameText' }, 'Robert Larsson'),
      ' restored ',
      React.createElement('span', { className: 'ms-activityItem-linkText', onClick: () => alert('The restored file was clicked') }, 'RestoredDocument.docx')
    ],
    onRenderIcon: (props: IActivityItemProps) => { return React.createElement(Icon, { iconName: 'Refresh' }) },
    timeString: '4 days ago'
  },
  {
    key: 8,
    people: [
      {
        primaryText: 'Robert Larsson'
      }
    ],
    activityDescription: [
      React.createElement('span', { className: 'ms-activityItem-nameText' }, 'Robert Larsson'),
      ' created Version 2.0 on'
    ],
    onRenderIcon: (props: IActivityItemProps) => { return React.createElement(Icon, { iconName: 'FabricMovetoFolder' }) },
    timeString: '6/20/17 at 8:41pm'
  }
];