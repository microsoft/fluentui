import * as React from 'react';
import { addons } from '@storybook/addons';
import { NAVIGATE_URL } from '@storybook/core-events';
import { makeStyles, shorthands } from '../index';

const useTocStyles = makeStyles({
  root: {
    top: '64px',
    position: 'sticky',
    marginLeft: '40px',
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
  },
  selected: {
    position: 'relative',
    '&:after': {
      content: '""',
      position: 'absolute',
      left: '-20px',
      top: 0,
      bottom: 0,
      width: '3px',
      backgroundColor: '#436DCD',
      ...shorthands.borderRadius('4px'),
    },
  },
});

type TocItem = { name: string; id: string; selected?: boolean };

// // Alternative approach to navigate - rerenders the iframe
// // Usage: selectStory({ story: s.name, kind: s.kind });
// const selectStory = (story: { kind: string; story: string }) => {
//   console.log('Select Story', story);
//   addons.getChannel().emit(SELECT_STORY, story);
// };

const navigate = (url: string) => {
  addons.getChannel().emit(NAVIGATE_URL, url);
};

export const nameToHash = (id: string): string => id.toLowerCase().replace(/[^a-z0-9]/gi, '-');

export const Toc = ({ stories }: { stories: TocItem[] }) => {
  const [selected, setSelected] = React.useState('');

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        for (const entry of entries) {
          const { intersectionRatio, target } = entry;
          if (intersectionRatio > 0.5) {
            setSelected(target.id);
            return;
          }
        }
      },
      {
        threshold: [0.5],
      },
    );

    stories.forEach(link => {
      const element = document.getElementById(nameToHash(link.name));
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [stories]);

  const tocItems = stories.map(item => {
    return { ...item, selected: nameToHash(item.name) === selected };
  });
  const tocClasses = useTocStyles();
  return (
    <nav className={tocClasses.root}>
      <h3 className={tocClasses.heading}>On this page</h3>
      <ol className={tocClasses.ol}>
        {tocItems.map(s => {
          const name = nameToHash(s.name);
          return (
            <li className={s.selected ? tocClasses.selected : ''} key={s.id}>
              <a
                href={`#${name}`}
                target="_self"
                onClick={e => {
                  navigate(`#${name}`);
                  setSelected(name);
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
