import { mergeClasses } from '@griffel/react';
import { classNamesFunction } from '@fluentui/react';
import type { IStackProps, IStackTokens, IStackItemProps } from '@fluentui/react';
import * as React from 'react';

import { getChildrenGapStyles } from './stackUtils';
import type { StackShimStyles } from './stackUtils';
import {
  useFlexAlignItemsStyles,
  useFlexGrowStyles,
  useFlexJustifyContentStyles,
  useStackStyles,
} from './StackShim.styles';

const stackClassNames = {
  root: 'ms-Stack',
  inner: 'ms-Stack-inner',
};

const getClassNames = classNamesFunction<IStackProps, StackShimStyles>();

export const StackShim = (props: IStackProps) => {
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

  let stackChildren = React.Children.toArray(props.children);
  if (
    stackChildren.length === 1 &&
    React.isValidElement(stackChildren[0]) &&
    stackChildren[0].type === React.Fragment
  ) {
    stackChildren = stackChildren[0].props.children;
  }

  stackChildren = React.Children.map(
    stackChildren as React.ReactElement[],
    (child: React.ReactElement<IStackItemProps>) => {
      if (!child) {
        return null;
      }

      if (child.type && ((child as React.ReactElement).type as React.ComponentType).name === 'StackItemShim') {
        const defaultItemProps: IStackItemProps = {
          shrink: !disableShrink,
        };

        return React.cloneElement(child, {
          ...defaultItemProps,
          ...child.props,
        });
      }

      return child;
    },
  );

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

  const rootClass = mergeClasses(
    stackClassNames.root,
    ...stackStyles,
    childrenGapClassName && !wrap && childrenGapClassName.root,
    className,
  );

  const innerClass = mergeClasses(
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
