import { getVendorSettings } from './getVendorSettings';
import { Stylesheet } from './Stylesheet';
import { serializeRuleEntries } from './styleToClassName';

/**
 * Registers keyframe definitions.
 *
 * @public
 */
export function keyframes(timeline: { [key: string]: {} }): string {
  let vendorSettings = getVendorSettings();
  let stylesheet = Stylesheet.getInstance();
  let name = stylesheet.getClassName();

  let rulesArray: string[] = [];

  for (let prop in timeline) {
    if (timeline.hasOwnProperty(prop)) {
      rulesArray.push(prop, ' {', serializeRuleEntries(timeline[prop]), '}');
    }
  }
  let rules = rulesArray.join('');

  stylesheet.insertRule(`@keyframes ${name}{${rules}}`);

  if (vendorSettings.isWebkit) {
    stylesheet.insertRule(`@-webkit-keyframes ${name}{${rules}}`);
  }
  if (vendorSettings.isMoz) {
    stylesheet.insertRule(`@-moz-keyframes ${name}{${rules}}`);
  }

  if (vendorSettings.isOpera) {
    stylesheet.insertRule(`@-o-keyframes ${name}{${rules}}`);
  }

  if (vendorSettings.isMs) {
    stylesheet.insertRule(`@-ms-keyframes ${name}{${rules}}`);
  }

  return name;
}
