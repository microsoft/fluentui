import { fuiSelector } from '@fluentui/react-utilities';
import { dialogSurfaceClassNames, dialogTitleClassNames } from '@fluentui/react-dialog';

/*
 * Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind), D16.
 *
 * Every class selector below is built with `fuiSelector()` rather than `'.' + token`. The
 * identity class is now the Tailwind named-group marker (`group/fui-dialog-surface`), and `/`
 * is legal inside a class TOKEN but terminates the name inside a class SELECTOR — so the
 * concatenation still type-checks and then throws a `SyntaxError` at `cy.get()` time.
 * `fuiSelector` escapes it (DECISIONS.md D16.5). This file is one of the four in-repo sites
 * the statics-removal design called out for exactly this.
 *
 * Two selectors changed shape rather than being escaped, because the slot keys they read no
 * longer exist (D16.1/D16.5 narrowed every `*ClassNames` export to `{ root: string }` —
 * component internals have no public class handle any more):
 *
 *   dialogBackdropSelector  (`dialogSurfaceClassNames.backdrop`) — DELETED. It had zero call
 *     sites in this repo, and there is no replacement handle: the backdrop is a sub-slot of a
 *     component the test does not itself construct, so D16.3's M2 (JS slot composition) is
 *     unavailable and M3 (an owning-package `data-*` attribute) is the documented last resort
 *     with no in-repo case. Reinstate it as a `data-*` attribute only alongside a test that
 *     actually needs it.
 *
 *   dialogActionSelector    (`dialogTitleClassNames.action`) — REPLACED by
 *     `dialogTitleCloseButtonSelector`. All three call sites are in DialogTitle.cy.tsx, under
 *     tests literally named "should [not] have closeButton by default", so the accessible name
 *     the component already renders (`useDialogTitle.tsx`: `aria-label="close"` on the default
 *     close <button>) asserts the same thing more directly than the wrapper <div>'s class did
 *     — and it is stable public surface rather than a styling hook.
 */

export const dialogTriggerOpenId = 'open-btn';
export const dialogTriggerCloseId = 'close-btn';

export const dialogSurfaceSelector = fuiSelector(dialogSurfaceClassNames.root);
export const dialogTriggerOpenSelector = `#${dialogTriggerOpenId}`;
export const dialogTriggerCloseSelector = `#${dialogTriggerCloseId}`;
export const dialogTitleSelector = fuiSelector(dialogTitleClassNames.root);

/** The default close button DialogTitle renders for a non-modal Dialog. */
export const dialogTitleCloseButtonSelector = 'button[aria-label="close"]';
