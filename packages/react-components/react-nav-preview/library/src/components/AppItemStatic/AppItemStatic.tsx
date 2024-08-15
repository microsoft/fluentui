import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useAppItemStatic_unstable } from './useAppItemStatic';
import { renderAppItemStatic_unstable } from './renderAppItemStatic';
import { useAppItemStaticStyles_unstable } from './useAppItemStaticStyles.styles';
import type { AppItemStaticProps } from './AppItemStatic.types';

/**
 * AppItemStatic component - TODO: add more docs
 */
export const AppItemStatic: ForwardRefComponent<AppItemStaticProps> = React.forwardRef((props, ref) => {
  const state = useAppItemStatic_unstable(props, ref);

  useAppItemStaticStyles_unstable(state);

  /**
   * @see https://github.com/microsoft/fluentui/blob/master/docs/react-v9/contributing/rfcs/react-components/convergence/custom-styling.md
   *
   * TODO: 💡 once package will become stable (PR which will be part of promoting PREVIEW package to STABLE),
   *      - uncomment this line
   *      - update types {@link file://./../../../../../../../packages/react-components/react-shared-contexts/library/src/CustomStyleHooksContext/CustomStyleHooksContext.ts#CustomStyleHooksContextValue}
   *      - verify that custom global style override works for your component
   */
  // useCustomStyleHook_unstable('useAppItemStaticStyles_unstable')(state);

  return renderAppItemStatic_unstable(state);
});

AppItemStatic.displayName = 'AppItemStatic';
