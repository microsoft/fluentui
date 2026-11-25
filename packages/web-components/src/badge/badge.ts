import { FASTElement } from '@microsoft/fast-element';
import { applyMixins } from '../utils/apply-mixins.js';
import { StartEnd } from '../patterns/start-end.js';
import type { BadgeAppearance, BadgeColor, BadgeShape, BadgeSize } from './badge.options.js';

/**
 * The base class used for constructing a fluent-badge custom element
 * @tag fluent-badge
 *
 * @slot - Content which can be provided inside the badge.
 * @slot start - Content which can be provided before the badge content.
 * @slot end - Content which can be provided after the badge content.
 *
 * @presentational {BadgeAppearance} [appearance=filled] - The appearance the badge should have.
 * @presentational {BadgeColor} [color=brand] - The color the badge should have.
 * @presentational {BadgeShape | undefined} shape - The shape the badge should have.
 * @presentational {BadgeSize | undefined} size - The size the badge should have.
 *
 * @public
 */
export class Badge extends FASTElement {}

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API extractor.
 * TODO: Below will be unnecessary when Badge class gets updated
 * @internal
 */
/* eslint-disable-next-line */
export interface Badge extends StartEnd {}
applyMixins(Badge, StartEnd);
