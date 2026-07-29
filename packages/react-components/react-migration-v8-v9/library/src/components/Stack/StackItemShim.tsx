'use client';

import { clsx } from 'clsx';
import * as React from 'react';
import type { IStackItemProps } from '@fluentui/react';

import type { JSXElement } from '@fluentui/react-utilities';
import {
  useFlexAlignSelfStyles,
  useFlexGrowStyles,
  useFlexOrderStyles,
  useFlexShrinkStyles,
  useStackItemShimStyles,
} from './StackItemShim.styles';

/**
 * v8 interop class, deliberately RETAINED — and load-bearing beyond interop.
 *
 * `StackShim.module.css`'s three unlayered `> *:not(:global(.ms-StackItem))` rules exclude
 * exactly this literal, so deleting it silently strips `flex-shrink` from every StackItemShim
 * inside a StackShim, with no error and no VR signal (there are no baselines for this package).
 * It is `ms-*`, not a `fui`-prefixed BEM static, so DECISIONS.md D16.1's removal sweep does not cover
 * it; recorded as RETAINED in the D16 inventory and in
 * migration/griffel-to-tailwind/reports/s4-v8-layering-decision.md §2.2.
 *
 * It also keeps a selector-safe token at index 0 of the emitted class string, which is what
 * lets the named-group marker sit second (D15.1 / D16.2).
 */
const stackItemClassNames = {
  root: 'ms-StackItem',
};

/**
 * Named group marker (DECISIONS.md D15.1) — literal, unhashed, GLOBAL. Use `fuiSelector()`
 * from `@fluentui/react-utilities` at any selector site: the `/` is legal in a class TOKEN but
 * terminates the name in a SELECTOR (D16.5).
 */
const STACK_ITEM_SHIM_GROUP_MARKER = 'group/fui-stack-item-shim';
export const StackItemShim = (props: IStackItemProps): JSXElement => {
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

  // Static class FIRST, named group marker SECOND (DECISIONS.md D15.1 / D16.2); the consumer's
  // `className` stays last. Argument order carries no cascade meaning — the `@layer fui.*` order
  // in StackItemShim.module.css decides every tie between this shim's own rules, and the
  // consumer's class is unlayered and beats all of them regardless of position.
  const rootStyles = clsx(stackItemClassNames.root, STACK_ITEM_SHIM_GROUP_MARKER, ...stackItemStyles, className);

  return <div className={rootStyles}>{children}</div>;
};
