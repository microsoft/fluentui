import { getStyleOptions } from './StyleOptionsState';
import { Stylesheet } from './Stylesheet';
import { serializeRuleEntries } from './styleToClassName';

/**
 * Registers keyframe definitions.
 *
 * @public
 */
export function keyframes(timeline: { [key: string]: {} }): string {
  const stylesheet = Stylesheet.getInstance();
  const name = stylesheet.getClassName();

  const rulesArray: string[] = [];

  for (const prop in timeline) {
    if (timeline.hasOwnProperty(prop)) {
      rulesArray.push(prop, '{', serializeRuleEntries(getStyleOptions(), timeline[prop]), '}');
    }
  }
  const rules = rulesArray.join('');

  stylesheet.insertRule(`@keyframes ${name}{${rules}}`, true);

  stylesheet.cacheClassName(name, rules, [], ['keyframes', rules]);

  return name;
}
