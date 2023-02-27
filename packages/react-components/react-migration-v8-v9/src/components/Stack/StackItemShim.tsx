import * as React from 'react';

import { IStackItemProps } from '@fluentui/react';
import { makeStyles, mergeClasses } from '@griffel/react';

const stackItemClassNames = {
  root: 'ms-StackItem',
};

const useStackItemShimStyles = makeStyles({
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

const useFlexAlignSelfStyles = makeStyles({
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

const useFlexGrowStyles = makeStyles({
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

const useFlexShrinkStyles = makeStyles({
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

const useFlexOrderStyles = makeStyles({
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

export const StackItemShim = (props: IStackItemProps) => {
  const { grow, shrink, disableShrink, align, verticalFill, order, className, children } = props;

  const styles = useStackItemShimStyles();
  const alignSelfStyles = useFlexAlignSelfStyles();
  const shrinkFlexStyles = useFlexShrinkStyles();
  const growFlexStyles: Record<string, string> = useFlexGrowStyles();
  const orderFlexStyles: Record<string, string> = useFlexOrderStyles();

  const stackItemStyles = [styles.root, align && alignSelfStyles[align], verticalFill && styles.verticalFill];

  if (order) {
    stackItemStyles.push(orderFlexStyles[order]);
  }

  if (grow) {
    const flexGrow = grow === true ? growFlexStyles[1] : growFlexStyles[grow];
    stackItemStyles.push(flexGrow);
  }

  if (shrink && !disableShrink) {
    stackItemStyles.push(shrinkFlexStyles[1]);
  } else if (disableShrink || (!grow && !shrink)) {
    stackItemStyles.push(shrinkFlexStyles[0]);
  }

  if (disableShrink) {
    stackItemStyles.push(styles.disableShrink);
  }

  const rootStyles = mergeClasses(stackItemClassNames.root, ...stackItemStyles, className);

  return <div className={rootStyles}>{children}</div>;
};
