import * as prettier from 'prettier';

import { resolveStyleRules } from '../../runtime/resolveStyleRules';
import type { MakeStylesRenderer, CSSRulesByBucket, StyleBucketName } from '../../types';

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
    return Array.isArray(value) && value.length === 2;
  },
  print(value: ReturnType<typeof resolveStyleRules>) {
    const cssRulesByBucket: CSSRulesByBucket = value[1];

    return (Object.keys(cssRulesByBucket) as StyleBucketName[]).reduce((acc, styleBucketName) => {
      const rules: string[] = cssRulesByBucket[styleBucketName]!;

      return prettier.format(acc + rules.join(''), { parser: 'css' }).trim();
    }, '');
  },
};
