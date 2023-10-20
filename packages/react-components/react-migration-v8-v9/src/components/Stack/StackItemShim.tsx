import { mergeClasses } from '@griffel/react';
import * as React from 'react';
import type { IStackItemProps } from '@fluentui/react';

import {
  useFlexAlignSelfStyles,
  useFlexGrowStyles,
  useFlexOrderStyles,
  useFlexShrinkStyles,
  useStackItemShimStyles,
} from './StackItemShim.styles';

const stackItemClassNames = {
  root: 'ms-StackItem',
};

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
