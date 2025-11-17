/* eslint-disable @typescript-eslint/naming-convention */
import { FluentProviderCustomStyleHooks } from '@fluentui/react-provider';
import {
  useSemanticButtonStyles,
  useSemanticCompoundButtonStyles,
  useSemanticMenuButtonStyles,
  useSemanticSplitButtonStyles,
  useSemanticToggleButtonStyles,
} from './Button';
import {
  useSemanticFieldStyles,
  useSemanticInputStyles,
  useSemanticSearchBoxStyles,
  useSemanticTextareaStyles,
} from './Input';

export const SEMANTIC_STYLE_HOOKS: FluentProviderCustomStyleHooks = {
  // Button styles
  useButtonStyles_unstable: useSemanticButtonStyles,
  useToggleButtonStyles_unstable: useSemanticToggleButtonStyles,
  useSplitButtonStyles_unstable: useSemanticSplitButtonStyles,
  useMenuButtonStyles_unstable: useSemanticMenuButtonStyles,
  useCompoundButtonStyles_unstable: useSemanticCompoundButtonStyles,
  // Input styles
  useInputStyles_unstable: useSemanticInputStyles,
  useSearchBoxStyles_unstable: useSemanticSearchBoxStyles,
  useTextareaStyles_unstable: useSemanticTextareaStyles,
  useFieldStyles_unstable: useSemanticFieldStyles,
};
