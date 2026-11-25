import { FASTElement } from '@microsoft/fast-element';
import type { ImageFit, ImageShape } from './image.options.js';

/**
 * The base class used for constucting a fluent image custom element
 *
 * @tag fluent-image
 *
 * @slot - The default slot. Accepts any `<img>`, `<picture>`, `<video>`, or `<canvas>` element.
 *
 * @presentational {boolean} block - Image layout.
 * @presentational {boolean} bordered - Image border.
 * @presentational {boolean} shadow - Image shadow.
 * @presentational {ImageFit | undefined} fit - Image fit.
 * @presentational {ImageShape | undefined} shape - Image shape.
 *
 * @public
 */
export class Image extends FASTElement {}
