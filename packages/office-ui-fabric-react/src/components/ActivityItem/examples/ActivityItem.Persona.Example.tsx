import * as React from 'react';
import { ActivityItem, IActivityItemProps, Link, mergeStyleSets } from 'office-ui-fabric-react';
import { TestImages } from '@uifabric/example-data';

const classNames = mergeStyleSets({
  exampleRoot: {
    marginTop: '20px'
  },
  nameText: {
    fontWeight: 'bold'
  }
});

export const ActivityItemPersonaExample: React.FunctionComponent = () => {
  // tslint:disable:jsx-no-lambda
  const activityItemExamples: (IActivityItemProps & { key: string | number })[] = [
    {
      key: 1,
      activityDescription: [
        <Link
          key={1}
          className={classNames.nameText}
          onClick={() => {
            alert('A name was clicked.');
          }}
        >
          Jack Howden
        </Link>,
        <span key={2}> renamed </span>,
        <span key={3} className={classNames.nameText}>
          DocumentTitle.docx
        </span>
      ],
      activityPersonas: [{ imageUrl: TestImages.personaMale }],
      comments: 'Hello, this is the text of my basic comment!',
      timeStamp: '23m ago'
    },
    {
      key: 2,
      activityDescription: [
        <Link
          key={1}
          className={classNames.nameText}
          onClick={() => {
            alert('A name was clicked.');
          }}
        >
          Javiera Márquez
        </Link>,
        <span key={2}> and </span>,
        <Link
          key={3}
          className={classNames.nameText}
          onClick={() => {
            alert('A name was clicked.');
          }}
        >
          Amelia Povalіy
        </Link>,
        <span key={4}> edited </span>,
        <Link
          key={5}
          className={classNames.nameText}
          onClick={() => {
            alert('A document was clicked.');
          }}
        >
          SpreadsheetTitle.xlsx
        </Link>
      ],
      activityPersonas: [{ imageInitials: 'JM', text: 'Javiera Márquez' }, { imageUrl: TestImages.personaFemale }],
      timeStamp: '9:27 am'
    },
    {
      key: 3,
      activityDescription: [
        <Link
          key={1}
          className={classNames.nameText}
          onClick={() => {
            alert('A name was clicked.');
          }}
        >
          Robert Larsson
        </Link>,
        <span key={2}> and </span>,
        <Link
          key={3}
          className={classNames.nameText}
          onClick={() => {
            alert('A name was clicked.');
          }}
        >
          2 others
        </Link>,
        <span key={4}> commented </span>
      ],
      activityPersonas: [
        { imageInitials: 'RL', text: 'Robert Larsson' },
        { imageUrl: TestImages.personaMale },
        { imageUrl: TestImages.personaFemale }
      ],
      timeStamp: '3 days ago'
    },
    {
      key: 4,
      activityDescription: [
        <Link
          key={1}
          className={classNames.nameText}
          onClick={() => {
            alert('A name was clicked.');
          }}
        >
          Jin Cheng
        </Link>,
        <span key={2}> and </span>,
        <Link
          key={3}
          className={classNames.nameText}
          onClick={() => {
            alert('A name was clicked.');
          }}
        >
          5 others
        </Link>,
        <span key={4}> edited this file</span>
      ],
      activityPersonas: [
        { imageInitials: 'JC', text: 'Jin Cheng' },
        { imageUrl: TestImages.personaMale },
        { imageInitials: 'AL', text: 'Annie Lindqvist' },
        { imageUrl: TestImages.personaFemale },
        { imageUrl: TestImages.personaMale },
        { imageUrl: TestImages.personaMale }
      ],
      timeStamp: 'August 3, 2017'
    }
  ];

  return (
    <div>
      {activityItemExamples.map((item: { key: string | number }) => (
        <ActivityItem {...item} key={item.key} className={classNames.exampleRoot} />
      ))}
    </div>
  );
};
