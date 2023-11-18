import { makeStaticStyles, makeStyles } from '@fluentui/react-components';

export const useStaticStyles = makeStaticStyles({
  '#docs-root .sbdocs-content > div:last-child': {
    marginBottom: '0px',
  },
});

export const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: '250px auto',
    gridTemplateRows: '40px auto',
    minHeight: '100vh',
  },
  nav: {
    gridColumnStart: 1,
    gridColumnEnd: 3,
  },
  sidebar: {
    gridRowStart: 2,
    gridRowEnd: 3,
    gridColumnStart: 1,
    gridColumnEnd: 2,
  },
  content: {
    gridRowStart: 2,
    gridRowEnd: 3,
    gridColumnStart: 2,
    gridColumnEnd: 3,
  },
});
