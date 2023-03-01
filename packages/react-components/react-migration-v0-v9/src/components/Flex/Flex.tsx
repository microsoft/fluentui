import { mergeClasses } from '@fluentui/react-components';
import * as React from 'react';

import { useFlexStyles } from './Flex.styles';

export interface FlexProps {
  /** Defines if container should be inline element. */
  inline?: boolean;

  /** Sets vertical flow direction. */
  column?: boolean;

  /** Allows overflow items to wrap on the next container's line. */
  wrap?: boolean;

  /** Controls items alignment in horizontal direction. */
  hAlign?: 'start' | 'center' | 'end' | 'stretch';

  /** Controls items alignment in vertical direction. */
  vAlign?: 'start' | 'center' | 'end' | 'stretch';

  /** Defines strategy for distributing remaining space between items. */
  space?: 'around' | 'between' | 'evenly';

  /** Defines gap between each two adjacent child items. */
  gap?: 'gap.smaller' | 'gap.small' | 'gap.medium' | 'gap.large';

  /** Defines container's padding. */
  padding?: 'padding.medium';

  /** Orders container to fill all parent's space available. */
  fill?: boolean;
}

export const flexClassName = 'fui-Flex';

export const Flex = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLElement> & FlexProps>((props, ref) => {
  const { children, column, fill, gap, hAlign, inline, padding, space, vAlign, wrap, className, ...rest } = props;
  const classes = useFlexStyles();

  const classMaps = React.useMemo(
    () => ({
      alignItems: {
        start: classes.alignItemsFlexStart,
        center: classes.alignItemsCenter,
        end: classes.alignItemsFlexEnd,
        stretch: classes.alignItemsCenter,
      },
      justifyContent: {
        start: classes.justifyContentFlexStart,
        center: classes.justifyContentCenter,
        end: classes.justifyContentFlexEnd,
        stretch: classes.justifyContentStretch,
      },
      justifyContentSpace: {
        around: classes.justifyContentSpaceAround,
        between: classes.justifyContentSpaceBetween,
        evenly: classes.justifyContentSpaceEvenly,
      },
      gapForColumnFlex: {
        'gap.smaller': classes.gapForColumnFlexSmaller,
        'gap.small': classes.gapForColumnFlexSmall,
        'gap.medium': classes.gapForColumnFlexMedium,
        'gap.large': classes.gapForColumnFlexLarge,
      },
      gapRow: {
        'gap.smaller': classes.gapForRowFlexSmaller,
        'gap.small': classes.gapForRowFlexSmall,
        'gap.medium': classes.gapForRowFlexMedium,
        'gap.large': classes.gapForRowFlexLarge,
      },
      paddings: {
        'padding.medium': classes.paddingMedium,
      },
    }),
    [classes],
  );

  const flexClasses = mergeClasses(
    flexClassName,
    classes.flex,
    inline && classes.inline,
    column && classes.column,
    hAlign && (column ? classMaps.alignItems[hAlign] : classMaps.justifyContent[hAlign]),
    vAlign && (column ? classMaps.justifyContent[vAlign] : classMaps.alignItems[vAlign]),
    space && classMaps.justifyContentSpace[space],
    wrap && classes.wrap,
    fill && classes.fill,
    gap && (column ? classMaps.gapForColumnFlex[gap] : classMaps.gapRow[gap]),
    padding && classMaps.paddings[padding],
    className,
  );

  const content = React.Children.map(children, child => {
    // @ts-expect-error __isFlexItem is added to the React type property by N*
    const isFlexItemElement: boolean = child?.type?.__isFlexItem;

    return isFlexItemElement
      ? React.cloneElement(child as React.ReactElement, {
          flexDirection: column ? 'column' : 'row',
        })
      : child;
  });

  return (
    <div ref={ref} className={flexClasses} {...rest}>
      {content}
    </div>
  );
});

Flex.displayName = 'Flex';
