import { makeStyles } from '@griffel/react';

export const useStackStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    width: 'auto',
    height: 'auto',
    boxSizing: 'border-box',
    '> *': {
      textOverflow: 'ellipsis',
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    '> *:not(.ms-StackItem)': {
      flexShrink: 1,
    },
  },
  horizontal: {
    flexDirection: 'row',
  },
  verticalFill: {
    height: '100%',
  },
  reversedVertical: {
    flexDirection: 'column-reverse',
  },
  reversedHorizontal: {
    flexDirection: 'row-reverse',
  },
  disableShrink: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    '> *:not(.ms-StackItem)': {
      flexShrink: 0,
    },
  },
  wrap: {
    display: 'flex',
    flexWrap: 'wrap',
    height: '100%',
  },
  inner: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    boxSizing: 'border-box',
    maxWidth: '100vw',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    '> *:not(.ms-StackItem)': {
      flexShrink: 1,
    },
  },
  innerWidth: {
    width: '100%',
  },
});

export const useFlexGrowStyles = makeStyles({
  inherit: {
    flexGrow: 'inherit',
  },
  initial: {
    flexGrow: 'initial',
  },
  revert: {
    flexGrow: 'revert',
  },
  unset: {
    flexGrow: 'unset',
  },
  '1': {
    flexGrow: 1,
  },
  '2': {
    flexGrow: 2,
  },
  '3': {
    flexGrow: 3,
  },
});

export const useFlexAlignItemsStyles = makeStyles({
  baseline: {
    alignItems: 'baseline',
  },
  center: {
    alignItems: 'center',
  },
  start: {
    alignItems: 'flex-start',
  },
  end: {
    alignItems: 'flex-end',
  },
  stretch: {
    alignItems: 'stretch',
  },
  'space-between': {
    alignItems: 'space-between',
  },

  'space-around': {
    alignItems: 'space-around',
  },
  'space-evenly': {
    alignItems: 'space-evenly',
  },
});

export const useFlexJustifyContentStyles = makeStyles({
  baseline: {
    justifyContent: 'baseline',
  },
  center: {
    justifyContent: 'center',
  },
  start: {
    justifyContent: 'flex-start',
  },
  end: {
    justifyContent: 'flex-end',
  },
  stretch: {
    justifyContent: 'stretch',
  },
  'space-between': {
    justifyContent: 'space-between',
  },

  'space-around': {
    justifyContent: 'space-around',
  },
  'space-evenly': {
    justifyContent: 'space-evenly',
  },
});
