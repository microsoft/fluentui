/* eslint-disable @typescript-eslint/naming-convention */
import { FluentProviderCustomStyleHooks } from '@fluentui/react-provider';
import {
  useSemanticButtonStyles,
  useSemanticCompoundButtonStyles,
  useSemanticMenuButtonStyles,
  useSemanticSplitButtonStyles,
  useSemanticToggleButtonStyles,
} from './Button';
import { useSemanticInputStyles } from './Input';
import { useSemanticComboboxStyles } from './Combobox';
import { useSemanticFieldStyles } from './Field';
import { useSemanticSearchBoxStyles } from './Search';
import { useSemanticSpinButtonStyles } from './SpinButton';
import { useSemanticTextareaStyles } from './TextArea';

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
  useSpinButtonStyles_unstable: useSemanticSpinButtonStyles,
  useComboboxStyles_unstable: useSemanticComboboxStyles,
};
