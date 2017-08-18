import { Stylesheet } from './Stylesheet';
import { serializeRuleEntries } from './styleToClassName';

/**
 * Registers keyframe definitions.
 *
 * @public
 */
export function keyframes(timeline: { [key: string]: {} }): string {
  let stylesheet = Stylesheet.getInstance();
  let name = stylesheet.getClassName();

  let rulesArray: string[] = [];

  for (const prop in timeline) {
    if (timeline.hasOwnProperty(prop)) {
      rulesArray.push(prop, ' {', serializeRuleEntries(timeline[prop]), '}');
    }
  }
  let rules = rulesArray.join('');

  stylesheet.insertRule(`@keyframes ${name}{${rules}}`);

  // If needed later, we would add vendor prefixes here.

  return name;
}
