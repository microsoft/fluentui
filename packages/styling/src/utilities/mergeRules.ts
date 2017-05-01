import { css } from './css';

export function mergeRules(...args: Object[]): Object {
  let styles: Object = {};
  let styleToMerge: Object = args[0];

  for (let prop in styleToMerge) {
    if (styleToMerge.hasOwnProperty(prop)) {
      let allArgs: Object[] = [];
      for (let i: number = 0; i < args.length; i++) {
        let currentArg: Object = args[i];

        if (currentArg && currentArg[prop]) {
          allArgs.push(currentArg[prop]);
        }
      }
      styles[prop] = css(...allArgs);
    }
  }
  return styles;
}
