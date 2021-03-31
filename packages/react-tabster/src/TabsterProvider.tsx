import * as React from 'react';
import { makeMergePropsCompat, useMergedRefs } from '@fluentui/react-utilities';
import { getCurrentTabster, createTabster, Types as TabsterTypes } from 'tabster';
import { TabsterContext, TabsterContextValue } from './TabsterContext';

export interface TabsterProvideProps extends React.HTMLAttributes<HTMLElement> {
  dir?: 'rtl' | 'ltr';
  document?: Document;
  /**
   * The root is automatically set as the `body` element of the ownerDocument.
   * This prop needs to be set if a custom root is used
   */
  customRoot?: boolean;
}

export interface TabsterProviderState extends TabsterProvideProps {
  dir: 'ltr' | 'rtl';
  document?: Document;
  contextValue: TabsterContextValue;
}

// eslint-disable-next-line deprecation/deprecation
const mergeProps = makeMergePropsCompat<TabsterProviderState>();

export const useTabsterProvider = (props: TabsterProvideProps, ref: React.Ref<HTMLElement>): TabsterProviderState => {
  const rootRef = useMergedRefs(ref, React.useRef<HTMLElement>(null));
  const state = mergeProps(
    {
      ref: rootRef,
      as: 'div',
      dir: 'ltr',
    },
    {},
    props,
  );

  const tabsterOptions = { autoRoot: {} };
  if (state.customRoot) {
    delete tabsterOptions.autoRoot;
  }

  // only one instance per window of ability helpers should exist
  let tabster: TabsterTypes.TabsterCore | undefined;
  if (state.document?.defaultView) {
    tabster =
      getCurrentTabster(state.document.defaultView) ?? createTabster(state.document.defaultView, tabsterOptions);
  }

  // memoize context value so that it's stable
  state.contextValue = React.useMemo<TabsterContextValue>(
    () => ({ focusable: tabster?.focusable, tabsterInstance: tabster }),
    [tabster],
  );

  return state;
};

export const renderTabsterProvider = (state: TabsterProviderState) => {
  return <TabsterContext.Provider value={state.contextValue}>{state.children}</TabsterContext.Provider>;
};

/**
 * A React provider that manages and exposes an ability-helpers instance for focus management
 */
export const TabsterProvider: React.FunctionComponent<TabsterProvideProps> = React.forwardRef<
  HTMLDivElement,
  TabsterProvideProps
>((props: TabsterProvideProps, ref: React.Ref<HTMLDivElement>) => {
  const state = useTabsterProvider(props, ref);

  return renderTabsterProvider(state);
});

TabsterProvider.displayName = 'TabsterProvider';
