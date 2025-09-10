/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import type { TeachingPopoverCarouselFooterState } from './TeachingPopoverCarouselFooter.types';
import { TeachingPopoverCarouselFooterSlots } from './TeachingPopoverCarouselFooter.types';
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';

/**
 * Render the final JSX of TeachingPopoverCarouselFooter
 */
export const renderTeachingPopoverCarouselFooter_unstable = (state: TeachingPopoverCarouselFooterState): JSXElement => {
  assertSlots<TeachingPopoverCarouselFooterSlots>(state);

  const { layout } = state;

  return (
    <state.root>
      {layout === 'centered' && state.previous && <state.previous />}
      {state.root.children}
      {layout === 'offset' && state.previous && <state.previous />}
      <state.next />
    </state.root>
  );
};
