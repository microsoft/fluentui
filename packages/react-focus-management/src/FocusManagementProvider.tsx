import * as React from 'react';
import { makeMergeProps, useMergedRefs } from '@fluentui/react-utilities';
import { getCurrentAbilityHelpers, createAbilityHelpers, Types as AHTypes } from 'ability-helpers';
import { internal__FocusManagementContext, FocusManagementContextValue } from './focusManagementContext';

export interface FocusManagementProvideProps extends React.HTMLAttributes<HTMLElement> {
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

export interface FocusManagementProviderState extends FocusManagementProvideProps {
  dir: FocusManagementProvideProps['dir'];

  contextValue: FocusManagementContextValue;
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
  state.document = state.document || document;

  const ahOptions = { autoRoot: {} };
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
  // memoize context value so that it's stable
  state.contextValue = React.useMemo(() => ({ focusable: ahInstance?.focusable, ahInstance }), [ahInstance]);

  return state;
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
export const FocusManagementProvider: React.FunctionComponent<FocusManagementProvideProps> = React.forwardRef<
  HTMLDivElement,
  FocusManagementProvideProps
>((props: FocusManagementProvideProps, ref: React.Ref<HTMLDivElement>) => {
  const state = useFocusManagementProvider(props, ref);

  return renderFocusManagementProvider(state);
});

FocusManagementProvider.displayName = 'FocusManagementProvider';
