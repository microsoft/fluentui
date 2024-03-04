import type * as React from 'react';
import { useWindow } from '@fluentui/react-window-provider';
import { GLOBAL_STYLESHEET_KEY } from '@fluentui/merge-styles';
import { useMergeStylesHooks } from '../hooks/useMergeStylesHooks';
import { useMergeStylesRootStylesheets } from '../hooks/useMergeStylesRootStylesheets';
import { useMergeStylesShadowRootContext } from '../hooks/useMergeStylesShadowRoot';

export type MergeStylesContextConsumerProps = {
  stylesheetKey: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: (inShadow: boolean) => React.ReactElement<any, any>;
};

export const MergeStylesShadowRootConsumer: React.FC<MergeStylesContextConsumerProps> = ({
  stylesheetKey,
  children,
}) => {
  const { useAdoptedStylesheetEx } = useMergeStylesHooks();
  const shadowCtx = useMergeStylesShadowRootContext();
  const rootMergeStyles = useMergeStylesRootStylesheets();
  const win = useWindow();

  useAdoptedStylesheetEx(GLOBAL_STYLESHEET_KEY, shadowCtx, rootMergeStyles, win);
  useAdoptedStylesheetEx(stylesheetKey, shadowCtx, rootMergeStyles, win);

  return children(!!shadowCtx);
};
