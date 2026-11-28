'use client';

import * as React from 'react';
import { mergeCallbacks, slot, useIsomorphicLayoutEffect, useMergedRefs } from '@fluentui/react-utilities';
import type { ExtractSlotProps } from '@fluentui/react-utilities';
import { toDataAttributeValue } from '../../../utils/toDataAttributeValue';
import {
  CarouselRegisterTabContext,
  isControlDisabled,
  isControlHidden,
  useCarouselContext,
  useCarouselItemIndex,
} from '../carouselContext';
import type { CarouselNavButtonProps, CarouselNavButtonSlots, CarouselNavButtonState } from './CarouselNavButton.types';

/** Create the state required to render CarouselNavButton. Must be rendered inside `CarouselNav`. */
export const useCarouselNavButton = (
  props: CarouselNavButtonProps,
  ref: React.Ref<HTMLButtonElement>,
): CarouselNavButtonState => {
  const { idPrefix, activeIndex, pageCount, nav, getPageLabel, select, onNavKeyDown } = useCarouselContext();
  const index = useCarouselItemIndex();
  const registerTab = React.useContext(CarouselRegisterTabContext);
  const available = !isControlHidden(props) && !isControlDisabled(props);
  const autoFocusOnMount = React.useRef(props.autoFocus);
  // Register once the node is committed: the nav resolves `autoFocus` against it, before its own layout effect.
  const node = React.useRef<HTMLButtonElement | null>(null);
  const [committedNode, setCommittedNode] = React.useState<HTMLButtonElement | null>(null);
  const nodeRef = useMergedRefs(node, setCommittedNode);
  useIsomorphicLayoutEffect(() => {
    const target = node.current;
    return target && available ? registerTab?.(index, autoFocusOnMount.current ? target : undefined) : undefined;
  }, [registerTab, available, index, committedNode]);
  const mergedRef = useMergedRefs(ref, nodeRef);
  const { indicator, ...rest } = props;
  const selected = activeIndex === index;
  return {
    components: { root: 'button', indicator: 'span' },
    root: Object.assign(
      slot.always<ExtractSlotProps<CarouselNavButtonSlots['root']>>(
        {
          type: 'button',
          'aria-label': getPageLabel(index + 1, pageCount),
          ...rest,
          ref: mergedRef,
          id: `${idPrefix}-tab-${index + 1}`,
          role: 'tab',
          'aria-controls': `${idPrefix}-page-${index + 1}`,
          'aria-selected': selected,
          tabIndex: selected ? 0 : -1,
          onClick: mergeCallbacks(rest.onClick, (event: React.MouseEvent<HTMLButtonElement>) => {
            if (!event.defaultPrevented && nav && available) {
              select(index, event);
            }
          }),
          onKeyDown: mergeCallbacks(rest.onKeyDown, (event: React.KeyboardEvent<HTMLButtonElement>) => {
            if (!event.defaultPrevented && nav && available) {
              onNavKeyDown(event, index);
            }
          }),
        },
        { elementType: 'button' },
      ),
      { 'data-selected': toDataAttributeValue(selected) },
    ),
    indicator: slot.always(indicator, {
      elementType: 'span',
      defaultProps: { 'aria-hidden': true, 'data-carousel-indicator': '' } as React.HTMLAttributes<HTMLSpanElement>,
    }),
  };
};
