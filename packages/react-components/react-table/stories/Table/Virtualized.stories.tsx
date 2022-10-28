import * as React from 'react';
import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  VideoRegular,
} from '@fluentui/react-icons';
import { Virtualizer } from '@fluentui/virtualizer'; // TODO: Add this to react-components export?
import { ReactNode } from 'react';

const repeatCount = 25;
const largeSize = 50;
const smallSize = 250;

const items = [
  {
    file: { label: 'Meeting notes', icon: <DocumentRegular /> },
    author: { label: 'Max Mustermann', status: 'available' },
    lastUpdated: { label: '7h ago', timestamp: 1 },
    lastUpdate: {
      label: 'You edited this',
      icon: <EditRegular />,
    },
  },
  {
    file: { label: 'Thursday presentation', icon: <FolderRegular /> },
    author: { label: 'Erika Mustermann', status: 'busy' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: 'Training recording', icon: <VideoRegular /> },
    author: { label: 'John Doe', status: 'away' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: 'Purchase order', icon: <DocumentPdfRegular /> },
    author: { label: 'Jane Doe', status: 'offline' },
    lastUpdated: { label: 'Tue at 9:30 AM', timestamp: 3 },
    lastUpdate: {
      label: 'You shared this in a Teams chat',
      icon: <PeopleRegular />,
    },
  },
];

const generateContent = () => {
  const contentList: ReactNode[] = [];
  for (let i = 0; i < repeatCount; i++) {
    items.forEach((item, index) => {
      const isEven = index % 2 === 0;
      contentList.push(
        <div
          style={{
            height: isEven ? largeSize : smallSize,
            backgroundColor: isEven ? 'black' : 'white',
            color: isEven ? 'white' : 'black',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
          }}
          key={`item-${i}-${index}`}
        >{`${item.file.label}-${item.author.label}-${i}`}</div>,
      );
    });
  }
  return contentList;
};

const getSizeOfChild = (target: ReactNode, index: number) => {
  return index % 2 === 0 ? largeSize : smallSize;
};

export const Virtualized = () => {
  return (
    <Virtualizer
      virtualizerLength={25}
      itemSize={50}
      sizeOfChild={getSizeOfChild}
      before={null}
      beforeContainer={null}
      after={null}
      afterContainer={null}
    >
      {generateContent()}
    </Virtualizer>
  );
};
