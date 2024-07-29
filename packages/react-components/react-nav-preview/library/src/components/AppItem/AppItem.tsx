import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useAppItem_unstable } from './useAppItem';
import { renderAppItem_unstable } from './renderAppItem';
import { useAppItemStyles_unstable } from './useAppItemStyles.styles';
import type { AppItemProps } from './AppItem.types';

/**
 * AppItem component - TODO: add more docs
 */
//TODO: migrate to fc to ensure v18 compatibility
// eslint-disable-next-line deprecation/deprecation
export const AppItem: ForwardRefComponent<AppItemProps> = React.forwardRef((props, ref) => {
  const state = useAppItem_unstable(props, ref);

  useAppItemStyles_unstable(state);

  /**
   * @see https://github.com/microsoft/fluentui/blob/master/docs/react-v9/contributing/rfcs/react-components/convergence/custom-styling.md
   *
   * TODO: 💡 once package will become stable (PR which will be part of promoting PREVIEW package to STABLE),
   *      - uncomment this line
   *      - update types {@link file://./../../../../../../../packages/react-components/react-shared-contexts/library/src/CustomStyleHooksContext/CustomStyleHooksContext.ts#CustomStyleHooksContextValue}
   *      - verify that custom global style override works for your component
   */
  // useCustomStyleHook_unstable('useAppItemStyles_unstable')(state);

  return renderAppItem_unstable(state);
});

AppItem.displayName = 'AppItem';
