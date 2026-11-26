/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import {
  assertSlots,
  SLOT_CLASS_NAME_PROP_SYMBOL,
  SLOT_ELEMENT_TYPE_SYMBOL,
  SLOT_RENDER_FUNCTION_SYMBOL,
} from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { CarouselDirectionTooltip, CustomTrigger } from './CarouselDirectionTooltip';
import type { CarouselDirectionButtonSlots, CarouselDirectionButtonState } from './CarouselDirectionButton.types';

export const renderCarouselDirectionButton = (state: CarouselDirectionButtonState): JSXElement | null => {
  assertSlots<CarouselDirectionButtonSlots>(state);
  if (!state.rendered && !state.keepButtonMounted) {
    return state.probeRef ? <template ref={state.probeRef} /> : null;
  }
  const {
    [SLOT_CLASS_NAME_PROP_SYMBOL]: _className,
    [SLOT_ELEMENT_TYPE_SYMBOL]: Component,
    [SLOT_RENDER_FUNCTION_SYMBOL]: renderButton,
    ...buttonProps
  } = state.button;
  return (
    <state.root data-carousel-button={state.rendered ? state.root['data-carousel-button'] : undefined}>
      {(!state.hidden || state.keepButtonMounted) && (
        <CarouselDirectionTooltip
          content={{ ...state.tooltip, children: <span>{state.tooltip.children}</span> }}
          position={state.kind === 'previous' ? 'before' : 'after'}
          unavailable={state.unavailable || state.hidden}
        >
          {renderButton ? (
            <CustomTrigger {...buttonProps} Component={Component} renderButton={renderButton} />
          ) : (
            <state.button />
          )}
        </CarouselDirectionTooltip>
      )}
    </state.root>
  );
};
