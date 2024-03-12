import { makeStyles } from '@griffel/react';

export const useColorBlockStyles = makeStyles({
  root: {
    borderTop: `1px solid #aaa`,
    borderBottom: `1px solid #aaa`,
    borderLeft: `1px solid transparent`,
    borderRight: `1px solid #aaa`,
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gridTemplateRows: 'auto',
    columnGap: '10px',
    padding: `0 5px 0 0`,
  },
  flipAlign: {
    borderLeft: `1px solid #aaa`,
    borderRight: `1px solid transparent`,
    gridTemplateColumns: '1fr auto',
    padding: `0 0 0 5px`,
  },
  color: {
    backgroundColor: 'var(--ColorBlock__background-color)',
    borderLeft: `1px solid #aaa`,
    borderRight: `1px solid #aaa`,
    width: '20px',
    alignSelf: 'stretch',
  },
  names: {
    alignSelf: 'flex-start',
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gridTemplateRows: 'auto',
    columnGap: '5px',
    justifySelf: 'flex-start',
    '& label': {
      textAlign: 'right',
      color: '#aaa',
      margin: 0,
      padding: 0,
    },
  },
  blockName: {
    fontWeight: '700',
  },
  colorName: {},
  colorValue: {},
  comment: {
    color: 'green',
    maxWidth: '250px',
  },
});
