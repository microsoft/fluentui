/**
 * Re-export of the Griffel Link context, mirroring how `Field` re-exports `useFieldContext`
 * (`../Field/useFieldContextValues.ts`).
 *
 * The context INSTANCE has to be Griffel's: `renderMessageBarBody`, re-exported unchanged from
 * `@fluentui/react-message-bar` by `../MessageBar/MessageBarBody/renderMessageBarBody.ts`, wraps
 * its children in `LinkContextProvider`. A second context created here would be a different
 * instance and would never receive that value.
 *
 * The value is look-only (`{ inline }`), so nothing in the headless layer consumes it — a styling
 * layer does, which is why it is published rather than used here.
 */
export { useLinkContext, LinkContextProvider, linkContextDefaultValue } from '@fluentui/react-link';
export type { LinkContextValue } from '@fluentui/react-link';
