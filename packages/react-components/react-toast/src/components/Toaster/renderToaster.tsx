/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import { Portal } from '@fluentui/react-portal';
import type { ToasterState, ToasterSlotsInternal } from './Toaster.types';
import { AriaLive } from '../AriaLive';

/**
 * Render the final JSX of Toaster
 */
export const renderToaster_unstable = (state: ToasterState) => {
  const { announceRef, renderAriaLive, inline, mountNode } = state;
  assertSlots<ToasterSlotsInternal>(state);

  const hasToasts =
    !!state.bottomStart || !!state.bottomEnd || !!state.topStart || !!state.topEnd || !!state.top || !!state.bottom;

  const ariaLive = renderAriaLive ? <AriaLive announceRef={announceRef} /> : null;
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

  if (inline) {
    return (
      <>
        {ariaLive}
        {hasToasts ? positionSlots : null}
      </>
    );
  }

  return (
    <>
      {ariaLive}
      {hasToasts ? <Portal mountNode={mountNode}>{positionSlots}</Portal> : null}
    </>
  );
};
