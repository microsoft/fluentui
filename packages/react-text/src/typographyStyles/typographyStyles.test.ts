import { typographyStyles } from './index';
import { tokens } from '@fluentui/react-theme';
import type { Theme } from '@fluentui/react-theme';

const weightsMock = {
  regular: 1,
  semibold: 2,
};

test.each([
  ['caption', 'Base', '200', '200', weightsMock.regular],
  ['body', 'Base', '300', '300', weightsMock.regular],
  ['subheadline', 'Base', '400', '400', weightsMock.semibold],
  ['headline', 'Base', '500', '500', weightsMock.semibold],
  ['title3', 'Base', '600', '600', weightsMock.semibold],
  ['title2', 'Base', '700', '700', weightsMock.semibold],
  ['title1', 'Base', '800', '800', weightsMock.semibold],
  ['largeTitle', 'Base', '900', '900', weightsMock.semibold],
  ['display', 'Base', '1000', '1000', weightsMock.semibold],
] as const)('Uses the right tokens for %s', (ruleName, fontFamily, fontSize, lineHeight, fontWeight) => {
  const rules = typographyStyles[ruleName];

  const fontFamilyTokenName = 'fontFamily' + fontFamily;
  const fontSizeTokenName = 'fontSize' + (parseInt(fontSize, 10) < 700 ? 'Base' : 'Hero') + fontSize;
  const lineHeightTokenName = 'lineHeight' + (parseInt(fontSize, 10) < 700 ? 'Base' : 'Hero') + lineHeight;
  const fontWeightTokenName = 'fontWeight' + (fontWeight === 1 ? 'Regular' : 'Semibold');

  expect(rules.fontFamily).toEqual(tokens[fontFamilyTokenName as keyof Theme]);
  expect(rules.fontSize).toEqual(tokens[fontSizeTokenName as keyof Theme]);
  expect(rules.lineHeight).toEqual(tokens[lineHeightTokenName as keyof Theme]);
  expect(rules.fontWeight).toEqual(tokens[fontWeightTokenName as keyof Theme]);
});
