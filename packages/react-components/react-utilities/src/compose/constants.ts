/**
 * @internal
 * Internal value that indicates a given component is a slot component
 * It is used to hold internal metadata about the slot component
 */
export const SLOT_COMPONENT_METADATA_SYMBOL = Symbol('fui.slotComponentMetadata');

/**
 * @internal
 * Internal reference for the render function
 * @deprecated `SLOT_COMPONENT_METADATA_SYMBOL` is used instead
 */
export const SLOT_RENDER_FUNCTION_SYMBOL = Symbol('fui.slotRenderFunction');
