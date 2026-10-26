/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type {
  TeachingPopoverCarouselFooterSlots,
  TeachingPopoverCarouselFooterState,
} from './TeachingPopoverCarouselFooter.types';
import { TeachingPopoverCarouselFooterProvider } from './TeachingPopoverCarouselFooterContext';

export const renderTeachingPopoverCarouselFooter = (state: TeachingPopoverCarouselFooterState): JSXElement => {
  assertSlots<TeachingPopoverCarouselFooterSlots>(state);

  return (
    <TeachingPopoverCarouselFooterProvider>
      <state.root>
        {state.previous && <state.previous />}
        {state.root.children}
        <state.next />
      </state.root>
    </TeachingPopoverCarouselFooterProvider>
  );
};
