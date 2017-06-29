import { IActivityItemProps, ActivityType } from '../ActivityItem.Props';
import { TestImages } from '../../../common/TestImages';

export const activityItemPersonaExamples: (IActivityItemProps & { key: string | number })[] = [
  {
    key: 1,
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
    key: 2,
    activityType: ActivityType.CommentInDocument,
    people: [
      {
        imageUrl: TestImages.personaFemale,
        primaryText: 'Annie Lindqvist'
      },
      {
        imageUrl: TestImages.personaMale,
        primaryText: 'Robert Larsson'
      }
    ],
    timeString: '1 hour ago'
  },
  {
    key: 3,
    activityType: ActivityType.Mention,
    people: [
      {
        primaryText: 'Annie Lindqvist',
        imageInitials: 'AL'
      },
      {
        primaryText: 'Robert Larsson',
        imageInitials: 'RL'
      },
      {
        primaryText: 'Rosie Costa',
        imageInitials: 'RC'
      }
    ],
    timeString: '8:37am'
  },
  {
    key: 4,
    activityType: ActivityType.Edit,
    people: [
      {
        imageUrl: TestImages.personaFemale,
        primaryText: 'Annie Lindqvist'
      },
      {
        imageUrl: TestImages.personaMale,
        primaryText: 'Robert Larsson'
      },
      {
        imageUrl: TestImages.personaMale,
        primaryText: 'Aaron Reid'
      },
      {
        imageUrl: TestImages.personaFemale,
        primaryText: 'Rosie Costa'
      }
    ],
    fileActivity: {
      fileName: 'DocumentName.docx',
      onFileClick: (ev: React.MouseEvent<HTMLElement>, props: IActivityItemProps) => alert('You clicked on the edited document.')
    },
    timeString: 'Yesterday'
  },
  {
    key: 5,
    activityType: ActivityType.Message,
    people: [
      {
        imageUrl: TestImages.personaFemale,
        primaryText: 'Annie Lindqvist'
      },
      {
        imageUrl: TestImages.personaMale,
        primaryText: 'Robert Larsson'
      },
      {
        imageUrl: TestImages.personaMale,
        primaryText: 'Aaron Reid'
      },
      {
        imageUrl: TestImages.personaFemale,
        primaryText: 'Rosie Costa'
      },
      {
        imageUrl: TestImages.personaFemale,
        primaryText: 'Annie Lindqvist'
      },
      {
        imageUrl: TestImages.personaMale,
        primaryText: 'Robert Larsson'
      },
      {
        imageUrl: TestImages.personaMale,
        primaryText: 'Aaron Reid'
      },
      {
        imageUrl: TestImages.personaFemale,
        primaryText: 'Rosie Costa'
      }
    ],
    timeString: '2 days ago'
  },
  {
    key: 6,
    activityType: ActivityType.Message,
    people: [
      {
        primaryText: 'Rosie Costa',
        imageInitials: 'RC'
      }
    ],
    commentString: 'Persona with initials instead of an image.',
    timeString: '3 days ago'
  }
];

export const activityItemCommentExamples: (IActivityItemProps & { key: string | number })[] = [
  {
    key: 1,
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
    key: 2,
    activityType: ActivityType.Message,
    people: [
      {
        primaryText: 'Robert Larsson'
      }
    ],
    commentString: 'This is a comment on a file.',
    fileActivity: {
      fileName: 'DocumentName.docx',
      onFileClick: (ev: React.MouseEvent<HTMLElement>, props: IActivityItemProps) => alert('You clicked on a file name.'),
    },
    timeString: '3 days ago'
  },
  {
    key: 3,
    activityType: ActivityType.CommentInDocument,
    people: [
      {
        primaryText: 'Robert Larsson'
      }
    ],
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
    onMentionedClick: (ev: React.MouseEvent<HTMLElement>, props: IActivityItemProps) => alert('You clicked an @mention name'),
    commentString: 'This is an at mention message. @Your Name was mentioned in the middle of it.',
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
    commentString: '@Your Name is mentioned at the start of this message.',
    timeString: '3 days ago'
  },
  {
    key: 6,
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
    key: 1,
    activityType: ActivityType.Edit,
    people: [
      {
        primaryText: 'Robert Larsson'
      }
    ],
    fileActivity: {
      fileName: 'DocumentName.docx',
      onFileClick: (ev: React.MouseEvent<HTMLElement>, props: IActivityItemProps) => alert('You clicked on the edited document.')
    },
    timeString: '4 days ago'
  },
  {
    key: 2,
    activityType: ActivityType.Move,
    people: [
      {
        primaryText: 'Robert Larsson'
      }
    ],
    fileActivity: {
      fileName: 'DocumentName.docx',
      onFileClick: (ev: React.MouseEvent<HTMLElement>, props: IActivityItemProps) => alert('You clicked on the moved file.'),
      sourceFolderName: 'Source Folder Name',
      onSourceFolderClick: (ev: React.MouseEvent<HTMLElement>, props: IActivityItemProps) => alert('You clicked on the source folder.'),
      destinationFolderName: 'Destination Folder Name',
      onDestinationFolderClick: (ev: React.MouseEvent<HTMLElement>, props: IActivityItemProps) => alert('You clicked on the destination folder.')
    },
    timeString: '4 days ago'
  },
  {
    key: 3,
    activityType: ActivityType.Rename,
    people: [
      {
        primaryText: 'Robert Larsson'
      }
    ],
    fileActivity: {
      newFileName: 'NewFileName.docx',
      onNewFileClick: (ev: React.MouseEvent<HTMLElement>, props: IActivityItemProps) => alert('You clicked on the new file name.'),
      fileName: 'OldFileName.docx',
      onFileClick: (ev: React.MouseEvent<HTMLElement>, props: IActivityItemProps) => alert('You clicked on the old file name.'),
    },
    timeString: ' 4 days ago'
  },
  {
    key: 4,
    activityType: ActivityType.Share,
    people: [
      {
        primaryText: 'Robert Larsson'
      }
    ],
    sharedWithName: 'Annie Lindqvist',
    onSharedWithClick: (ev: React.MouseEvent<HTMLElement>, props: IActivityItemProps) => alert('You clicked on the person this was shared with.'),
    fileActivity: {
      fileName: 'SharedDocumentName.docx',
      onFileClick: (ev: React.MouseEvent<HTMLElement>, props: IActivityItemProps) => alert('You clicked on the shared file.'),
    },
    timeString: '4 days ago'
  },
  {
    key: 5,
    activityType: ActivityType.Add,
    people: [
      {
        primaryText: 'Robert Larsson'
      }
    ],
    fileActivity: {
      fileName: 'AddedDocument.docx',
      onFileClick: (ev: React.MouseEvent<HTMLElement>, props: IActivityItemProps) => alert('You clicked on the new file.'),
      sourceFolderName: 'Folder Name',
      onSourceFolderClick: (ev: React.MouseEvent<HTMLElement>, props: IActivityItemProps) => alert('You clicked on the folder the file was added to.')
    },
    timeString: '4 days ago'
  },
  {
    key: 6,
    activityType: ActivityType.Delete,
    people: [
      {
        primaryText: 'Robert Larsson'
      }
    ],
    fileActivity: {
      fileName: 'DeletedFile.docx',
      sourceFolderName: 'Source Folder',
      onSourceFolderClick: (ev: React.MouseEvent<HTMLElement>, props: IActivityItemProps) => alert('You clicked on the folder of the deleted file.')
    },
    timeString: '4 days ago'
  },
  {
    key: 7,
    activityType: ActivityType.Restore,
    people: [
      {
        primaryText: 'Robert Larsson'
      }
    ],
    fileActivity: {
      fileName: 'RestoredFile.docx',
      onFileClick: (ev: React.MouseEvent<HTMLElement>, props: IActivityItemProps) => alert('You clicked on the restored file.'),
    },
    timeString: '4 days ago'
  },
  {
    key: 8,
    activityType: ActivityType.Version,
    people: [
      {
        primaryText: 'Robert Larsson'
      }
    ],
    timeString: '6/20/17 at 8:41pm'
  }
];