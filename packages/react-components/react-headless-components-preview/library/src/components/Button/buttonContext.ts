'use client';

/**
 * Re-export of the Griffel Button context, mirroring how `Field` re-exports `useFieldContext`
 * (`../Field/useFieldContextValues.ts`).
 *
 * The context INSTANCE has to be Griffel's: the providers that publish into it are Griffel's
 * (`renderMessageBarActions`, re-exported unchanged from `@fluentui/react-message-bar` by
 * `../MessageBar/MessageBarActions/renderMessageBarActions.ts`, wraps its children in
 * `ButtonContextProvider`). A second context created here would be a different instance and would
 * never receive those values, so this is a re-export and not a re-declaration.
 *
 * The value is look-only (`{ size }`), so nothing in the headless layer consumes it — a styling
 * layer does, which is why it is published rather than used here.
 */
export { useButtonContext, ButtonContextProvider } from '@fluentui/react-button';
export type { ButtonContextValue } from '@fluentui/react-button';
