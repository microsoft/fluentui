import { IActivityItemProps, ActivityType } from '../ActivityItem.Props';
import { TestImages } from '../../../common/TestImages';

export const activityItemPersonaExamples: (IActivityItemProps & { key: string | number })[] = [
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
    activityType: ActivityType.Message,
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
      },
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
    timeString: '2 days ago'
  },
];

export const activityItemCommentExamples: (IActivityItemProps & { key: string | number })[] = [
  {
    key: 0,
    activityType: ActivityType.Message,
    people: [
      {
        primaryText: 'Robert Larsson'
      }
    ],
    commentString: 'This is a basic comment.',
    timeString: '3 days ago'
  },
  {
    key: 1,
    activityType: ActivityType.Message,
    people: [
      {
        primaryText: 'Robert Larsson'
      }
    ],
    commentString: 'This is a comment on a file.',
    fileActivity: {
      fileName: 'DocumentName.docx',
      fileHref: '#fileLink',
    },
    timeString: '3 days ago'
  },
  {
    key: 2,
    activityType: ActivityType.CommentInDocument,
    people: [
      {
        primaryText: 'Robert Larsson'
      }
    ],
    timeString: '3 days ago'
  },
  {
    key: 3,
    activityType: ActivityType.Mention,
    people: [
      {
        primaryText: 'Robert Larsson'
      }
    ],
    mentionedName: '@Your Name',
    mentionedHref: '#mentionedNameLink',
    commentString: 'This is an at mention message. @Your Name was mentioned in the middle of it.',
    timeString: '3 days ago'
  },
  {
    key: 4,
    activityType: ActivityType.Mention,
    people: [
      {
        primaryText: 'Robert Larsson'
      }
    ],
    mentionedName: '@Your Name',
    commentString: '@Your Name is mentioned at the start of this message.',
    timeString: '3 days ago'
  },
  {
    key: 5,
    activityType: ActivityType.Mention,
    people: [
      {
        primaryText: 'Robert Larsson'
      }
    ],
    mentionedName: '@Your Name',
    commentString: 'At the end of this message it mentions @Your Name',
    timeString: '3 days ago'
  }
]

export const activityItemIconExamples: (IActivityItemProps & { key: string | number })[] = [
  {
    key: 0,
    activityType: ActivityType.Edit,
    people: [
      {
        primaryText: 'Robert Larsson'
      }
    ],
    fileActivity: {
      fileName: 'DocumentName.docx',
      fileHref: '#fileLink'
    },
    timeString: '4 days ago'
  },
  {
    key: 1,
    activityType: ActivityType.Move,
    people: [
      {
        primaryText: 'Robert Larsson'
      }
    ],
    fileActivity: {
      fileName: 'DocumentName.docx',
      fileHref: '#fileLink',
      sourceFolderName: 'Source Folder Name',
      sourceFolderHref: '#sourceFolderLink',
      destinationFolderName: 'Destination Folder Name',
      destinationFolderHref: '#destinationFolderLink'
    },
    timeString: '4 days ago'
  },
  {
    key: 2,
    activityType: ActivityType.Rename,
    people: [
      {
        primaryText: 'Robert Larsson'
      }
    ],
    fileActivity: {
      newFileName: 'NewFileName.docx',
      newFileHref: '#NewDocLink',
      fileName: 'OldFileName.docx',
      fileHref: '#OldDocLink'
    },
    timeString: ' 4 days ago'
  },
  {
    key: 3,
    activityType: ActivityType.Share,
    people: [
      {
        primaryText: 'Robert Larsson'
      }
    ],
    sharedWithName: 'Annie Lindqvist',
    sharedWithHref: '#sharedWithThisUserLink',
    fileActivity: {
      fileName: 'SharedDocumentName.docx',
      fileHref: '#sharedDocLink'
    },
    timeString: '4 days ago'
  },
  {
    key: 4,
    activityType: ActivityType.Add,
    people: [
      {
        primaryText: 'Robert Larsson'
      }
    ],
    fileActivity: {
      fileName: 'AddedDocument.docx',
      fileHref: '#addedDocLink',
      sourceFolderName: 'Folder Name',
      sourceFolderHref: '#FolderLink'
    },
    timeString: '4 days ago'
  },
  {
    key: 5,
    activityType: ActivityType.Delete,
    people: [
      {
        primaryText: 'Robert Larsson'
      }
    ],
    fileActivity: {
      fileName: 'DeletedFile.docx',
      sourceFolderName: 'Source Folder',
      sourceFolderHref: '#sourceFolderLink',
    },
    timeString: '4 days ago'
  },
  {
    key: 6,
    activityType: ActivityType.Restore,
    people: [
      {
        primaryText: 'Robert Larsson'
      }
    ],
    fileActivity: {
      fileName: 'RestoredFile.docx',
      fileHref: '#restoredDocLink'
    },
    timeString: '4 days ago'
  },
  {
    key: 7,
    activityType: ActivityType.Version,
    people: [
      {
        primaryText: 'Robert Larsson'
      }
    ],
    timeString: '6/20/17 at 8:41pm'
  }
];