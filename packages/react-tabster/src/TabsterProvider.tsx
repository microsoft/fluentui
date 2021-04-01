import * as React from 'react';
import { makeMergePropsCompat, useMergedRefs } from '@fluentui/react-utilities';
import { getCurrentTabster, createTabster } from 'tabster';
import { TabsterContext, TabsterContextValue } from './TabsterContext';

export interface TabsterProviderProps extends React.HTMLAttributes<HTMLElement> {
  dir?: 'rtl' | 'ltr';
  document: Document | undefined;
  /**
   * The root is automatically set as the `body` element of the ownerDocument.
   * This prop needs to be set if a custom root is used
   */
  customRoot?: boolean;
}

export interface TabsterProviderState extends TabsterProviderProps {
  dir: 'ltr' | 'rtl';
  document: Document | undefined;
  contextValue: TabsterContextValue | undefined;
}

// eslint-disable-next-line deprecation/deprecation
const mergeProps = makeMergePropsCompat<TabsterProviderState>();

export const useTabsterProvider = (props: TabsterProviderProps, ref: React.Ref<HTMLElement>): TabsterProviderState => {
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

  const defaultView = state.document?.defaultView || undefined;
  const tabsterOptions = state.customRoot ? {} : { autoRoot: {} };

  state.contextValue = defaultView && (getCurrentTabster(defaultView) ?? createTabster(defaultView, tabsterOptions));

  return state;
};

export const renderTabsterProvider = (state: TabsterProviderState) => {
  return <TabsterContext.Provider value={state.contextValue}>{state.children}</TabsterContext.Provider>;
};

/**
 * A React provider that manages and exposes a tabster instance for focus management
 */
export const TabsterProvider: React.FunctionComponent<TabsterProviderProps> = React.forwardRef<
  HTMLDivElement,
  TabsterProviderProps
>((props: TabsterProviderProps, ref: React.Ref<HTMLDivElement>) => {
  const state = useTabsterProvider(props, ref);

  return renderTabsterProvider(state);
});

TabsterProvider.displayName = 'TabsterProvider';
