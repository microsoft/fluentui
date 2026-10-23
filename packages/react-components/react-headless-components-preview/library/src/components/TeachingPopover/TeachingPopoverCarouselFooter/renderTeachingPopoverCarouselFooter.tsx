/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type {
  TeachingPopoverCarouselFooterSlots,
  TeachingPopoverCarouselFooterState,
} from './TeachingPopoverCarouselFooter.types';
import { TeachingPopoverCarouselFooterContext } from './TeachingPopoverCarouselFooterContext';

export const renderTeachingPopoverCarouselFooter = (state: TeachingPopoverCarouselFooterState): JSXElement => {
  assertSlots<TeachingPopoverCarouselFooterSlots>(state);

  return (
    <TeachingPopoverCarouselFooterContext.Provider value={state.focusOnBoundary}>
      <state.root>
        {state.previous && <state.previous />}
        {state.root.children}
        <state.next />
      </state.root>
    </TeachingPopoverCarouselFooterContext.Provider>
  );
};
