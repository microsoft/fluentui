import { css } from './css';

export function mergeRules(...args: {[index: string]: Object}[]): Object {
  let styles: {[index: string]: Object} = {};
  let styleToMerge: Object = args[0];

  for (let prop in styleToMerge) {
    if (styleToMerge.hasOwnProperty(prop)) {
      let allArgs: Object[] = [];
      for (let i: number = 0; i < args.length; i++) {
        let currentArg: {[index: string]: Object}= args[i];

        if (currentArg && currentArg[prop]) {
          allArgs.push(currentArg[prop]);
        }
      }
      styles[prop] = css(...allArgs);
    }
  }
  return styles;
}
