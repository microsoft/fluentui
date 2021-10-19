import { typographyStyles } from './index';
import type { Theme, PartialTheme } from '@fluentui/react-theme';

const weightsMock = {
  regular: 1,
  semibold: 2,
};

const themeMock: PartialTheme = {
  fontFamilyBase: 'base',
  fontWeightRegular: weightsMock.regular,
  fontWeightSemibold: weightsMock.semibold,
  fontSizeBase100: '100',
  fontSizeBase200: '200',
  fontSizeBase300: '300',
  fontSizeBase400: '400',
  fontSizeBase500: '500',
  fontSizeBase600: '600',
  fontSizeHero700: '700',
  fontSizeHero800: '800',
  fontSizeHero900: '900',
  fontSizeHero1000: '1000',
  lineHeightBase100: '100',
  lineHeightBase200: '200',
  lineHeightBase300: '300',
  lineHeightBase400: '400',
  lineHeightBase500: '500',
  lineHeightBase600: '600',
  lineHeightHero700: '700',
  lineHeightHero800: '800',
  lineHeightHero900: '900',
  lineHeightHero1000: '1000',
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
