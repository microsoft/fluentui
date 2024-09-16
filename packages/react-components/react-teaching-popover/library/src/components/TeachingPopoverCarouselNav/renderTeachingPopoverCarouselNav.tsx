/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import type { TeachingPopoverCarouselNavState } from './TeachingPopoverCarouselNav.types';
import { assertSlots } from '@fluentui/react-utilities';
import { TeachingPopoverCarouselNavSlots } from './TeachingPopoverCarouselNav.types';
import { ValueIdContextProvider } from './valueIdContext';

/**
 * Render the final JSX of TeachingPopoverCarouselNav
 */
export const renderTeachingPopoverCarouselNav_unstable = (state: TeachingPopoverCarouselNavState) => {
  assertSlots<TeachingPopoverCarouselNavSlots>(state);

  const { values, renderNavButton } = state;

  return (
    <state.root>
      {values.map(value => (
        <ValueIdContextProvider value={value} key={value}>
          {renderNavButton(value)}
        </ValueIdContextProvider>
      ))}
    </state.root>
  );
};
