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
  const { announceRef, renderAriaLive } = state;
  assertSlots<ToasterSlotsInternal>(state);

  const hasToasts =
    !!state.bottomStart || !!state.bottomEnd || !!state.topStart || !!state.topEnd || !!state.top || !!state.bottom;

  return (
    <>
      {renderAriaLive ? <AriaLive announceRef={announceRef} /> : null}
      {hasToasts ? (
        <Portal mountNode={state.mountNode}>
          {state.bottom ? <state.bottom /> : null}
          {state.bottomStart ? <state.bottomStart /> : null}
          {state.bottomEnd ? <state.bottomEnd /> : null}
          {state.topStart ? <state.topStart /> : null}
          {state.topEnd ? <state.topEnd /> : null}
          {state.top ? <state.top /> : null}
        </Portal>
      ) : null}
    </>
  );
};
