import * as React from 'react';

import { IStackProps, IStackTokens, classNamesFunction, IStackItemProps } from '@fluentui/react';
import { makeStyles, mergeClasses } from '@griffel/react';
import { getChildrenGapStyles, IStackShimStyles } from './stackUtils';

const stackClassNames = {
  root: 'ms-Stack',
  inner: 'ms-Stack-inner',
};

const getClassNames = classNamesFunction<IStackProps, IStackShimStyles>();

const useStackStyles = makeStyles({
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

const useFlexAlignItemsStyles = makeStyles({
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

const useFlexJustifyContentStyles = makeStyles({
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
