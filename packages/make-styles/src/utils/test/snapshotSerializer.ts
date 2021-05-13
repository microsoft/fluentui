import * as prettier from 'prettier';

import { RULE_CSS_INDEX, RULE_RTL_CSS_INDEX } from '../../constants';
import { isObject } from '../../runtime/utils/isObject';
import { MakeStylesRenderer, MakeStylesResolvedRule, StyleBucketName } from '../../types';

export const makeStylesRendererSerializer: jest.SnapshotSerializerPlugin = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  test(value: MakeStylesRenderer | any) {
    return typeof value.styleElements === 'object';
  },
  print(renderer: MakeStylesRenderer) {
    const rules = Object.keys(renderer.styleElements).reduce<string[]>((acc, styleEl) => {
      const styleElement: HTMLStyleElement | undefined = renderer.styleElements[styleEl as StyleBucketName];

      if (styleElement) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const cssRules: CSSRule[] = Array.from((styleElement.sheet as CSSStyleSheet).cssRules);

        return [...acc, ...cssRules.map(rule => rule.cssText)];
      }

      return acc;
    }, []);

    return prettier.format(rules.join('\n'), { parser: 'css' }).trim();
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

      return prettier.format(acc + rule[RULE_CSS_INDEX] + (rule[RULE_RTL_CSS_INDEX] || ''), { parser: 'css' }).trim();
    }, '');
  },
};
