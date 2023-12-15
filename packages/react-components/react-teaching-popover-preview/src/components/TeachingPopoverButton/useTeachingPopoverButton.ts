import * as React from 'react';
import { useButton_unstable } from '@fluentui/react-button';
import type { TeachingPopoverButtonProps, TeachingPopoverButtonState } from './TeachingPopoverButton.types';
import { usePopoverContext_unstable } from '@fluentui/react-popover';
import { useTeachingPopoverContext_unstable } from '../../TeachingPopoverContext';
import { useEventCallback } from '@fluentui/react-utilities';

/**
 * Given user props, defines default props for the TeachingPopoverButton, calls useButtonState, and returns processed state.
 * @param props - User provided props to the TeachingPopoverButton component.
 * @param ref - User provided ref to be passed to the TeachingPopoverButton component.
 */
export const useTeachingPopoverButton_unstable = (
  props: TeachingPopoverButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): TeachingPopoverButtonState => {
  const { buttonType, altStepText } = props;
  const toggleOpen = usePopoverContext_unstable(context => context.toggleOpen);
  const triggerRef = usePopoverContext_unstable(context => context.triggerRef);

  const totalPages = useTeachingPopoverContext_unstable(context => context.totalPages);
  const currentPage = useTeachingPopoverContext_unstable(context => context.currentPage);
  const setCurrentPage = useTeachingPopoverContext_unstable(context => context.setCurrentPage);
  const appearance = useTeachingPopoverContext_unstable(context => context.appearance);
  const onFinish = useTeachingPopoverContext_unstable(context => context.onFinish);
  const onPageChange = useTeachingPopoverContext_unstable(context => context.onPageChange);

  const isCarousel = totalPages > 1;
  let buttonAppearanceMod = {};
  let buttonTextMod = {};

  if (!props.appearance) {
    if (buttonType === 'primary') {
      const shouldShowFinalStepText = altStepText && currentPage === totalPages - 1 && totalPages > 1;
      buttonTextMod = shouldShowFinalStepText ? { children: altStepText } : {};
      buttonAppearanceMod = isCarousel ? { appearance: 'primary' } : {};
      if (appearance === 'brand') {
        buttonAppearanceMod = isCarousel ? {} : { appearance: 'primary' };
      }
    } else {
      const shouldShowInitialStepText = altStepText && currentPage === 0 && totalPages > 1;
      buttonTextMod = shouldShowInitialStepText ? { children: altStepText } : {};
      buttonAppearanceMod = isCarousel ? {} : { appearance: 'primary' };
      if (appearance === 'brand') {
        buttonAppearanceMod = isCarousel ? { appearance: 'outline' } : {};
      }
    }
  }

  if (altStepText && isCarousel) {
    /* Alternate text for first/last step depending on button type */
    if (buttonType === 'primary') {
      const shouldShowFinalStepText = altStepText && currentPage === totalPages - 1;
      buttonTextMod = shouldShowFinalStepText ? { children: altStepText } : {};
    } else {
      const shouldShowInitialStepText = altStepText && currentPage === 0;
      buttonTextMod = shouldShowInitialStepText ? { children: altStepText } : {};
    }
  }

  const handleTeachingPopoverButtonClick = useEventCallback(
    (event: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>) => {
      props.onClick?.(event);
      if (event.isDefaultPrevented()) {
        return;
      }

      if (buttonType === 'secondary') {
        if (currentPage <= 0 || !isCarousel) {
          if (triggerRef.current) {
            triggerRef.current.focus();
          }
          toggleOpen(event);
        } else {
          onPageChange?.(event, { currentPage: currentPage - 1 });
          setCurrentPage(currentPage - 1);
        }
      } else {
        if (currentPage >= totalPages - 1 || !isCarousel) {
          if (isCarousel) {
            onFinish?.(event);
          }
          if (triggerRef.current) {
            triggerRef.current.focus();
          }
          toggleOpen(event);
        } else {
          onPageChange?.(event, { currentPage: currentPage + 1 });
          setCurrentPage(currentPage + 1);
        }
      }
    },
  );

  const buttonState = useButton_unstable(
    {
      ...props,
      // onClick override injection
      onClick: handleTeachingPopoverButtonClick,
    },
    ref,
  );

  const state: TeachingPopoverButtonState = {
    // TeachingPopoverButton state
    buttonType: props.buttonType,
    // Button state
    ...buttonState,
    ...buttonAppearanceMod,
    root: {
      ...buttonState.root,
      ...buttonTextMod,
    },
    popoverAppearance: appearance,
    totalPages,
  };

  return state;
};
