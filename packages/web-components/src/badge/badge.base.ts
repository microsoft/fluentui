import { FASTElement } from '@microsoft/fast-element';
import { applyMixins } from '../utils/apply-mixins.js';
import { StartEnd } from '../patterns/index.js';

/**
 * The base class used for constructing a fluent-badge custom element
 *
 * @slot start - Content which can be provided before the button content
 * @slot end - Content which can be provided after the button content
 * @slot - The default slot for button content
 *
 * @tag fluent-badge
 */
export class BaseBadge extends FASTElement {}

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API extractor.
 * TODO: Below will be unnecessary when Badge class gets updated
 * @internal
 */
/* eslint-disable-next-line */
export interface BaseBadge extends StartEnd {}
applyMixins(BaseBadge, StartEnd);
