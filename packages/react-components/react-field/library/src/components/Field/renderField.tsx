import type { JSXElement } from '@fluentui/react-utilities';
import { renderField } from '@fluentui/react-core-preview';
import type { FieldBaseState as FieldCoreBaseState } from '@fluentui/react-core-preview';
import type { FieldContextValues, FieldBaseState } from './Field.types';

/**
 * Render the final JSX of Field. The implementation lives in `@fluentui/react-core-preview`.
 */
export const renderField_unstable = (state: FieldBaseState, contextValues: FieldContextValues): JSXElement =>
  renderField(state as FieldCoreBaseState, contextValues);
