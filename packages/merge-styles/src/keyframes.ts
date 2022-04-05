import { IKeyframes } from './IKeyframes';
import { getStyleOptions } from './StyleOptionsState';
import { Stylesheet } from './Stylesheet';
import { serializeRuleEntries } from './styleToClassName';

/**
 * Registers keyframe definitions.
 *
 * @public
 */
export function keyframes(timeline: IKeyframes): string {
  const stylesheet = Stylesheet.getInstance();
  const rulesArray: string[] = [];

  for (const prop in timeline) {
    if (timeline.hasOwnProperty(prop)) {
      rulesArray.push(prop, '{', serializeRuleEntries(getStyleOptions(), timeline[prop]), '}');
    }
  }
  const rules = rulesArray.join('');

  const className = stylesheet.classNameFromKey(rules);

  if (className) {
    return className;
  }

  const name = stylesheet.getClassName();
  stylesheet.insertRule(`@keyframes ${name}{${rules}}`, true);
  stylesheet.cacheClassName(name, rules, [], ['keyframes', rules]);

  return name;
}
