import * as React from 'react';
import { PublishedStoreItem } from '@storybook/client-api';
import { addons } from '@storybook/addons';
import { NAVIGATE_URL } from '@storybook/core-events';
import { makeStyles, shorthands } from '../index';

const useTocStyles = makeStyles({
  root: {
    top: '64px',
    position: 'sticky',
    marginLeft: '80px',
  },
  heading: {
    fontSize: '11px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: '20px',
  },
  ol: {
    position: 'relative',
    listStyleType: 'none',
    marginLeft: 0,
    marginTop: 0,
    paddingInlineStart: '20px',
    '& li': {
      marginBottom: '15px',
      lineHeight: '16px',
    },
    '& a': {
      textDecorationLine: 'none',
      color: '#201F1E',
      fontSize: '14px',
      ':hover': {
        color: '#201F1E',
      },
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      left: 0,
      height: '100%',
      width: '3px',
      backgroundColor: '#EDEBE9',
      ...shorthands.borderRadius('4px'),
    },
    '&:after': {
      content: '""',
      position: 'absolute',
      left: 0,
      height: '16px',
      top: 0,
      width: '3px',
      backgroundColor: '#436DCD',
      ...shorthands.borderRadius('4px'),
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

export const nameToHash = (id: string): string => id.toLowerCase().replace(/[^a-z0-9]/gi, '-');

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
                href={`#${nameToHash(s.name)}`}
                target="_self"
                onClick={e => {
                  navigate(`#${nameToHash(s.name)}`);
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
