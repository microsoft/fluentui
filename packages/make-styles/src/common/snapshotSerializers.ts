import * as prettier from 'prettier';

import { resolveStyleRules } from '../runtime/resolveStyleRules';
import { MakeStylesRenderer, CSSRulesByBucket, StyleBucketName } from '../types';

export const makeStylesRendererSerializer: jest.SnapshotSerializerPlugin = {
  test(value: MakeStylesRenderer) {
    return typeof value.styleElements === 'object';
  },
  print(renderer) {
    const rules = Object.keys((renderer as MakeStylesRenderer).styleElements).reduce<string[]>((acc, styleEl) => {
      const styleElement: HTMLStyleElement | undefined = (renderer as MakeStylesRenderer).styleElements[
        styleEl as StyleBucketName
      ];

      if (styleElement) {
        const cssRules = Array.from(styleElement.sheet?.cssRules || []);

        return [...acc, ...cssRules.map(rule => rule.cssText)];
      }

      return acc;
    }, []);

    return prettier.format(rules.join('\n'), { parser: 'css' }).trim();
  },
};

export const makeStylesRulesSerializer: jest.SnapshotSerializerPlugin = {
  test(value) {
    return Array.isArray(value) && value.length === 2;
  },
  print(value) {
    const cssRulesByBucket: CSSRulesByBucket = (value as ReturnType<typeof resolveStyleRules>)[1];

    return (Object.keys(cssRulesByBucket) as StyleBucketName[]).reduce((acc, styleBucketName) => {
      const rules: string[] = cssRulesByBucket[styleBucketName]!;

      return prettier.format(acc + rules.join(''), { parser: 'css' }).trim();
    }, '');
  },
};
