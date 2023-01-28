import type { ContextSelector } from '@fluentui/react-context-selector';
import { createContext, useContextSelector } from '@fluentui/react-context-selector';
import type { FieldContextValue } from '../Field';

const FieldContext = createContext<FieldContextValue | undefined>(undefined);

/**
 * @internal
 */
export const FieldContextProvider = FieldContext.Provider;

/**
 * If this control is inside a Field, retreive a property from the Field context.
 * Note the context passed to the selector will be `undefined` if not inside a Field.
 *
 * @example
 * ```
 * const fieldSize = useFieldContext(ctx => ctx?.size); // 'small' | 'medium' | 'large' | undefined
 * ```
 */
export const useFieldContext = <T>(selector: ContextSelector<FieldContextValue | undefined, T>): T =>
  useContextSelector(FieldContext, selector);
