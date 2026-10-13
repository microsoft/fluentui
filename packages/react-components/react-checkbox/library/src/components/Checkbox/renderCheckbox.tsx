import type { JSXElement } from '@fluentui/react-utilities';
import { renderCheckbox } from '@fluentui/react-core-preview';
import type { CheckboxBaseState as CheckboxCoreBaseState } from '@fluentui/react-core-preview';
import type { CheckboxBaseState } from './Checkbox.types';

/**
 * Render the final JSX of Checkbox. The implementation lives in `@fluentui/react-core-preview`.
 */
export const renderCheckbox_unstable = (state: CheckboxBaseState): JSXElement =>
  renderCheckbox(state as CheckboxCoreBaseState);
