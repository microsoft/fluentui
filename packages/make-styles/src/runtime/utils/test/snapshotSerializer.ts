// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore No typings :(
import * as prettier from 'prettier';
import { MakeStylesResolvedRule } from '../../../types';
import { isObject } from '../isObject';

export const cssRulesSerializer = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  test(value: any) {
    return Array.isArray(value);
  },
  print(value: string[]) {
    return prettier.format(value.join(''), { parser: 'css' }).trim();
  },
};

export const makeStylesRulesSerializer = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  test(value: any) {
    return isObject(value);
  },
  print(value: Record<string, MakeStylesResolvedRule>) {
    return Object.keys(value).reduce((acc, property) => {
      const rule: MakeStylesResolvedRule = value[property];

      return prettier.format(acc + rule[1] + (rule[2] || ''), { parser: 'css' }).trim();
    }, '');
  },
};
