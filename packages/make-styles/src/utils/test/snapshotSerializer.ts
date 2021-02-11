// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore No typings :(
import * as prettier from 'prettier';
import { MakeStylesResolvedRule } from '../../types';
import { isObject } from '../../runtime/utils/isObject';

export const cssRulesSerializer: jest.SnapshotSerializerPlugin = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  test(value: any) {
    return Array.isArray(value) || typeof value === 'string';
  },
  print(value: string[]) {
    return prettier.format(Array.isArray(value) ? value.join('') : value, { parser: 'css' }).trim();
  },
};

export const makeStylesRulesSerializer: jest.SnapshotSerializerPlugin = {
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
