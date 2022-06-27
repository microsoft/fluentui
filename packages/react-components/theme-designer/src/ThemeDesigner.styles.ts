import { makeStyles } from '@griffel/react';
export const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: '250px auto',
    gridTemplateRows: '40px auto',
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
