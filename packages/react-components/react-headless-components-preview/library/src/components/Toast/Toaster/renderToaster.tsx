/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { AriaLiveAnnouncer } from '@fluentui/react-aria';
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { ToasterSlotsInternal, ToasterState } from './Toaster.types';
import { AriaLive } from '../AriaLive';

/**
 * Render the position-based containers for the headless Toaster.
 *
 * Each container is a `<div role="list" data-toaster-position="...">` that
 * consumers can target with CSS to apply positioning/styling. Containers use
 * the native Popover API to render in the browser top layer.
 */
export const renderToaster = (state: ToasterState): JSXElement => {
  const { announceRef, renderAriaLive } = state;

  assertSlots<ToasterSlotsInternal>(state);

  const hasToasts =
    !!state.bottomStart || !!state.bottomEnd || !!state.topStart || !!state.topEnd || !!state.top || !!state.bottom;

  const ariaLive = renderAriaLive ? (
    <AriaLiveAnnouncer>
      <AriaLive announceRef={announceRef} />
    </AriaLiveAnnouncer>
  ) : null;

  const positionSlots = (
    <>
      {state.bottom ? <state.bottom /> : null}
      {state.bottomStart ? <state.bottomStart /> : null}
      {state.bottomEnd ? <state.bottomEnd /> : null}
      {state.topStart ? <state.topStart /> : null}
      {state.topEnd ? <state.topEnd /> : null}
      {state.top ? <state.top /> : null}
    </>
  );

  return (
    <>
      {ariaLive}
      {hasToasts ? positionSlots : null}
    </>
  );
};
