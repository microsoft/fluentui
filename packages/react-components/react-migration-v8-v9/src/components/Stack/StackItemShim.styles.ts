import { makeStyles } from '@griffel/react';

export const useStackItemShimStyles = makeStyles({
  root: {
    height: 'auto',
    width: 'auto',
  },
  disableShrink: {
    flexShrink: 0,
  },
  verticalFill: {
    height: '100%',
  },
});

export const useFlexAlignSelfStyles = makeStyles({
  auto: {
    alignSelf: 'auto',
  },
  baseline: {
    alignSelf: 'baseline',
  },
  center: {
    alignSelf: 'center',
  },
  start: {
    alignSelf: 'flex-start',
  },
  end: {
    alignSelf: 'flex-end',
  },
  stretch: {
    alignSelf: 'stretch',
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

export const useFlexShrinkStyles = makeStyles({
  inherit: {
    flexShrink: 'inherit',
  },
  initial: {
    flexShrink: 'initial',
  },
  revert: {
    flexShrink: 'revert',
  },
  unset: {
    flexShrink: 'unset',
  },
  0: {
    flexShrink: 0,
  },
  1: {
    flexShrink: 1,
  },
  2: {
    flexShrink: 2,
  },
});

export const useFlexOrderStyles = makeStyles({
  inherit: {
    order: 'inherit',
  },
  initial: {
    order: 'initial',
  },
  unset: {
    order: 'unset',
  },
  revert: {
    order: 'revert',
  },
  '-3': {
    order: -3,
  },
  '-2': {
    order: -2,
  },
  '-1': {
    order: -1,
  },
  '0': {
    order: 0,
  },
  '1': {
    order: 1,
  },
  '2': {
    order: 2,
  },
  '3': {
    order: 3,
  },
});
