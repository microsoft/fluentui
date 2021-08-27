import { typographyStyles } from './index';
import type { Theme } from '@fluentui/react-theme';

const weightsMock = {
  regular: 1,
  semibold: 2,
};
type DeepPartial<T> = Partial<{ [P in keyof T]: DeepPartial<T[P]> }>;
const themeMock: DeepPartial<Theme> = {
  global: {
    type: {
      fontFamilies: {
        base: 'base',
      },
      fontWeights: {
        regular: weightsMock.regular,
        semibold: weightsMock.semibold,
      },
      fontSizes: {
        base: {
          [100]: '100',
          [200]: '200',
          [300]: '300',
          [400]: '400',
          [500]: '500',
          [600]: '600',
        },
        hero: {
          [700]: '700',
          [800]: '800',
          [900]: '900',
          [1000]: '1000',
        },
      },
      lineHeights: {
        base: {
          [100]: '100',
          [200]: '200',
          [300]: '300',
          [400]: '400',
          [500]: '500',
          [600]: '600',
        },
        hero: {
          [700]: '700',
          [800]: '800',
          [900]: '900',
          [1000]: '1000',
        },
      },
    },
  },
};

test.each([
  ['caption', 'base', '200', '200', weightsMock.regular],
  ['body', 'base', '300', '300', weightsMock.regular],
  ['subheadline', 'base', '400', '400', weightsMock.semibold],
  ['headline', 'base', '500', '500', weightsMock.semibold],
  ['title3', 'base', '600', '600', weightsMock.semibold],
  ['title2', 'base', '700', '700', weightsMock.semibold],
  ['title1', 'base', '800', '800', weightsMock.semibold],
  ['largeTitle', 'base', '900', '900', weightsMock.semibold],
  ['display', 'base', '1000', '1000', weightsMock.semibold],
] as const)('Uses the right tokens for %s', (ruleName, fontFamily, fontSize, lineHeight, fontWeight) => {
  const ruleFunction = typographyStyles[ruleName];

  const rules = ruleFunction(themeMock as Theme);

  expect(rules.fontFamily).toEqual(fontFamily);
  expect(rules.fontSize).toEqual(fontSize);
  expect(rules.lineHeight).toEqual(lineHeight);
  expect(rules.fontWeight).toEqual(fontWeight);
});
