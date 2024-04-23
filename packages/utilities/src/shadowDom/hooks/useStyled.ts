import { ShadowConfig } from '@fluentui/merge-styles';
import { getWindow } from '../../dom';
import { useMergeStylesHooks } from './useMergeStylesHooks';

export type UseStyledHook = (scope: string) => ShadowConfig | undefined;

export const useStyled: UseStyledHook = (scope = '__global__') => {
  const {
    useAdoptedStylesheetEx,
    useShadowConfig,
    useMergeStylesShadowRootContext,
    useMergeStylesRootStylesheets,
    useWindow,
  } = useMergeStylesHooks();

  const win = useWindow() || getWindow();
  const shadowCtx = useMergeStylesShadowRootContext();
  const inShadow = !!shadowCtx;
  const rootMergeStyles = useMergeStylesRootStylesheets();
  const shadowConfig = useShadowConfig(scope, inShadow, win);

  useAdoptedStylesheetEx(scope, shadowCtx, rootMergeStyles, win);

  return shadowConfig;
};
