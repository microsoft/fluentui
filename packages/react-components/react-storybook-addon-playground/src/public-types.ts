/**
 * NOTE:
 * Don't import anything from source code in this file !!
 *
 * only pure API definitions of addon are allowed to live here, that are used both internal and for external storybook `Parameter` type extensions
 */

/**
 * Options passed to the addon via Storybook's `addons` entry
 * (`loadWorkspaceAddon(..., { options })` or `{ name, options }`).
 *
 * This initial release is a package scaffold. The playground configuration surface
 * will be added in a follow-up experimental release.
 */
export interface PresetConfig {}

export interface ParametersExtension {}
