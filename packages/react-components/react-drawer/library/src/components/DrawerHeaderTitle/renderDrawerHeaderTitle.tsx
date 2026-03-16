/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';

import type { DrawerHeaderTitleState, DrawerHeaderTitleSlots } from './DrawerHeaderTitle.types';

/**
 * Render the final JSX of DrawerHeaderTitle
 */
export const renderDrawerHeaderTitle_unstable = (state: DrawerHeaderTitleState): JSXElement => {
  assertSlots<DrawerHeaderTitleSlots>(state);

  return (
    <state.root>
      {state.heading && <state.heading />}
      {state.action && <state.action />}
    </state.root>
  );
};
