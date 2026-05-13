/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type {
  TeachingPopoverCarouselFooterSlots,
  TeachingPopoverCarouselFooterState,
} from './TeachingPopoverCarouselFooter.types';

export const renderTeachingPopoverCarouselFooter = (state: TeachingPopoverCarouselFooterState): JSXElement => {
  assertSlots<TeachingPopoverCarouselFooterSlots>(state);

  return <state.root />;
};
