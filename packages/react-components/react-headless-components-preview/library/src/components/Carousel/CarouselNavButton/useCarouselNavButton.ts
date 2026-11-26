'use client';

import * as React from 'react';
import { getIntrinsicElementProps, mergeCallbacks, slot, useMergedRefs } from '@fluentui/react-utilities';
import { toDataAttributeValue } from '../../../utils/toDataAttributeValue';
import {
  CarouselRegisterTabContext,
  isControlDisabled,
  isControlHidden,
  useCarouselContext,
  useCarouselItemIndex,
} from '../carouselContext';
import { useFieldsetRegistration } from '../useFieldsetRegistration';
import type { CarouselNavButtonProps, CarouselNavButtonState } from './CarouselNavButton.types';

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
  const register = React.useCallback(
    (enabled: boolean, node: HTMLButtonElement) =>
      available && enabled ? registerTab?.(index, autoFocusOnMount.current ? node : undefined) : undefined,
    [registerTab, available, index],
  );
  const mergedRef = useMergedRefs(ref, useFieldsetRegistration(register));
  const { indicator, ...rest } = props;
  const selected = activeIndex === index;
  return {
    components: { root: 'button', indicator: 'span' },
    root: Object.assign(
      slot.always(
        getIntrinsicElementProps<CarouselNavButtonProps>('button', {
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
        }),
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
