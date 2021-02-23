import * as React from 'react';
import { useMergedRefs } from '@fluentui/react-hooks';
import { makeMergeProps } from '@fluentui/react-utils';
import { getCurrentAbilityHelpers, createAbilityHelpers, Types as AHTypes } from 'ability-helpers';
import { internal__FocusManagementContext, FocusManagementContextValue } from './focusManagementContext';

type Dir = 'ltr' | 'rtl';

export interface FocusManagementProvideProps extends React.HTMLAttributes<HTMLElement> {
  dir?: Dir;

  window?: Window;

  ahProps?: AHTypes.AbilityHelpersCoreProps;
}

export interface FocusManagementProviderState extends FocusManagementProvideProps, FocusManagementContextValue {
  dir: Dir;
}

const mergeProps = makeMergeProps<FocusManagementProviderState>();

export const useFocusManagementProvider = (
  props: FocusManagementProvideProps,
  ref: React.Ref<HTMLElement>,
): FocusManagementProviderState => {
  const rootRef = useMergedRefs(ref, React.useRef<HTMLElement>(null));
  const state = mergeProps(
    {
      ref: rootRef,
      as: 'div',
    },
    {},
    props,
  );

  state.dir = state.dir || 'ltr';
  state.window = state.window || window;

  // only one instance per window of ability helpers should exist
  state.ahInstance = getCurrentAbilityHelpers(state.window) || createAbilityHelpers(state.window, state.ahProps);

  return state;
};

export const renderFocusManagementProvider = (state: FocusManagementProviderState) => {
  return (
    <internal__FocusManagementContext.Provider value={{ focusable: state.focusable, ahInstance: state.ahInstance }}>
      {state.children}
    </internal__FocusManagementContext.Provider>
  );
};

/**
 * A React provider that manages and exposes an ability-helpers instance for focus management
 */
export const FocusManagementProvider: React.FunctionComponent<FocusManagementProvideProps> = React.forwardRef<
  HTMLDivElement,
  FocusManagementProvideProps
>((props: FocusManagementProvideProps, ref: React.Ref<HTMLDivElement>) => {
  const state = useFocusManagementProvider(props, ref);

  return renderFocusManagementProvider(state);
});

FocusManagementProvider.displayName = 'FocusManagementProvider';
