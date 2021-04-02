import * as React from 'react';
import { assign, ComponentState, makeMergeProps, useMergedRefs } from '@fluentui/react-utilities';
import { getCurrentAbilityHelpers, createAbilityHelpers, Types as AHTypes } from 'ability-helpers';
import { internal__FocusManagementContext, FocusManagementContextValue } from './focusManagementContext';

export interface FocusManagementProviderProps extends React.HTMLAttributes<HTMLElement> {
  dir?: 'ltr' | 'rtl';

  /**
   * The document, which can be null during server render in SSR
   */
  document?: Document;

  /**
   * The root is automatically set as the `body` element of the ownerDocument.
   * This prop needs to be set if a custom root is used
   */
  customRoot?: boolean;
}

export type FocusManagementProviderState = ComponentState<
  React.Ref<HTMLElement>,
  FocusManagementProviderProps & {
    contextValue: FocusManagementContextValue;
  },
  /* ShorthandProps: */ never,
  /* DefaultedProps: */ 'dir' | 'contextValue'
>;

type FocusManagementProviderDraftState = Omit<FocusManagementProviderState, 'dir' | 'contextValue'> &
  Pick<FocusManagementProviderProps, 'dir'>;

const mergeProps = makeMergeProps<FocusManagementProviderDraftState>();

export const useFocusManagementProvider = (
  props: FocusManagementProviderProps,
  ref: React.Ref<HTMLElement>,
): FocusManagementProviderState => {
  const rootRef = useMergedRefs(ref, React.useRef<HTMLElement>(null));
  const state = mergeProps(
    {
      ref: rootRef,
      as: 'div',
    },
    props,
  );

  const ahOptions: AHTypes.AbilityHelpersCoreProps = { autoRoot: {} };
  if (state.customRoot) {
    delete ahOptions.autoRoot;
  }

  // only one instance per window of ability helpers should exist
  let ahInstance: AHTypes.AbilityHelpersCore | undefined = undefined;
  if (state.document?.defaultView) {
    ahInstance =
      getCurrentAbilityHelpers(state.document.defaultView) ||
      createAbilityHelpers(state.document.defaultView, ahOptions);
  }

  return assign(state, {
    dir: state.dir || 'ltr',
    // memoize context value so that it's stable
    contextValue: React.useMemo(() => ({ focusable: ahInstance?.focusable, ahInstance }), [ahInstance]),
  });
};

export const renderFocusManagementProvider = (state: FocusManagementProviderState) => {
  return (
    <internal__FocusManagementContext.Provider value={state.contextValue}>
      {state.children}
    </internal__FocusManagementContext.Provider>
  );
};

/**
 * A React provider that manages and exposes an ability-helpers instance for focus management
 */
export const FocusManagementProvider: React.FunctionComponent<FocusManagementProviderProps> = React.forwardRef<
  HTMLDivElement,
  FocusManagementProviderProps
>((props: FocusManagementProviderProps, ref: React.Ref<HTMLDivElement>) => {
  const state = useFocusManagementProvider(props, ref);

  return renderFocusManagementProvider(state);
});

FocusManagementProvider.displayName = 'FocusManagementProvider';
