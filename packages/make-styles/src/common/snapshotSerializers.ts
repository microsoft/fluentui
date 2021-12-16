import * as prettier from 'prettier';

import { resolveStyleRules } from '../runtime/resolveStyleRules';
import type { MakeStylesRenderer } from '../types';

// eslint-disable-next-line eqeqeq
const isObject = (value: unknown) => value != null && !Array.isArray(value) && typeof value === 'object';

export const makeStylesRendererSerializer: jest.SnapshotSerializerPlugin = {
  test(value) {
    return isObject(value) && isObject(value.styleElements);
  },
  print(value) {
    /**
     * test function makes sure that value is the guarded type
     */
    const _value = value as MakeStylesRenderer;

    const styleElementsKeys = Object.keys(_value.styleElements) as (keyof typeof _value['styleElements'])[];

    const rules = styleElementsKeys.reduce((acc, styleEl) => {
      const styleElement = _value.styleElements[styleEl];

      if (styleElement) {
        const cssRules = styleElement.sheet ? Array.from(styleElement.sheet.cssRules) : [];

        return [...acc, ...cssRules.map(rule => rule.cssText)];
      }

      return acc;
    }, [] as string[]);

    return prettier.format(rules.join('\n'), { parser: 'css' }).trim();
  },
};

type StyleRulesTuple = ReturnType<typeof resolveStyleRules>;
const isStyleRulesTuple = (value: unknown): value is StyleRulesTuple => Array.isArray(value) && value.length === 2;

export const makeStylesRulesSerializer: jest.SnapshotSerializerPlugin = {
  test(value) {
    return isStyleRulesTuple(value);
  },
  print(value) {
    /**
     * test function makes sure that value is the guarded type
     */
    const _value = value as StyleRulesTuple;

    const cssRulesByBucket = _value[1];
    const keys = Object.keys(cssRulesByBucket) as (keyof typeof cssRulesByBucket)[];

    return keys.reduce((acc, styleBucketName) => {
      const rules = cssRulesByBucket[styleBucketName]!;

      return prettier.format(acc + rules.join(''), { parser: 'css' }).trim();
    }, '');
  },
};
