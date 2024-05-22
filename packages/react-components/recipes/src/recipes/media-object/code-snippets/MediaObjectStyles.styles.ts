import { makeStyles, shorthands } from '@griffel/react';

export const useExampleStyles = makeStyles({
  multiExample: {
    display: 'flex',
    justifyContent: 'center',
    rowGap: '60px',
    columnGap: '60px',
  },
});

export const useSkeletonStyles = makeStyles({
  blue: {
    backgroundColor: '#4f5e8f',
  },
  purple: {
    backgroundColor: '#e1c7fc',
  },
  legendContainer: {
    display: 'flex',
    flexDirection: 'column-reverse',
    rowGap: '10px',
    columnGap: '10px',
    ...shorthands.padding('4px'),
  },
  legend: {
    display: 'flex',
    rowGap: '5px',
    columnGap: '5px',
  },
  legendColor: {
    alignSelf: 'center',
    width: '10px',
    height: '10px',
  },
});

export const useMediaObjectStyles = makeStyles({
  main: {
    display: 'flex',
    flexDirection: 'row',
    rowGap: '4px',
    columnGap: '4px',
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '4px',
    columnGap: '4px',
  },
  emptyMedia: {
    ...shorthands.padding('20px', '20px', '20px', '80px'),
  },
  emptyText: {
    width: '100px',
    height: '50px',
  },

  centerMedia: {
    alignItems: 'center',
  },

  verticalMediaObject: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '4px',
    columnGap: '4px',
    alignItems: 'center',
  },
  centerTextPosition: {
    alignItems: 'center',
  },
  beforeTextPosition: {
    alignItems: 'flex-end',
  },
});
