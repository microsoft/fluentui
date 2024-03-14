import { ShadowConfig } from '@fluentui/merge-styles';
import { getWindow } from '../../dom';
import { useMergeStylesHooks } from './useMergeStylesHooks';

type ObjectWithShadowConfig = { __shadowConfig__?: ShadowConfig };
export type UseStyledHook = (scope: string, styles: ObjectWithShadowConfig) => void;

export const useStyled: UseStyledHook = (scope, styles) => {
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

  styles.__shadowConfig__ = shadowConfig;

  useAdoptedStylesheetEx(scope, shadowCtx, rootMergeStyles, win);

  return shadowConfig;
};
