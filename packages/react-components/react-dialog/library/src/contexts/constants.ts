/*
 * Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
 *
 * These six values were the single source of truth for the package's Griffel styles. CSS
 * cannot read a JS constant, so every one of them is now written LITERALLY in the modules
 * that used to import it, and this file no longer has an in-package consumer:
 *
 *   DIALOG_MEDIA_QUERY_BREAKPOINT_SELECTOR   DialogSurface / DialogBody / DialogActions
 *   DIALOG_MEDIA_QUERY_SHORT_SCREEN          DialogSurface / DialogBody / DialogContent
 *   SURFACE_PADDING                          DialogSurface (`p-horizontal-xxl`), DialogBody
 *   DIALOG_GAP                               DialogBody / DialogActions (`gap-horizontal-s`)
 *   SURFACE_BORDER_WIDTH                     DialogSurface
 *   DIALOG_FULLSCREEN_DIALOG_SCROLLBAR_OFFSET DialogSurface
 *
 * All six are KEPT, and the first two plus the scrollbar offset are re-exported from the
 * package index — consumers author their own media queries against them. Change a value here
 * and you must change its literal in the `.module.css` files listed above; the module headers
 * name the constant beside every such literal so the pair stays greppable.
 */

export const DIALOG_MEDIA_QUERY_BREAKPOINT_SELECTOR = '@media screen and (max-width: 480px)';
export const DIALOG_MEDIA_QUERY_SHORT_SCREEN = '@media screen and (max-height: 359px)';
export const SURFACE_PADDING = '24px';
export const DIALOG_GAP = '8px';
export const SURFACE_BORDER_WIDTH = '1px';
export const DIALOG_FULLSCREEN_DIALOG_SCROLLBAR_OFFSET = '4px';
