'use client';

import * as React from 'react';
import {
  useArrowNavigationGroup,
  useFocusableGroup,
  useMergedTabsterAttributes_unstable,
} from '@fluentui/react-tabster';

type Anchor<Item, Target> = { item: Item; target: Target };
type InteractionOptions = Pick<React.ComponentPropsWithoutRef<'div'>, 'onBlur' | 'onMouseLeave'> & {
  selectedLegends?: string[];
  onLegendChange?: (keys: string[]) => void;
};
type ChartInteraction<Item, Target extends SVGElement> = {
  active: Anchor<Item, Target> | undefined;
  navigationAttributes: ReturnType<typeof useMergedTabsterAttributes_unstable>;
  rootProps: Pick<React.ComponentPropsWithoutRef<'div'>, 'onBlur' | 'onMouseLeave'>;
  focus: (event: React.FocusEvent<Target>, item: Item) => void;
  hover: (event: React.MouseEvent<Target>, item: Item) => void;
  leave: (item: Item) => void;
  onKeyDown: React.KeyboardEventHandler<Target>;
  selected: string[];
  onLegendChange: NonNullable<InteractionOptions['onLegendChange']>;
};

/** Event-owned anchors only; geometry, row semantics and mark rendering belong to each renderer. */
export function useVegaLiteChartInteraction<Item, Target extends SVGElement>(
  items: Item[],
  { onBlur, onMouseLeave, selectedLegends, onLegendChange }: InteractionOptions,
): ChartInteraction<Item, Target> {
  const groupAttributes = useFocusableGroup();
  const arrowAttributes = useArrowNavigationGroup({
    axis: 'both',
    circular: true,
    // Chart Escape dismisses its callout without Tabster refocusing the first mark and reopening it.
    ignoreDefaultKeydown: { Escape: true },
  });
  const navigationAttributes = useMergedTabsterAttributes_unstable(groupAttributes, arrowAttributes);
  const [hovered, setHovered] = React.useState<Anchor<Item, Target>>();
  const [focused, setFocused] = React.useState<Anchor<Item, Target>>();
  const [previousItems, setPreviousItems] = React.useState(items);
  const [localSelection, setLocalSelection] = React.useState<string[]>([]);
  const candidate = hovered ?? focused;
  const active =
    candidate && candidate.target.ownerSVGElement && items.includes(candidate.item) ? candidate : undefined;

  // Reconcile changed geometry before children commit, without an effect/cascading commit.
  if (previousItems !== items) {
    setPreviousItems(items);
    setHovered(previous => (previous && items.includes(previous.item) ? previous : undefined));
    setFocused(previous => (previous && items.includes(previous.item) ? previous : undefined));
  }

  const capture = (event: React.SyntheticEvent<Target>, item: Item): Anchor<Item, Target> | undefined =>
    event.currentTarget.ownerSVGElement ? { item, target: event.currentTarget } : undefined;
  const focus = (event: React.FocusEvent<Target>, item: Item) => {
    setHovered(undefined);
    setFocused(capture(event, item));
  };
  const hover = (event: React.MouseEvent<Target>, item: Item) => setHovered(capture(event, item));
  const leave = (item: Item) => setHovered(previous => (previous?.item === item ? undefined : previous));
  const onKeyDown: React.KeyboardEventHandler<Target> = event => {
    if (event.key === 'Escape') {
      setHovered(undefined);
      setFocused(undefined);
    } else if (event.key.startsWith('Arrow') || event.key === 'Home' || event.key === 'End' || event.key === 'Tab') {
      setHovered(undefined);
    }
    // Tabster owns circular arrows/Home/End and non-trapping Tab/Shift+Tab. Never move focus here.
  };
  const rootProps: Pick<React.ComponentPropsWithoutRef<'div'>, 'onBlur' | 'onMouseLeave'> = {
    onBlur: event => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
        setHovered(undefined);
        setFocused(undefined);
      }
      onBlur?.(event);
    },
    onMouseLeave: event => {
      setHovered(undefined);
      onMouseLeave?.(event);
    },
  };
  const handleLegendChange = React.useCallback(
    (keys: string[]) => {
      setLocalSelection(keys);
      onLegendChange?.(keys);
    },
    [onLegendChange],
  );

  return {
    active,
    navigationAttributes,
    rootProps,
    focus,
    hover,
    leave,
    onKeyDown,
    selected: selectedLegends ?? localSelection,
    onLegendChange: handleLegendChange,
  };
}
