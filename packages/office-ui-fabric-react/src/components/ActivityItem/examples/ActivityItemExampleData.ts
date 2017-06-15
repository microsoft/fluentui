import { IActivityItemProps, ActivityType } from '../ActivityItem.Props';
import { TestImages } from '../../../common/TestImages';

export const activityItemExamples: (IActivityItemProps & { key: string | number })[] = [
  {
    key: 0,
    activityType: ActivityType.Message,
    people: [
      {
        imageUrl: TestImages.personaMale,
        primaryText: 'Robert Larsson'
      }
    ],
    commentString: 'This is the text of the comment! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet turpis auctor eros laoreet cursus. Cras dictum auctor fringilla. Sed porttitor justo et nisl lacinia sodales.',
    timeString: 'Just now'
  },

  {
    key: 1,
    activityType: ActivityType.CommentInDocument,
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
    timeString: '1 hour ago'
  },

  {
    key: 2,
    activityType: ActivityType.Mention,
    people: [
      {
        imageUrl: TestImages.personaFemale,
        primaryText: 'Annie Lindqvist',
      },
      {
        imageUrl: TestImages.personaMale,
        primaryText: 'Robert Larsson',
      },
      {
        imageUrl: TestImages.personaFemale,
        primaryText: 'Rosie Costa',
      }
    ],
    timeString: '8:37am'
  },

  {
    key: 3,
    activityType: ActivityType.Edit,
    people: [
      {
        imageUrl: TestImages.personaFemale,
        primaryText: 'Annie Lindqvist',
      },
      {
        imageUrl: TestImages.personaMale,
        primaryText: 'Robert Larsson',
      },
      {
        imageUrl: TestImages.personaMale,
        primaryText: 'Aaron Reid',
      },
      {
        imageUrl: TestImages.personaFemale,
        primaryText: 'Rosie Costa',
      }
    ],
    fileActivity: {
      fileName: 'DocumentName.docx',
      fileHref: '#testLink'
    },
    timeString: 'Yesterday'
  },

  {
    key: 4,
    activityType: ActivityType.Move,
    people: [
      {
        imageUrl: TestImages.personaFemale,
        primaryText: 'Annie Lindqvist',
      }
    ],
    fileActivity: {
      fileName: 'DocumentName.docx',
      fileHref: '#fileLink',
      sourceFolderName: 'Source Folder Name',
      destinationFolderName: 'Destination Folder Name',
      destinationFolderHref: '#destinationFolderLink'
    },
    timeString: '2 days ago'
  },
  {
    key: 5,
    activityType: ActivityType.Message,
    people: [
      {
        primaryText: 'Robert Larsson'
      }
    ],
    timeString: ' 4 days ago'
  },
  {
    key: 6,
    activityType: ActivityType.Edit,
    people: [
      {
        primaryText: 'Robert Larsson'
      }
    ],
    timeString: ' 4 days ago'
  },
  {
    key: 7,
    activityType: ActivityType.Share,
    people: [
      {
        primaryText: 'Robert Larsson'
      }
    ],
    timeString: ' 4 days ago'
  },
  {
    key: 8,
    activityType: ActivityType.Rename,
    people: [
      {
        primaryText: 'Robert Larsson'
      }
    ],
    timeString: ' 4 days ago'
  },
  {
    key: 9,
    activityType: ActivityType.Add,
    people: [
      {
        primaryText: 'Robert Larsson'
      }
    ],
    timeString: ' 4 days ago'
  },
  {
    key: 10,
    activityType: ActivityType.Delete,
    people: [
      {
        primaryText: 'Robert Larsson'
      }
    ],
    timeString: ' 4 days ago'
  },
  {
    key: 11,
    activityType: ActivityType.Restore,
    people: [
      {
        primaryText: 'Robert Larsson'
      }
    ],
    timeString: ' 4 days ago'
  },
  {
    key: 12,
    activityType: ActivityType.Version,
    people: [
      {
        primaryText: 'Robert Larsson'
      }
    ],
    timeString: ' 4 days ago'
  },
  {
    key: 13,
    activityType: ActivityType.Custom,
    people: [
      {
        primaryText: 'Robert Larsson'
      }
    ],
    timeString: ' 4 days ago'
  }
];