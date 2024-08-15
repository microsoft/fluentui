/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import { BreadcrumbProvider } from './BreadcrumbContext';
import type { BreadcrumbState, BreadcrumbSlots, BreadcrumbContextValues } from './Breadcrumb.types';
/**
 * Render the final JSX of Breadcrumb
 */
export const renderBreadcrumb_unstable = (state: BreadcrumbState, contextValues: BreadcrumbContextValues) => {
  assertSlots<BreadcrumbSlots>(state);
  return (
    <state.root>
      <BreadcrumbProvider value={contextValues}>
        {state.list && <state.list>{state.root.children}</state.list>}
      </BreadcrumbProvider>
    </state.root>
  );
};
