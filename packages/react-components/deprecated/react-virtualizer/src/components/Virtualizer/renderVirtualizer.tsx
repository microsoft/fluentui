/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';
import type { VirtualizerSlots, VirtualizerState } from './Virtualizer.types';

import { assertSlots } from '@fluentui/react-utilities';

/**
 * @deprecated migrated to \@fluentui\-contrib/react\-virtualizer for stable release.
 */
export const renderVirtualizer_unstable = (state: VirtualizerState): React.ReactElement => {
  assertSlots<VirtualizerSlots>(state);
  return (
    <React.Fragment>
      {/* The 'before' bookend to hold items in place and detect scroll previous */}
      <state.beforeContainer>
        <state.before />
      </state.beforeContainer>
      {/* The reduced list of non-virtualized children to be rendered */}
      {state.virtualizedChildren}
      {/* The 'after' bookend to hold items in place and detect scroll next */}
      <state.afterContainer>
        <state.after />
      </state.afterContainer>
    </React.Fragment>
  );
};
/**
 * @deprecated migrated to \@fluentui\-contrib/react\-virtualizer for stable release.
 */
export const renderVirtualizerChildPlaceholder = (child: React.ReactNode, index: number): React.ReactElement => {
  return (
    <React.Suspense key={`fui-virtualizer-placeholder-${index}`} fallback={null}>
      {child}
    </React.Suspense>
  );
};
