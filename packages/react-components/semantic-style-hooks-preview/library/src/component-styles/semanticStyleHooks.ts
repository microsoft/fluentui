/* eslint-disable @typescript-eslint/naming-convention */
import { FluentProviderCustomStyleHooks } from '@fluentui/react-provider';
import {
  useSemanticButtonStyles,
  // useSemanticCompoundButtonStyles,
  // useSemanticMenuButtonStyles,
  // useSemanticSplitButtonStyles,
  // useSemanticToggleButtonStyles,
} from './Button';

export const SEMANTIC_STYLE_HOOKS: FluentProviderCustomStyleHooks = {
  // Button styles
  useButtonStyles_unstable: useSemanticButtonStyles,
  // useToggleButtonStyles_unstable: useSemanticToggleButtonStyles,
  // useSplitButtonStyles_unstable: useSemanticSplitButtonStyles,
  // useMenuButtonStyles_unstable: useSemanticMenuButtonStyles,
  // useCompoundButtonStyles_unstable: useSemanticCompoundButtonStyles,
};
