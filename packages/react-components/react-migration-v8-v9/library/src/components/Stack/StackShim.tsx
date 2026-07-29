'use client';

import { clsx } from 'clsx';
import { classNamesFunction } from '@fluentui/react';
import type { IStackProps, IStackTokens, IStackItemProps } from '@fluentui/react';
import * as React from 'react';

import { getChildrenGapStyles } from './stackUtils';
import type { StackShimStyles } from './stackUtils';
import type { JSXElement } from '@fluentui/react-utilities';
import {
  useFlexAlignItemsStyles,
  useFlexGrowStyles,
  useFlexJustifyContentStyles,
  useStackStyles,
} from './StackShim.styles';

/**
 * v8 interop classes, deliberately RETAINED. These are `ms-*`, not `fui`-prefixed BEM statics, so
 * DECISIONS.md D16.1's removal sweep does not cover them — and hybrid v8/v9 apps select on
 * them. `ms-Stack` also keeps a selector-safe token at index 0 of the emitted class string,
 * which is what lets the named-group marker sit second (D15.1 / D16.2).
 */
const stackClassNames = {
  root: 'ms-Stack',
  inner: 'ms-Stack-inner',
};

/**
 * Named group marker (DECISIONS.md D15.1) — literal, unhashed, GLOBAL, and the only handle by
 * which another module can style an element from this shim's subtree, since every
 * `StackShim.module.css` local is hashed. It rides the outermost element only; the `inner`
 * element gets none (one marker per component).
 *
 * The `/` is legal in a class TOKEN but terminates the name in a SELECTOR — use
 * `fuiSelector()` from `@fluentui/react-utilities` at any selector site (D16.5).
 */
const STACK_SHIM_GROUP_MARKER = 'group/fui-stack-shim';

const getClassNames = classNamesFunction<IStackProps, StackShimStyles>();
export const StackShim = (props: IStackProps): JSXElement => {
  const styles = useStackStyles();
  const alignItemsFlexStyles = useFlexAlignItemsStyles();
  const justifyContentFlexStyles = useFlexJustifyContentStyles();
  const growFlexStyles: Record<string, string> = useFlexGrowStyles();

  const {
    as: RootType = 'div',
    verticalFill,
    horizontal,
    reversed,
    grow,
    wrap,
    horizontalAlign,
    verticalAlign,
    disableShrink,
    className,
  } = props;

  const tokens: IStackTokens = { ...props.tokens };

  let tokensRootStyles = {};
  let tokensInnerStyles = {};
  let childrenGapClassName;

  if (tokens) {
    tokensRootStyles = {
      padding: !wrap ? tokens.padding : undefined,
      maxHeight: tokens.maxHeight,
      maxWidth: tokens.maxWidth,
    };

    tokensInnerStyles = {
      padding: wrap ? tokens.padding : undefined,
    };

    if (tokens.childrenGap) {
      childrenGapClassName = getClassNames(getChildrenGapStyles, {
        horizontal,
        reversed,
        tokens,
      });
    }
  }

  const stackStyles = [
    wrap ? styles.wrap : styles.root,
    horizontal && styles.horizontal,
    verticalFill && styles.verticalFill,
  ];

  const stackInnerStyles = [
    styles.inner,
    horizontal && styles.horizontal,
    (!tokens || !tokens.childrenGap) && styles.innerWidth,
  ];

  type StackChildren = Exclude<React.ReactNode, boolean | string | number | bigint | null | undefined>;

  let stackChildren = React.Children.toArray(props.children) as StackChildren[];
  if (
    stackChildren.length === 1 &&
    React.isValidElement(stackChildren[0]) &&
    stackChildren[0].type === React.Fragment
  ) {
    stackChildren = (stackChildren[0].props as React.FragmentProps).children as StackChildren[];
  }

  stackChildren = React.Children.map(stackChildren, child => {
    if (!child) {
      return null;
    }

    const _child = child as React.ReactElement<{}, React.ComponentType>;

    if (_child.type && _child.type.name === 'StackItemShim') {
      const defaultItemProps: IStackItemProps = {
        shrink: !disableShrink,
      };

      return React.cloneElement(_child, {
        ...defaultItemProps,
        ..._child.props,
      });
    }

    return child;
  });

  if (reversed) {
    if (horizontal) {
      stackStyles.push(styles.reversedHorizontal);
      stackInnerStyles.push(styles.reversedHorizontal);
    } else {
      stackStyles.push(styles.reversedVertical);
      stackInnerStyles.push(styles.reversedVertical);
    }
  }

  if (grow) {
    const flexGrow = grow === true ? growFlexStyles[1] : growFlexStyles[grow];
    stackStyles.push(flexGrow);
  }

  if (disableShrink) {
    stackStyles.push(styles.disableShrink);
  }

  if (horizontalAlign) {
    if (horizontal) {
      stackStyles.push(justifyContentFlexStyles[horizontalAlign]);
      stackInnerStyles.push(justifyContentFlexStyles[horizontalAlign]);
    } else {
      stackStyles.push(alignItemsFlexStyles[horizontalAlign]);
      stackInnerStyles.push(alignItemsFlexStyles[horizontalAlign]);
    }
  }

  if (verticalAlign) {
    if (horizontal) {
      stackStyles.push(alignItemsFlexStyles[verticalAlign]);
      stackInnerStyles.push(alignItemsFlexStyles[verticalAlign]);
    } else {
      stackStyles.push(justifyContentFlexStyles[verticalAlign]);
      stackInnerStyles.push(justifyContentFlexStyles[verticalAlign]);
    }
  }

  // Static class FIRST (selector-safe, unconditional), named group marker SECOND — the marker
  // must never be `classList[0]` or nwsapi's jsdom `:scope` polyfill throws on the `/`
  // (DECISIONS.md D15.1). Argument order carries no cascade meaning here: the `@layer fui.*`
  // order in StackShim.module.css decides every tie between this shim's own rules, and the two
  // trailing arguments — the consumer's `className` and v8's `childrenGap` merge-styles class —
  // are unlayered and therefore beat all of them regardless of position (D2, D7-revision).
  const rootClass = clsx(
    stackClassNames.root,
    STACK_SHIM_GROUP_MARKER,
    ...stackStyles,
    childrenGapClassName && !wrap && childrenGapClassName.root,
    className,
  );

  const innerClass = clsx(
    stackClassNames.inner,
    ...stackInnerStyles,
    childrenGapClassName && wrap && childrenGapClassName.inner,
  );

  return wrap ? (
    <RootType className={rootClass} style={tokensRootStyles}>
      <div className={innerClass} style={tokensInnerStyles}>
        {stackChildren}
      </div>
    </RootType>
  ) : (
    <RootType className={rootClass} style={tokensRootStyles}>
      {stackChildren}
    </RootType>
  );
};
