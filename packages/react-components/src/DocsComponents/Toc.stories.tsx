import * as React from 'react';
import { PublishedStoreItem } from '@storybook/client-api';
import { addons } from '@storybook/addons';
import { NAVIGATE_URL } from '@storybook/core-events';
import { makeStyles } from '../index';

const useTocStyles = makeStyles({
  root: {
    top: '64px',
    position: 'sticky',
  },
  heading: {
    fontSize: '16px',
  },
  ol: {
    listStyleType: 'none',
    marginLeft: 0,
    paddingInlineStart: '8px',

    '& a': {
      textDecoration: 'none',
      color: '#0078d4',
      fontSize: '14px',
      lineHeight: '24px',
      ':hover': {
        color: '#106EBE',
      },
    },
  },
});

// // Alternative approach to navigate - rerenders the iframe
// // Usage: selectStory({ story: s.name, kind: s.kind });
// const selectStory = (story: { kind: string; story: string }) => {
//   console.log('Select Story', story);
//   addons.getChannel().emit(SELECT_STORY, story);
// };

const navigate = (url: string) => {
  console.log('Navigate', url);
  addons.getChannel().emit(NAVIGATE_URL, url);
};

export const idToHash = (id: string): string => id.split('--')[1];

export const Toc = ({ stories }: { stories: PublishedStoreItem[] }) => {
  const tocClasses = useTocStyles();
  return (
    <nav className={tocClasses.root}>
      <h3 className={tocClasses.heading}>On this page</h3>
      <ol className={tocClasses.ol}>
        {stories.map(s => {
          return (
            <li key={s.id}>
              <a
                href={`#${idToHash(s.id)}`}
                target="_self"
                onClick={e => {
                  navigate(`#${idToHash(s.id)}`);
                }}
              >
                {s.name}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
