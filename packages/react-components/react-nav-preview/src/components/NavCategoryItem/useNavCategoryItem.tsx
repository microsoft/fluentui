import * as React from 'react';
import { getIntrinsicElementProps, mergeCallbacks, slot, useEventCallback } from '@fluentui/react-utilities';
import { ChevronRightRegular } from '@fluentui/react-icons';
import { NavCategoryItemProps, NavCategoryItemState } from './NavCategoryItem.types';
import { useNavCategoryContext_unstable } from '../NavCategoryContext';
import { useNavContext_unstable } from '../NavContext';

/**
 * Create the state required to render NavCategoryItem.
 *
 * The returned state can be modified with hooks such as useNavCategoryItemStyles,
 * before being passed to renderNavCategoryItem.
 *
 * @param props - props from this instance of NavCategoryItem
 * @param ref - reference to root HTMLButtonElement of NavCategoryItem
 */
export const useNavCategoryItem_unstable = (
  props: NavCategoryItemProps,
  ref: React.Ref<HTMLButtonElement>,
): NavCategoryItemState => {
  const { onClick, expandIcon } = props;

  const { open, value } = useNavCategoryContext_unstable();

  const { onRequestNavCategoryItemToggle } = useNavContext_unstable();

  const onNavCategoryItemClick = useEventCallback(
    mergeCallbacks(onClick, event => onRequestNavCategoryItemToggle(event, { type: 'click', event, value })),
  );

  const expandIconRotation = open ? -90 : 90;

  // TODO - these are copied from AccordionHeader.
  // We need to figure out if they are applicable to this
  // scenario and adapt them accordingly.

  // const buttonSlot = slot.always(button, {
  //   elementType: 'button',
  //   defaultProps: {
  //     // we may decide to light these up later
  //     // disabled,
  //     // disabledFocusable,
  //     'aria-expanded': open,
  //     type: 'button',
  //     onClick: onNavCategoryItemClick,
  //   },
  // });

  // buttonSlot.onClick = useEventCallback(event => {
  //   if (isResolvedShorthand(button)) {
  //     button.onClick?.(event);
  //   }
  //   if (!event.defaultPrevented) {
  //     onRequestNavCategoryItemToggle(event, { value, event }); //({ value, event });
  //   }
  // });

  return {
    open,
    value,
    // TODO add appropriate props/defaults
    components: {
      root: 'button',
      // button: 'div',
      expandIcon: 'span',
      // icon: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('button', {
        ref,
        role: 'nav',
        type: 'navigation',
        ...props,
        onClick: onNavCategoryItemClick,
      }),
      { elementType: 'button' },
    ),
    expandIcon: slot.always(expandIcon, {
      defaultProps: {
        children: <ChevronRightRegular style={{ transform: `rotate(${expandIconRotation}deg)` }} />,
        'aria-hidden': true,
      },
      elementType: 'span',
    }),
    // button: useARIAButtonProps(buttonSlot.as, buttonSlot),
    // button: slot.always(
    //   getIntrinsicElementProps('button', {
    //     ref,
    //     role: 'button',
    //     type: 'button',
    //     onClick: onNavCategoryItemClick,
    //   }),
    //   { elementType: 'button' },
    // ),
  };
};
