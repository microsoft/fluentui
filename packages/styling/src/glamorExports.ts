import * as Glamor from 'glamor';
import rtlify from 'rtl-css-js';
import { IRawStyle, IProcessedStyle } from './interfaces/index';
import { getRTL } from '@uifabric/utilities';

interface IGlamorRulePair {
  selector: string;
  style: Glamor.CSSProperties;
}

// force speedy.
// Glamor['speedy'](true);

// tslint:disable-next-line:no-string-literal
Glamor['plugins'].add(
  ({ selector, style }: IGlamorRulePair): IGlamorRulePair => (
    {
      selector,
      style: getRTL() ? rtlify(style) : style
    }
  ));

/**
 * Defines a :before pseudo-selector scoped style object for the given raw style.
 */
export function before(style: IRawStyle): IProcessedStyle {
  return Glamor.before(style);
}

/**
 * Defines a :after pseudo-selector scoped style object for the given raw style.
 */
export function after(style: IRawStyle): IProcessedStyle {
  return Glamor.after(style);
}

/**
 * Defines a style under a rule which is prefixed by the given selector.
 */
export function parent(selector: string, style: IRawStyle): IProcessedStyle {
  return Glamor.parent(selector, style);
}

/**
 * Registers a global rule. Be aware: registering global rules are not scoped;
 * Two versions of a global rule will colide with each other.
 */
export function insertGlobal(selector: string, style: IRawStyle): void {
  Glamor.insertGlobal(selector, style);
}

/**
 * Registers a font face.
 */
export function fontFace(font: Glamor.FontProperties): string {
  return Glamor.fontFace(font);
}

/**
 * Register a keyframe definition and returns the unique name to be used for
 * the animation name.
 */
export function keyframes(timeline: Glamor.TimeLine): string {
  return Glamor.keyframes(timeline);
}
