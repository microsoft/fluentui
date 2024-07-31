import { makeStyles } from '@fluentui/react-components';

export const useGridStyles = makeStyles({
  grid: {
    display: 'grid',
    justifyContent: 'space-evenly',
  },
  onlyRows: {
    gridAutoFlow: 'column',
  },
  rows1: {
    gridTemplateRows: 'repeat(1, 1fr)',
  },
  rows2: {
    gridTemplateRows: 'repeat(2, 1fr)',
  },
  rows3: {
    gridTemplateRows: 'repeat(3, 1fr)',
  },
  columns1: {
    gridTemplateColumns: 'repeat(1, 1fr)',
  },
  columns2: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  columns3: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  columnsDefault: {
    gridTemplateColumns: 'repeat(5, 1fr)',
  },
});
